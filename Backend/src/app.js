import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ENV } from './utils/env.js';
import authRoutes from './Routes/auth.route.js';

const app = express();

const __dirname = path.resolve();

const PORT = ENV.PORT || 4000;

app.use(express.json({ limit: "5mb" })); // parse JSON bodies
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => console.log("Server running on port 4000"));

