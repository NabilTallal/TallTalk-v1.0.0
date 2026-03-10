import express from "express";
import {signup, login, logout, updateProfilePic} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import {securityProtection} from "../middleware/security.middleware.js";

const router = express.Router();

// router.use(securityProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectRoute,updateProfilePic);
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;
