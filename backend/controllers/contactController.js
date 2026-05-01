import Contact from '../models/Contact.js';
import { sendThankYouEmail, sendNotificationEmail } from '../utils/sendEmail.js';

export const handleContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create contact record in database
        const contactRecord = await Contact.create({
            name,
            email,
            subject: subject || 'No subject provided',
            message,
            ipAddress,
        });

        // Send thank you email to user
        await sendThankYouEmail({ name, email, subject, message });

        // Send notification email to admin
        await sendNotificationEmail({ name, email, subject, message });

        res.status(201).json({
            success: true,
            message: 'Your message has been received! I\'ll get back to you soon.',
            data: {
                id: contactRecord._id,
                timestamp: contactRecord.createdAt,
            },
        });
    } catch (error) {
        console.error('Contact form error:', error);

        // Validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error processing your request. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};
