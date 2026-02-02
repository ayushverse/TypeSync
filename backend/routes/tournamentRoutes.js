import express from 'express';
import { getTournaments, joinTournament } from '../controllers/tournamentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTournaments);
router.post('/join', protect, joinTournament);

export default router;
