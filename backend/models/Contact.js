import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name must not exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        subject: {
            type: String,
            trim: true,
            default: 'No subject provided',
            maxlength: [200, 'Subject must not exceed 200 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [5000, 'Message must not exceed 5000 characters'],
        },
        ipAddress: {
            type: String,
            default: null,
        },
        readStatus: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
contactSchema.index({ createdAt: -1 });
contactSchema.index({ email: 1 });

export default mongoose.model('Contact', contactSchema);
