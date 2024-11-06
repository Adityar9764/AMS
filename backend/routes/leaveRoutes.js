import express from 'express';
import { addLeave, getAbsences } from '../controllers/leaveController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware,  addLeave);  // Route to add leave
router.get('/absences', authMiddleware, getAbsences);  // Route to retrieve absences

export default router;
