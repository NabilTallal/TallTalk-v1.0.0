import jwt from "jsonwebtoken";
import { EnvUtil } from "../utils/env.util.js";
import User from "../models/user.model.js";

/**
 * middleware to authenticate Socket.IO connections using JWT from Http-only cookies.
 * Attaches the authenticated user to the socket object.
 */
export const socketMiddleware = async (socket, next) => {
    try {
        // Extract JWT from cookies
        const cookies = socket.handshake.headers.cookie || "";
        const token = cookies
            .split("; ")
            .find((c) => c.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            return next(new Error("Unauthorized: No token provided."));
        }

        // Verify JWT
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, EnvUtil.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return next(new Error("Unauthorized: Token expired."));
            }
            return next(new Error("Unauthorized: Invalid token."));
        }

        // Find user in DB and exclude password
        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) {
            return next(new Error("Unauthorized: User not found."));
        }

        // Attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString();

        // Minimal logging for production
        console.log(`Socket authenticated for user ID: ${socket.userId}`);

        next(); // Allow connection
    } catch (error) {
        console.error("Socket authentication error:", error.message);
        return next(new Error("Unauthorized: Authentication failed."));
    }
};
