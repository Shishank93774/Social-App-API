import express from 'express';
import {
    getUser,
    getUserFollowings,
    followToggle 
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/followings", verifyToken, getUserFollowings);

// Update
router.patch("/:id/:personId", verifyToken, followToggle);

export default router;