import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: String, required: true },
        image: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Achievement', achievementSchema);
