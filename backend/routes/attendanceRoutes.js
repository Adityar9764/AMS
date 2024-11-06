
import express from "express";
import { getAttendanceRecords, recordAttendance } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, getAttendanceRecords);


router.post("/", authMiddleware, recordAttendance);

export default router;
