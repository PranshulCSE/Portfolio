import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { seedDatabase } from './utils/seed.js';

dotenv.config();

// ===== ENVIRONMENT VALIDATION =====
const requiredEnvVars = ['MONGODB_URI', 'EMAIL_USER', 'EMAIL_PASS', 'OWNER_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('❌ FATAL ERROR: Missing required environment variables:');
    missingEnvVars.forEach(envVar => {
        console.error(`   - ${envVar}`);
    });
    console.error('\n📋 Please set these variables in your .env file or deployment platform.');
    console.error('📖 Refer to .env.example for guidance.\n');
    process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('trust proxy', 1);

const buildAllowedOrigins = () => {
    const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
    const origins = new Set([
        configuredOrigin,
        'https://pranshulthreja.vercel.app',
        'https://www.pranshulthreja.vercel.app',
        'https://pranshulthreja.tech',
        'https://www.pranshulthreja.tech',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ]);

    try {
        const url = new URL(configuredOrigin);
        if (url.hostname.startsWith('www.')) {
            origins.add(`${url.protocol}//${url.hostname.replace(/^www\./, '')}${url.port ? `:${url.port}` : ''}`);
        } else {
            origins.add(`${url.protocol}//www.${url.hostname}${url.port ? `:${url.port}` : ''}`);
        }
    } catch {
        // Ignore parsing errors for custom origin strings
    }

    return origins;
};

const allowedOrigins = buildAllowedOrigins();

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        // Allow any vercel.app preview or production deployment
        if (/^https:\/\/[a-zA-Z0-9-_]+\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('✓ MongoDB connected successfully');
        await seedDatabase();
    })
    .catch((err) => {
        console.error('✗ MongoDB connection failed:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: 'Internal server error',
        error: NODE_ENV === 'development' ? err.message : undefined,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📧 API ready to receive contact form submissions`);
    console.log(`🔧 Environment: ${NODE_ENV}\n`);
});

