import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        position: { type: String, required: true },
        duration: { type: String, required: true },
        location: { type: String, required: true },
        icon: { type: String, default: 'briefcase' },
        achievements: [{ type: String }],
        technologies: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Experience', experienceSchema);
