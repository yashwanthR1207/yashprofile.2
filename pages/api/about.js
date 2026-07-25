import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Janhavi@1207';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'about.json');
  
  const getAboutData = () => {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      return { stats: {}, skills: [], credentials: [] };
    }
  };

  const saveAboutData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  };

  // Check authorization for modifying methods
  if (req.method === 'PUT') {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing password.' });
    }
  }

  switch (req.method) {
    case 'GET':
      const data = getAboutData();
      return res.status(200).json(data);

    case 'PUT':
      try {
        const newData = req.body;
        // Basic validation
        if (!newData || !newData.stats || !Array.isArray(newData.skills) || !Array.isArray(newData.credentials)) {
          return res.status(400).json({ message: 'Invalid data format.' });
        }
        
        saveAboutData(newData);
        return res.status(200).json(newData);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update about data.' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
