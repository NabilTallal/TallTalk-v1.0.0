import { Server } from "socket.io";
import http from "http";
import express from "express";
import { EnvUtil } from "./env.util.js";
import { socketMiddleware } from "../middleware/socket.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [EnvUtil.CLIENT_URL],
        credentials: true,
    },
});

io.use(socketMiddleware);

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId] || null;
}

io.on("connection", (socket) => {
    const userId = socket.userId; // get from query
    if (!userId) {
        console.log("Connection rejected: No userId provided");
        socket.disconnect();
        return;
    }

    // console.log(`User connected:`, socket.user.fullName);
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
