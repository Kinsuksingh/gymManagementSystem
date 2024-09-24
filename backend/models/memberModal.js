// models/Member.js
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Add this line
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    membershipType: { type: String, required: true },
    paymentMode: { type: String, required: true },
    workoutExperience: { type: String, required: true },
    membershipStart: { type: Date, required: true },
    membershipEnd: { type: Date, required: true },
});

export default mongoose.model('Member', memberSchema);
