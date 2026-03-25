import jwt from "jsonwebtoken";
import {EnvUtil} from "../utils/env.util.js";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({message: "Unauthorized : No token provided."});
        }

        const decodedToken = jwt.verify(token, EnvUtil.JWT_SECRET);

        if(!decodedToken) {
            return res.status(401).json({message: "Unauthorized : Invalid token."});
        }

        const authenticatedUser = await User.findById(decodedToken.userId).select("-password");

        if(!authenticatedUser) {
            return res.status(404).json({ message : "User not found."});
        }

        req.user = authenticatedUser;
        next();
    } catch(error) {
        console.error("Error in protectRoute middleware :", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        return res.status(500).json({message : "Internal Server Error."})
    }
};
