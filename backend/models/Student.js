
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Student', studentSchema);
