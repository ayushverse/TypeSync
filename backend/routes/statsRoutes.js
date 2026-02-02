import express from 'express';
import { getLeaderboard, updateStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.post('/update', protect, updateStats);

export default router;
