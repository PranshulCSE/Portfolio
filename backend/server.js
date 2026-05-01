import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

const buildAllowedOrigins = () => {
    const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
    const origins = new Set([configuredOrigin]);

    try {
        const url = new URL(configuredOrigin);

        if (url.hostname.startsWith('www.')) {
            origins.add(`${url.protocol}//${url.hostname.replace(/^www\./, '')}${url.port ? `:${url.port}` : ''}`);
        } else {
            origins.add(`${url.protocol}//www.${url.hostname}${url.port ? `:${url.port}` : ''}`);
        }
    } catch {
        // Keep the configured origin only if it is not a valid URL.
    }

    return origins;
};

const allowedOrigins = buildAllowedOrigins();

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
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
    .then(() => {
        console.log('✓ MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('✗ MongoDB connection failed:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/contact', contactRoutes);

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
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📧 API ready to receive contact form submissions`);
});
