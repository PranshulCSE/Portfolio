import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { handleContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Rate limiting: 10 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests
    message: 'Too many contact form submissions. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Validation middleware
const validateContactForm = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),
    body('subject')
        .trim()
        .optional()
        .isLength({ max: 200 }).withMessage('Subject must not exceed 200 characters'),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters'),
];

// Error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }
    next();
};

// Routes
router.post('/', limiter, validateContactForm, handleValidationErrors, handleContactForm);

export default router;
