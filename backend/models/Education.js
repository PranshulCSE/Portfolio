import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
    {
        degree: { type: String, required: true },
        school: { type: String, required: true },
        duration: { type: String, required: true },
        gpa: { type: Number, required: true },
        highlights: [{ type: String }],
        description: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Education', educationSchema);
