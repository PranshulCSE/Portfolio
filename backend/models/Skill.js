import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
    {
        category: { type: String, required: true, unique: true },
        items: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Skill', skillSchema);
