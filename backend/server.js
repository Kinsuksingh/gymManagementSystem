import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import DbRoutes from './routes/dbRoutes.js';
import dotenv from 'dotenv';
import classRoutes from './routes/classRoutes.js';
import membersRouter from './routes/memberRoutes.js'



dotenv.config();
const dbPassword = process.env.DB_PASSWORD;



const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());  // This is important to parse JSON request bodies

// MongoDB Atlas connection string
const url = `mongodb+srv://kinsuksingh:${dbPassword}@gymmanagement.jbhc3.mongodb.net/gym_management?retryWrites=true&w=majority`;
const client = new MongoClient(url);

mongoose.connect(url)
    .then(() => console.log("MongoDB connected via Mongoose"))
    .catch(err => console.error("Error connecting to MongoDB: ", err));

// Connect MongoClient once and reuse it
async function connectMongoClient() {
    try {
        await client.connect();
        console.log("MongoClient connected successfully");
    } catch (err) {
        console.error("MongoClient connection error:", err);
    }
}

connectMongoClient();

// Initialize the routes and pass MongoClient instance to it
const dbRoutes = new DbRoutes(client);
app.use('/api', dbRoutes.getRouter());  // Use the routes under '/api' prefix
app.use('/api', classRoutes); // Add this line to use the class routes
app.use('/api/members', membersRouter);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
