import express from "express";
import {signup, login, logout, updateProfilePic} from "../Controllers/auth.controller.js";
import {protectRoute} from "../Middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectRoute,updateProfilePic);
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;
