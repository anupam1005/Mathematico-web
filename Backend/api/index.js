"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const data_source_1 = require("./config/data-source");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') {
    dotenv_1.default.config();
}
else {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, '../config.env') });
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)({
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
            frameSrc: ["'self'", "https://mathematico-frontend.vercel.app"],
            frameAncestors: ["'self'", "https://mathematico-frontend.vercel.app"]
        }
    } : false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'https://mathematico-frontend.vercel.app',
    'https://mathematico-frontend-gvpmf2rwj-anupam-das-projects-db63fa41.vercel.app',
    'https://*.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);
console.log('🌐 CORS allowed origins:', allowedOrigins);
console.log('🌐 CORS configuration loaded with preflightContinue: false');
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
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
        'Pragma',
        'X-Requested-With'
    ],
    exposedHeaders: [
        'Content-Length',
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'X-Total-Count',
        'X-Page-Count'
    ],
    optionsSuccessStatus: 200,
    preflightContinue: false
}));
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (process.env.NODE_ENV !== 'production') {
        console.log('🌐 CORS Request:', {
            method: req.method,
            url: req.url,
            origin: origin,
            headers: req.headers
        });
    }
    if (origin && (allowedOrigins.includes(origin) || origin.match(/^https:\/\/.*\.vercel\.app$/))) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Accept, Origin, Pragma');
    if (req.method === 'OPTIONS') {
        console.log('✅ CORS Preflight request handled for:', req.url);
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV !== 'production') {
    app.use((0, morgan_1.default)('combined'));
}
app.use('/uploads', (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && (allowedOrigins.includes(origin) || origin.match(/^https:\/\/.*\.vercel\.app$/))) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Accept, Origin, Pragma');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.removeHeader('X-Frame-Options');
    if (req.url.toLowerCase().endsWith('.pdf')) {
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'inline');
        res.removeHeader('Content-Security-Policy');
    }
    if (req.method === 'OPTIONS') {
        console.log('✅ CORS Preflight request handled for static file:', req.url);
        res.sendStatus(200);
    }
    else {
        next();
    }
}, express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.get('/uploads/*.pdf', (_req, res, next) => {
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', 'inline');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    next();
});
app.use('/api/v1', routes_1.default);
app.get('/api/v1/health', (_req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        vercel: process.env.VERCEL === '1',
        database: {
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            connected: data_source_1.AppDataSource.isInitialized
        }
    });
});
app.get('/', (_req, res) => {
    res.json({
        message: 'Mathematico API Server',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
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
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
const initializeDatabase = async () => {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
            console.log('✅ Database connection established');
        }
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        if (process.env.VERCEL !== '1') {
            throw error;
        }
    }
};
const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📚 API Documentation: https://mathematico-backend-new.vercel.app/api/v1/health`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'https://mathematico-frontend.vercel.app'}`);
            console.log(`🗄️  Database: ${process.env.DB_DATABASE || 'railway'}`);
            console.log(`👤 Admin Email: ${process.env.ADMIN_EMAIL || 'dc2006089@gmail.com'}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        if (process.env.VERCEL !== '1') {
            process.exit(1);
        }
    }
};
if (process.env.VERCEL === '1') {
    initializeDatabase().catch(error => {
        console.error('Database initialization failed in Vercel:', error);
    });
    module.exports = app;
}
else {
    startServer();
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    if (process.env.VERCEL !== '1') {
        process.exit(1);
    }
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (process.env.VERCEL !== '1') {
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map