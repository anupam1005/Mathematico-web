export default (req: any, res: any) => {
  res.status(200).json({
    message: 'Mathematico Backend API is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    environment: process.env.NODE_ENV || 'development'
  });
};
