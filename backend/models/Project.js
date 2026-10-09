import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        tags: [{ type: String }],
        github: { type: String, default: '' },
        live: { type: String, default: '' },
        featured: { type: Boolean, default: false },
        category: { type: String, default: 'Full Stack' },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Project', projectSchema);
