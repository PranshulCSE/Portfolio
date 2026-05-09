import Contact from '../models/Contact.js';
import { sendContactEmails } from '../utils/sendEmail.js';

export const handleContactForm = async (req, res) => {
    const startTime = Date.now();
    try {
        const { name, email, subject, message } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;

        console.log(`📨 Incoming contact form: name=${name}, email=${email}`);

        // Create contact record in database
        const dbStart = Date.now();
        const contactRecord = await Contact.create({
            name,
            email,
            subject: subject || 'No subject provided',
            message,
            ipAddress,
        });
        const dbTime = Date.now() - dbStart;
        console.log(`✓ Contact record saved: ${contactRecord._id} (${dbTime}ms)`);

        res.status(201).json({
            success: true,
            message: 'Your message has been received! I\'ll get back to you soon.',
            data: {
                id: contactRecord._id,
                timestamp: contactRecord.createdAt,
            },
        });

        setImmediate(() => {
            void sendContactEmails({ name, email, subject, message })
                .then(({ thankYouResult, notificationResult }) => {
                    if (thankYouResult.status === 'rejected') {
                        console.error('❌ Thank you email failed:', thankYouResult.reason?.message || thankYouResult.reason);
                    }

                    if (notificationResult.status === 'rejected') {
                        console.error('❌ Notification email failed:', notificationResult.reason?.message || notificationResult.reason);
                    }
                })
                .catch(err => console.error('❌ Email dispatch failed:', err.message));
        });

        const totalTime = Date.now() - startTime;
        console.log(`✓ Response sent successfully (Total: ${totalTime}ms)`);
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
