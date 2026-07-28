/**
 * GitHub API utility for reading/writing JSON data files.
 * Used in production (Vercel) where the filesystem is read-only.
 * Falls back to local fs for local development.
 */

import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'yashwanthR1207/yashprofile.2';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const isVercel = !!process.env.VERCEL;

/**
 * Read a JSON data file. Uses GitHub API on Vercel, local fs otherwise.
 */
export async function readDataFile(fileName) {
  if (isVercel && GITHUB_TOKEN) {
    return await readFromGitHub(fileName);
  }
  return readFromFS(fileName);
}

/**
 * Write a JSON data file. Uses GitHub API on Vercel, local fs otherwise.
 */
export async function writeDataFile(fileName, data, commitMessage) {
  if (isVercel && GITHUB_TOKEN) {
    return await writeToGitHub(fileName, data, commitMessage);
  }
  return writeToFS(fileName, data);
}

// --- Local filesystem (for development) ---

function readFromFS(fileName) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error.message);
    return null;
  }
}

function writeToFS(fileName, data) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// --- GitHub API (for Vercel production) ---

async function readFromGitHub(fileName) {
  const filePath = `data/${fileName}`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}&t=${Date.now()}`;
  
  const res = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'If-None-Match': '', // Bypass GitHub API cache
    },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    console.error(`GitHub read error for ${fileName}: ${res.status}`);
    return null;
  }
  
  const responseData = await res.json();
  const content = Buffer.from(responseData.content, 'base64').toString('utf8');
  return JSON.parse(content);
}

async function getFileSHA(fileName) {
  const filePath = `data/${fileName}`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}&t=${Date.now()}`;
  
  const res = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'If-None-Match': '',
    },
    cache: 'no-store',
  });
  
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

async function writeToGitHub(fileName, data, commitMessage) {
  const filePath = `data/${fileName}`;
  const sha = await getFileSHA(fileName);
  
  if (!sha) {
    throw new Error(`Could not get SHA for ${fileName}. File may not exist in the repo.`);
  }
  
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: commitMessage || `Update ${fileName} via admin panel`,
      content: Buffer.from(JSON.stringify(data, null, 2) + '\n').toString('base64'),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error(`GitHub write error for ${fileName}:`, error);
    throw new Error(`GitHub API error: ${res.status} - ${error.message || 'Unknown error'}`);
  }
  
  return await res.json();
}
