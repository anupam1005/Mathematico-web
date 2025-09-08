// Vercel serverless function entry point
// Simple, robust implementation

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
    res.status(200).json({
      message: 'Mathematico API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1',
      note: 'Running in minimal mode'
    });
  };
  return;
}

// Create Express app
const app = express();

// Basic middleware with error handling
try {
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
} catch (error) {
  console.error('Middleware setup error:', error);
}

// CORS middleware
app.use((req, res, next) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  } catch (error) {
    console.error('CORS error:', error);
    next();
  }
});

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  try {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1',
      database: {
        host: process.env.DB_HOST || 'not configured',
        database: process.env.DB_DATABASE || 'not configured',
        connected: false
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health endpoint error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// API info endpoint
app.get('/api/v1', (req, res) => {
  try {
    res.json({
      message: 'Mathematico API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1',
      endpoints: {
        health: '/api/v1/health',
        auth: '/api/v1/auth',
        books: '/api/v1/books',
        courses: '/api/v1/courses',
        liveClasses: '/api/v1/live-classes',
        admin: '/api/v1/admin'
      }
    });
  } catch (error) {
    console.error('API info endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'API info endpoint failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'Mathematico API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1',
      endpoints: {
        health: '/api/v1/health',
        api: '/api/v1'
      }
    });
  } catch (error) {
    console.error('Root endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Root endpoint failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Favicon handler
app.get('/favicon.ico', (req, res) => {
  try {
    res.status(204).end();
  } catch (error) {
    console.error('Favicon error:', error);
    res.status(500).end();
  }
});

// 404 handler
app.use('*', (req, res) => {
  try {
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found',
      path: req.originalUrl || req.url,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('404 handler error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error handling request',
      timestamp: new Date().toISOString()
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  try {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error in error handler:', err);
    res.status(500).end();
  }
});

// Export for Vercel
module.exports = app;