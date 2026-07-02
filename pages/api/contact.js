export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process the form data here if needed
    // For now, we'll just return a success response
    res.status(200).json({ message: 'Success' })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
