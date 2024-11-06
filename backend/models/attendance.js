import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  attendanceRecords: [
    {
      date: {
        type: Date,
        required: true
      },
      isPresent: {
        type: Boolean,
        default: true
      },
      reason: {
        type: String,  
        default: ''
      }
    }
  ]
});

export default mongoose.model('Attendance', attendanceSchema);
