import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Log from '../models/Log.js';

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'Unknown';

        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required',
            });
        }

        // Find user (case-insensitive safe match)
        const user = await User.findOne({ username: username.trim().toLowerCase() });

        if (user && (await user.comparePassword(password))) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();

            // Create audit log
            await Log.create({
                action: 'Admin Login',
                details: `Admin user logged in from IP: ${ipAddress}`,
                ipAddress,
                userAgent,
            });

            res.json({
                success: true,
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    username: user.username,
                    lastLogin: user.lastLogin,
                },
            });
        } else {
            // Log failed attempt
            await Log.create({
                action: 'Login Failed',
                details: `Failed login attempt for username: ${username}`,
                ipAddress,
                userAgent,
            });

            res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};

// @desc    Verify JWT token status
// @route   GET /api/auth/verify
// @access  Private
export const verifyAdmin = async (req, res) => {
    // If the request passes the protect middleware, req.user will be populated
    res.json({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            lastLogin: req.user.lastLogin,
        },
    });
};
