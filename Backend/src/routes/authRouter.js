import express from "express";
import { login, logout, profileUpdate, signup, validateUser } from "../controllers/auth.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/update-profile", verifyUser ,profileUpdate)

router.get("/check", verifyUser, validateUser)

export default router;
