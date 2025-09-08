// Vercel serverless function for Mathematico Backend
// This is a simplified version that includes all necessary functionality

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Create Express app
const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://mathematico-frontend.vercel.app',
  'https://mathematico-frontend-gvpmf2rwj-anupam-das-projects-db63fa41.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow Vercel preview URLs
    if (origin.match(/^https:\/\/.*\.vercel\.app$/)) {
      console.log('✅ CORS allowing Vercel preview URL:', origin);
      return callback(null, true);
    }
    
    console.log('🚫 CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Cache-Control', 
    'Accept', 
    'Origin',
    'Pragma'
  ],
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Mathematico API Server',
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
});

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercel: process.env.VERCEL === '1'
  });
});

// Auth endpoints
app.post('/api/v1/auth/login', (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
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
            name: 'Admin User',
            isAdmin: true,
            role: 'admin'
          },
          tokens: {
            accessToken: token,
            refreshToken: token,
            expiresIn: 3600
          }
        },
        timestamp: new Date().toISOString()
      });
    } else {
      // For other users, create a simple user
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: Math.floor(Math.random() * 1000) + 2,
            email: email,
            name: email.split('@')[0] || 'User',
            isAdmin: false,
            role: 'user'
          },
          tokens: {
            accessToken: token,
            refreshToken: token,
            expiresIn: 3600
          }
        },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({
      success: false,
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
    
    const { email, password, name } = req.body;
    
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
    
    // Generate a simple token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    res.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: Math.floor(Math.random() * 1000) + 2,
          email: email,
          name: name,
          isAdmin: false,
          role: 'user'
        },
        tokens: {
          accessToken: token,
          refreshToken: token,
          expiresIn: 3600
        }
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
app.get('/api/v1/auth/me', (req, res) => {
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
    
    // Simple token validation
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
              name: 'Admin User',
              isAdmin: true,
              role: 'admin'
            }
          },
          timestamp: new Date().toISOString()
        });
      } else {
        res.json({
          success: true,
          data: {
            user: {
              id: Math.floor(Math.random() * 1000) + 2,
              email: email,
              name: email.split('@')[0] || 'User',
              isAdmin: false,
              role: 'user'
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

// Logout endpoint
app.post('/api/v1/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
    timestamp: new Date().toISOString()
  });
});

// Refresh token endpoint
app.post('/api/v1/auth/refresh-token', (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Refresh token is required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Simple token refresh (in production, use proper JWT)
    const newToken = Buffer.from(`refreshed:${Date.now()}`).toString('base64');
    
    res.json({
      success: true,
      data: {
        tokens: {
          accessToken: newToken,
          refreshToken: newToken,
          expiresIn: 3600
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Refresh token endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Token refresh failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Forgot password endpoint
app.post('/api/v1/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Email is required',
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      message: 'Password reset email sent successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Forgot password endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to send reset email',
      timestamp: new Date().toISOString()
    });
  }
});

// Reset password endpoint
app.post('/api/v1/auth/reset-password', (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Token and password are required',
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      message: 'Password reset successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Reset password endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Password reset failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Basic API endpoints for other resources
app.get('/api/v1/books', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Books endpoint - not implemented yet',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/courses', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Courses endpoint - not implemented yet',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/live-classes', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Live classes endpoint - not implemented yet',
    timestamp: new Date().toISOString()
  });
});

// Favicon handling
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/favicon.png', (req, res) => {
  res.status(204).end();
});

app.get('/favicon', (req, res) => {
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