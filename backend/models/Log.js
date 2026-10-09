import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
    {
        action: { type: String, required: true },
        details: { type: String, default: '' },
        ipAddress: { type: String, default: null },
        userAgent: { type: String, default: null },
        timestamp: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

// Add index for fast querying
logSchema.index({ timestamp: -1 });

export default mongoose.model('Log', logSchema);
