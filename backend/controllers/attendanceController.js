// backend/controllers/attendanceController.js
import Attendance from "../models/attendance.js";

export const getAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.find().populate("user", "name role domain");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const recordAttendance = async (req, res) => {
  const { userId, status } = req.body;
  try {
    const attendance = new Attendance({ user: userId, status, date: new Date() });
    await attendance.save();
    res.json({ message: "Attendance recorded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
