import express from 'express';
import DbController from '../controllers/dbController.js';

const router = express.Router();

// MongoClient should be passed in from the main server setup
class DbRoutes {
    constructor(client) {
        this.controller = new DbController(client) // Pass the MongoClient to the controller
        this.initRoutes();
    }

    // Initialize routes
    initRoutes() {
        router.get('/databases', this.controller.getAllDatabases.bind(this.controller));  // Bind controller methods to routes
        router.get('/check-collection/:dbName/:collectionName', this.controller.checkCollectionExists.bind(this.controller));
    }

    // Expose router for server to use
    getRouter() {
        return router;
    }
}

export default DbRoutes;



