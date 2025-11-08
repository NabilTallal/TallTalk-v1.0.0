import express from "express";
import {
    deleteMessageForEveryone,
    getAllUsers,
    getChatPartners,
    getMessagesByUserId,
    sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { securityProtection } from "../middleware/TallSec.middleware.js";

const router = express.Router();

// Middlewares execute in order: rate limiting first, then authentication
router.use(securityProtection, protectRoute);

router.get("/contacts", getAllUsers);
router.get("/chats", getChatPartners);
router.get("/users/:userId/messages", getMessagesByUserId);
router.post("/users/:userId/messages", sendMessage);
router.put("/messages/:messageId/deleteForAll", deleteMessageForEveryone);

export default router;
