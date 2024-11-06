import Attendance from '../models/attendance.js';
import Student from '../models/Student.js';

export const addLeave = async (req, res) => {
  
  const { studentName, division, rollNo, date, reason } = req.body;

  try {
    // Find the student by name, division, and roll number
    const student = await Student.findOne({ name: studentName, division, rollNo });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Convert date string to a Date object
    const absenceDate = new Date(date);

    // Find the student's attendance record or create a new one if it doesn't exist
    let attendance = await Attendance.findOne({ student: student._id });
    if (!attendance) {
      attendance = new Attendance({ student: student._id, attendanceRecords: [] });
    }

    // Add or update the absence record for the specified date
    const existingRecordIndex = attendance.attendanceRecords.findIndex(
      (record) => record.date.toISOString().split('T')[0] === absenceDate.toISOString().split('T')[0]
    );

    if (existingRecordIndex !== -1) {
      // Update existing record
      attendance.attendanceRecords[existingRecordIndex].isPresent = false;
      attendance.attendanceRecords[existingRecordIndex].reason = reason;
    } else {
      // Add new absence record
      attendance.attendanceRecords.push({
        date: absenceDate,
        isPresent: false,
        reason,
      });
    }

    await attendance.save();
    res.status(200).json({ message: 'Leave added successfully' });
  } catch (error) {
    console.error('Error adding leave:', error);
    res.status(500).json({ message: 'Failed to add leave' });
  }
};

export const getAbsences = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const absences = await Attendance.find({
      'attendanceRecords.date': { $gte: new Date(startDate), $lte: new Date(endDate) },
      'attendanceRecords.isPresent': false
    }).populate('student', 'name division rollNo');

    const absenceData = absences.flatMap(att => 
      att.attendanceRecords
        .filter(record => !record.isPresent && record.date >= new Date(startDate) && record.date <= new Date(endDate))
        .map(record => ({
          studentName: att.student.name,
          division: att.student.division,
          rollNo: att.student.rollNo,
          date: record.date,
          reason: record.reason
        }))
    );

    res.json(absenceData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
