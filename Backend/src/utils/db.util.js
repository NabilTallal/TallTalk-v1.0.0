import mongoose from "mongoose";
import { EnvUtil } from "./env.util.js";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = EnvUtil;
        if (!MONGO_URI) throw new Error("MONGO_URI environment variable is not defined.");

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB is already connected");
            return mongoose.connection;
        }

        // mongoose.set('strictQuery', true);

        const dbConnection = await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully:", dbConnection.connection.host);

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected!');
        });

        return dbConnection;
    } catch (error) {
        console.error("Connecting to MongoDB failed:", error);
        process.exit(1);
    }
};