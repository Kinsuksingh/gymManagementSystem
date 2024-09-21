import mongoose from 'mongoose';

class DbController {
    constructor(client) {
        this.client = client;  // Reuse MongoClient for MongoDB interactions
    }

    // Method to fetch all databases
    async getAllDatabases(req, res) {
        try {
            const dbs = await this.client.db().admin().listDatabases();
            res.status(200).json({
                message: "Databases retrieved successfully",
                databases: dbs.databases,
            });
        } catch (err) {
            console.error("Error fetching databases:", err);
            res.status(500).json({
                message: "Error fetching databases",
                error: err.message,
            });
        }
    }

    // Method to check if a collection exists in a specific database
    async checkCollectionExists(req, res) {
        const { dbName, collectionName } = req.params;

        try {
            const dbs = await this.client.db().admin().listDatabases();
            const dbExists = dbs.databases.some(db => db.name === dbName);

            if (!dbExists) {
                return res.status(404).json({ message: `Database '${dbName}' does not exist.` });
            }

            // Use the specified database
            const db = mongoose.connection.useDb(dbName);
            const collections = await db.db.listCollections().toArray();
            const collectionExists = collections.some(coll => coll.name === collectionName);

            if (collectionExists) {
                return res.status(200).json({ message: `Collection '${collectionName}' exists.` });
            } else {
                return res.status(404).json({ message: `Collection '${collectionName}' does not exist.` });
            }
        } catch (err) {
            console.error("Error checking collection:", err);
            return res.status(500).json({ message: "Error checking collection", error: err.message });
        }
    }
}

export default DbController;
