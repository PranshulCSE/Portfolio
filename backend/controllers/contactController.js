import Contact from '../models/Contact.js';
import { sendThankYouEmail, sendNotificationEmail } from '../utils/sendEmail.js';
import { appendToSheet } from '../utils/appendToSheet.js';

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

        // Append to Google Sheets
        try {
            await appendToSheet({
                timestamp: new Date().toISOString(),
                name,
                email,
                subject,
                message,
            });
        } catch (sheetError) {
            console.error('Google Sheets error (non-blocking):', sheetError.message);
            // Don't fail the request if sheet update fails
        }

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

export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: messages.length,
            data: messages,
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching messages',
        });
    }
};
