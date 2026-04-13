import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not configured yet.");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,                  // Protects against XSS
        sameSite: "strict",              // Protects against CSRF
        secure: NODE_ENV === "development" ? false : true, // Only over HTTPS in production
    });

    return token;
};
