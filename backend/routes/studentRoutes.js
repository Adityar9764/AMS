import express from 'express';
import { addStudent } from '../controllers/studentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addStudent);

export default router;
