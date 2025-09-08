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
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://mathematico-frontend.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
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
      message: 'API info failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Auth endpoints
app.post('/api/v1/auth/login', (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    console.log('Request headers:', req.headers);
    
    // Parse JSON body if it's a string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid JSON in request body',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    const { email, password } = body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Check if it's the admin user
    if (email === 'dc2006089@gmail.com' && password === 'Myname*321') {
      // Generate a simple token (in production, use proper JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: 1,
            email: email,
            role: 'admin',
            name: 'Admin User'
          },
          token: token
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid email or password',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Login failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Registration endpoint
app.post('/api/v1/auth/register', (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    console.log('Request headers:', req.headers);
    
    // Parse JSON body if it's a string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid JSON in request body',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    const { email, password, name } = body;
    
    // Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Email, password, and name are required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Check if email is already taken (admin email)
    if (email === 'dc2006089@gmail.com') {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'Email already exists',
        timestamp: new Date().toISOString()
      });
    }
    
    // Generate a simple token (in production, use proper JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    res.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: Math.floor(Math.random() * 1000) + 2, // Random ID for new users
          email: email,
          role: 'user',
          name: name
        },
        token: token
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Registration endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Registration failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Auth status endpoint
app.get('/api/v1/auth/status', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'No token provided',
        timestamp: new Date().toISOString()
      });
    }
    
    // Simple token validation (in production, use proper JWT validation)
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [email, timestamp] = decoded.split(':');
      
      if (!email) {
        throw new Error('Invalid token format');
      }
      
      // Check if it's the admin user
      if (email === 'dc2006089@gmail.com') {
        res.json({
          success: true,
          data: {
            user: {
              id: 1,
              email: email,
              role: 'admin',
              name: 'Admin User'
            }
          },
          timestamp: new Date().toISOString()
        });
      } else {
        // For regular users, return user role
        res.json({
          success: true,
          data: {
            user: {
              id: Math.floor(Math.random() * 1000) + 2,
              email: email,
              role: 'user',
              name: 'User'
            }
          },
          timestamp: new Date().toISOString()
        });
      }
    } catch (decodeError) {
      console.error('Token decode error:', decodeError);
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid token',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Auth status endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Auth status check failed',
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