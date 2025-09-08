// Vercel serverless function entry point
const { createServer } = require('http');
const { parse } = require('url');

// Import the Express app from the compiled TypeScript
let app;

try {
  // Try to import the compiled app
  app = require('../dist/index.js');
} catch (error) {
  console.error('Failed to import compiled app:', error);
  
  // Fallback: create a simple Express app
  const express = require('express');
  app = express();
  
  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
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
  
  // Health check endpoint
  app.get('/api/v1/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: process.env.VERCEL === '1',
      database: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        connected: false
      }
    });
  });
  
  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Mathematico API Server',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: process.env.VERCEL === '1',
      endpoints: {
        health: '/api/v1/health'
      }
    });
  });
  
  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found',
      path: req.originalUrl
    });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    });
  });
}

// Export for Vercel
module.exports = app;
