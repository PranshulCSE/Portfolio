import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
});

const personalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    tagline: { type: String, default: '' },
});

const aboutSchema = new mongoose.Schema(
    {
        personal: { type: personalSchema, required: true },
        bio: { type: String, required: true },
        philosophy: { type: String, required: true },
        focus: [{ type: String }],
        stats: [statSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('About', aboutSchema);
