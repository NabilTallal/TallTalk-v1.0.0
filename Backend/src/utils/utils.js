import jwt from "jsonwebtoken";

/**
 * Generates a JWT for the given user and sets it as an HTTP-only cookie.
 * @param {string} userId - The MongoDB _id of the user.
 * @param {object} res - Express response object.
 * @returns {string} The signed JWT token.
 */

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