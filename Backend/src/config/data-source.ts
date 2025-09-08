import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Course } from '../entities/Course';
import { Module } from '../entities/Module';
import { Lesson } from '../entities/Lesson';
import { Enrollment } from '../entities/Enrollment';
import { UserProgress } from '../entities/UserProgress';
import { Setting } from '../entities/Setting';
import { RefreshToken } from '../entities/RefreshToken';
import { PasswordResetToken } from '../entities/PasswordResetToken';
import { Book } from '../entities/Book';
import { LiveClass } from '../entities/LiveClass';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') {
  // In Vercel production, use environment variables directly
  dotenv.config();
} else {
  // In local development, load from config.env file
  dotenv.config({ path: path.join(__dirname, '../../config.env') });
}

const isProduction = process.env.NODE_ENV === 'production';

// Create a new DataSource instance
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'mathematico',
  synchronize: false, // Keep false in production to avoid accidental schema changes
  migrationsRun: true, // Run migrations automatically (good for Railway/Vercel)
  logging: !isProduction, // Enable SQL logging only in dev
  entities: [
    User,
    Course,
    Module,
    Lesson,
    Enrollment,
    UserProgress,
    Setting,
    RefreshToken,
    PasswordResetToken,
    Book,
    LiveClass,
  ],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [],
  extra: {
    connectionLimit: 10, // Connection pool size
    acquireTimeout: 60000, // 60 seconds
    timeout: 60000, // 60 seconds
    reconnect: true,
  },
  ...(isProduction && {
    ssl: {
      rejectUnauthorized: false, // Railway MySQL requires SSL
    },
  }),
});
