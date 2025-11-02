import {sendWelcomeEmail} from "../Email/emailHandler.handler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/utils.js";
import messageModel from "../models/message.model.js";

const GENERIC_CLIENT_ERROR = "Authentication failed.";
const GENERIC_SERVER_ERROR = "Internal server error.";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({message : "All the fields are required."});
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // strong password regex.

    if(!passwordRegex.test(password)) {
        return res.status(400).json({
            message : "Password must be at least 8 characters long, includes one uppercase letter and one number."
        })
    }
    // checking if the email or the username is already used.
    try {
        const userExists = await User.findOne({$or: [{email}, {fullName}]});

        if (userExists) {
            if (userExists.email === email) { // the email of the userExists is equal to the input the user submitted.
                return res.status(400).json({message: "Email already exists."});
            }
            return res.status(400).json({message: "A user with the same full name already exists."});
        }

        const securePassword = await bcrypt.hash(password, 10);

        const createdUser = await new User({
            fullName,
            email,
            password: securePassword,
        }).save();

        generateToken(createdUser._id, res);

        res.status(201).json({
            _id: createdUser._id,
            fullName: createdUser.fullName,
            email: createdUser.email,
            profilePic: createdUser.profilePic,
        });

        sendWelcomeEmail(createdUser.email, createdUser.fullName, process.env.CLIENT_URL).catch((err) =>
            console.error("Failed to send welcome email:", err)
        );
    } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({ message: GENERIC_SERVER_ERROR });
    }
}

export const login = async (req, res) => {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
        return res.status(400).json({ message: "The credentials are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: GENERIC_CLIENT_ERROR });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: GENERIC_CLIENT_ERROR });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: GENERIC_SERVER_ERROR });
    }
}

export const logout = (_, res) => {
    res.cookie("jwt", "", {maxAge : 0});
    res.status(200).json({message : " Logged out successfully. "});
}

;
