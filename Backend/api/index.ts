import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from '../src/config/data-source';
import routes from '../src/routes';
import { errorHandler, notFoundHandler } from '../src/middleware/error.middleware';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware with relaxed CSP for development
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", "http://localhost:*"],
      frameAncestors: ["'self'", "http://localhost:*"]
    }
  } : false, // Disable CSP in development
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration - allow multiple origins for development and production
const allowedOrigins = [
  'http://localhost:8080',  // Your current frontend port
  'http://localhost:5173',  // Vite default port
  'http://localhost:3000',  // React default port
  'http://127.0.0.1:8080', // Alternative localhost
  'http://127.0.0.1:5173', // Alternative localhost
  'http://127.0.0.1:3000', // Alternative localhost
  'https://mathematico-frontend.vercel.app', // Vercel frontend URL
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('🌐 CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('🚫 CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/v1', routes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize database and export the app for Vercel
let isDatabaseInitialized = false;

const initializeDatabase = async () => {
  if (!isDatabaseInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
      isDatabaseInitialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
      throw error;
    }
  }
};

// Export the app for Vercel
export default async (req: any, res: any) => {
  try {
    await initializeDatabase();
    return app(req, res);
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
