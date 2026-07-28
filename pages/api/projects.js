import { readDataFile, writeDataFile } from '../../lib/github';

// For demo purposes, we are using a simple hardcoded password.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Janhavi@1207';

// Ensure body is parsed (fallback for cases where Next.js doesn't auto-parse)
const parseBody = (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
};

export default async function handler(req, res) {
  // Check authorization for modifying methods
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing password.' });
    }
  }

  switch (req.method) {
    case 'GET': {
      try {
        const projects = await readDataFile('projects.json');
        return res.status(200).json(projects || []);
      } catch (error) {
        console.error('GET projects error:', error);
        return res.status(500).json({ message: 'Failed to read projects.' });
      }
    }

    case 'POST': {
      try {
        const body = parseBody(req);
        const { title, link } = body;
        if (!title || !link) {
          return res.status(400).json({ message: 'Title and Link are required.' });
        }
        
        const currentProjects = (await readDataFile('projects.json')) || [];
        const newProject = {
          id: Date.now().toString(),
          title,
          link,
        };
        
        currentProjects.push(newProject);
        await writeDataFile('projects.json', currentProjects, `Add project: ${title}`);
        
        return res.status(201).json(newProject);
      } catch (error) {
        console.error('POST project error:', error);
        return res.status(500).json({ message: 'Failed to add project.' });
      }
    }

    case 'PUT': {
      try {
        const body = parseBody(req);
        const { id, title, link } = body;
        if (!id || !title || !link) {
          return res.status(400).json({ message: 'ID, Title, and Link are required.' });
        }
        
        const currentProjects = (await readDataFile('projects.json')) || [];
        const idStr = String(id);
        const projectIndex = currentProjects.findIndex(p => String(p.id) === idStr);
        
        if (projectIndex === -1) {
          return res.status(404).json({ message: 'Project not found.' });
        }
        
        currentProjects[projectIndex] = { id: idStr, title, link };
        await writeDataFile('projects.json', currentProjects, `Update project: ${title}`);
        
        return res.status(200).json(currentProjects[projectIndex]);
      } catch (error) {
        console.error('PUT project error:', error);
        return res.status(500).json({ message: 'Failed to update project.' });
      }
    }

    case 'DELETE': {
      try {
        const body = parseBody(req);
        const { id } = body;
        if (!id) {
          return res.status(400).json({ message: 'Project ID is required.' });
        }
        
        let currentProjects = (await readDataFile('projects.json')) || [];
        const idStr = String(id);
        const originalLength = currentProjects.length;
        currentProjects = currentProjects.filter(p => String(p.id) !== idStr);
        
        if (currentProjects.length === originalLength) {
          return res.status(404).json({ message: 'Project not found.' });
        }
        
        await writeDataFile('projects.json', currentProjects, `Delete project id: ${idStr}`);
        
        return res.status(200).json({ message: 'Project deleted successfully.' });
      } catch (error) {
        console.error('DELETE project error:', error);
        return res.status(500).json({ message: 'Failed to delete project.' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
