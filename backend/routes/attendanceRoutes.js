
import express from "express";
import { getAttendanceRecords, recordAttendance } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /attendance - Get attendance records (accessible to both HOD and staff)
router.get("/", authMiddleware, getAttendanceRecords);

// POST /attendance - Record attendance for a user (accessible to both HOD and staff)
router.post("/", authMiddleware, recordAttendance);

export default router;
