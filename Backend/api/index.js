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

// Favicon handlers - return 204 No Content
app.get('/favicon.ico', (req, res) => {
  console.log('Favicon.ico requested');
  res.status(204).end();
});

app.get('/favicon.png', (req, res) => {
  console.log('Favicon.png requested');
  res.status(204).end();
});

// Additional favicon variations
app.get('/favicon', (req, res) => {
  console.log('Favicon (no extension) requested');
  res.status(204).end();
});

// Handle any favicon-related requests
app.get(/^\/favicon.*/, (req, res) => {
  console.log('Favicon pattern matched:', req.url);
  res.status(204).end();
});

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