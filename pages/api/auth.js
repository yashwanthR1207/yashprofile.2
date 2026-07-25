export default function handler(req, res) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Janhavi@1207';
  if (req.method === 'POST') {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ success: false });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
