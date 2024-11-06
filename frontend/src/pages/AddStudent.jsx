import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [division, setDivision] = useState('');
  const [rollNo, setRollNo] = useState('');
  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/students', { name, division, rollNo });
      alert('Student added successfully');
      setName('');
      setDivision('');
      setRollNo('');
      navigate('/profile'); 
    } catch (error) {
      console.error('Failed to add student', error);
      alert('Error adding student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleAddStudent}>
      <label>
        Name:
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Division:
        <input
          type="text"
          placeholder="Division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          required
        />
      </label>

      <label>
        Roll No:
        <input
          type="number"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
