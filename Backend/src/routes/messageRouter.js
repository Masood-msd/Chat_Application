import express from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { getUsersForSideBar, MessagesOfUsers, sendMessages } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/user", verifyUser, getUsersForSideBar)
router.get("/:id", verifyUser, MessagesOfUsers)

router.post("/send/:id", verifyUser, sendMessages)

export default router;