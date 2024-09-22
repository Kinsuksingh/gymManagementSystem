import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    schedule: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
});

const Class = mongoose.model('Class', classSchema);
export default Class;
