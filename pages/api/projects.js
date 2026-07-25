import fs from 'fs';
import path from 'path';

// For demo purposes, we are using a simple hardcoded password.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Janhavi@1207';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  
  // Helper to read data
  const getProjects = () => {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  };

  // Helper to write data
  const saveProjects = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  };

  // Check authorization for modifying methods
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing password.' });
    }
  }

  switch (req.method) {
    case 'GET':
      const projects = getProjects();
      return res.status(200).json(projects);

    case 'POST':
      // Add a new project
      try {
        const { title, link } = req.body;
        if (!title || !link) {
          return res.status(400).json({ message: 'Title and Link are required.' });
        }
        
        const currentProjects = getProjects();
        const newProject = {
          id: Date.now().toString(),
          title,
          link,
        };
        
        currentProjects.push(newProject);
        saveProjects(currentProjects);
        
        return res.status(201).json(newProject);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to add project.' });
      }

    case 'PUT':
      // Update an existing project
      try {
        const { id, title, link } = req.body;
        if (!id || !title || !link) {
          return res.status(400).json({ message: 'ID, Title, and Link are required.' });
        }
        
        const currentProjects = getProjects();
        const projectIndex = currentProjects.findIndex(p => p.id === id);
        
        if (projectIndex === -1) {
          return res.status(404).json({ message: 'Project not found.' });
        }
        
        currentProjects[projectIndex] = { id, title, link };
        saveProjects(currentProjects);
        
        return res.status(200).json(currentProjects[projectIndex]);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update project.' });
      }

    case 'DELETE':
      // Delete a project
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ message: 'Project ID is required.' });
        }
        
        let currentProjects = getProjects();
        currentProjects = currentProjects.filter(p => p.id !== id);
        
        saveProjects(currentProjects);
        
        return res.status(200).json({ message: 'Project deleted successfully.' });
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delete project.' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
