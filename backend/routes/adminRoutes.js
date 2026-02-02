import express from 'express';
import { getAllUsers, deleteUser, systemStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check if user is admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.get('/users', protect, admin, getAllUsers);
router.get('/stats', protect, admin, systemStats);
router.delete('/user/:id', protect, admin, deleteUser);

export default router;
