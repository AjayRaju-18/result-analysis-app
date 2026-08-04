export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: 'Result Analysis API is running',
    timestamp: new Date().toISOString(),
  });
}
