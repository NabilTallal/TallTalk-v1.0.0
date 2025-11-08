import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";

import { ENV } from "./utils/env.js";
import { connectDB } from "./utils/db.util.js";
import { securityProtection, applySecurityHeaders } from "./Middleware/TallSec.middleware.js";

import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 4000;

app.use(express.json({ limit: "5mb" })); // Parse JSON bodies
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // Enable CORS for frontend
app.use(cookieParser()); // Parse cookies
app.use(applySecurityHeaders); // HTTP helmet
app.use(securityProtection); // Apply security layer globally
if (ENV.NODE_ENV === "development") app.use(morgan("dev")); // Logging in dev

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

const startServer = async () => {
    try {
        await connectDB(); // Connect to MongoDB before starting
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
