// backend/models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Attendance', attendanceSchema);
