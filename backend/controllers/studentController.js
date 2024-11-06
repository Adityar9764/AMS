import Student from '../models/Student.js';

export const addStudent = async (req, res) => {
  const { name, division, rollNo } = req.body;
  try {
    const newStudent = new Student({ name, division, rollNo });
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
};
