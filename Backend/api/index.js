// Vercel serverless function entry point
// Minimal implementation without any external dependencies

// Basic error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Try to load express, with fallback
let express;
try {
  express = require('express');
} catch (error) {
  console.error('Express not available:', error);
  // Return a simple function if express fails
  module.exports = (req, res) => {
    res.status(500).json({
      error: 'Server Error',
      message: 'Express not available',
      timestamp: new Date().toISOString()
    });
  };
  return;
}

// Create Express app
const app = express();

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Static file serving for public directory
app.use(express.static('public'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'Mathematico API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      vercel: process.env.VERCEL === '1'
    });
  } catch (error) {
    console.error('Root endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
});

// Health endpoint
app.get('/api/v1/health', (req, res) => {
  try {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      vercel: process.env.VERCEL === '1'
    });
  } catch (error) {
    console.error('Health endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// API info endpoint
app.get('/api/v1', (req, res) => {
  try {
    res.json({
      message: 'Mathematico API v1',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      vercel: process.env.VERCEL === '1',
      endpoints: {
        health: '/api/v1/health',
        api: '/api/v1'
      }
    });
  } catch (error) {
    console.error('API info endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'API info failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Comprehensive favicon handling
const handleFavicon = (req, res) => {
  console.log(`Favicon requested: ${req.url}`);
  res.status(204).end();
};

// All possible favicon routes
app.get('/favicon.ico', handleFavicon);
app.get('/favicon.png', handleFavicon);
app.get('/favicon', handleFavicon);
app.get('/favicon.gif', handleFavicon);
app.get('/favicon.jpg', handleFavicon);
app.get('/favicon.jpeg', handleFavicon);
app.get('/favicon.svg', handleFavicon);
app.get('/favicon.webp', handleFavicon);

// Catch-all favicon pattern
app.get(/^\/favicon.*/, handleFavicon);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// Export the app for Vercel
module.exports = app;