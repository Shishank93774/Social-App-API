import express from 'express';
import { createChat, userChats, findChats } from '../controllers/chat.js';

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:userId/:toId", findChats);

export default router;