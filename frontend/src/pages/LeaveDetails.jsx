import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

const LeaveDetails = () => {
  const [studentName, setStudentName] = useState('');
  const [division, setDivision] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [absences, setAbsences] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddLeave = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/leaves/add', { studentName, division, rollNo, date, reason });
      alert('Leave added successfully');
      fetchAbsences();  // Refresh absences after adding leave
    } catch (error) {
      console.error('Failed to add leave', error);
      alert('Failed to add leave');
    }
  };

  const fetchAbsences = async () => {
    try {
      const response = await api.get('/leaves/absences', { params: { startDate, endDate } });
      setAbsences(response.data);
    } catch (error) {
      console.error('Failed to fetch absences', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) fetchAbsences();
  }, [startDate, endDate]);

  return (
    <div>
      {/* Section 1: Form to add leave */}
      <form onSubmit={handleAddLeave}>
        <h2>Add Leave Details</h2>
        <label>
          Student Name:
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </label>
        <label>
          Division:
          <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} required />
        </label>
        <label>
          Roll No:
          <input type="number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
        </label>
        <label>
          Date of Absence:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Reason for Absence:
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
        </label>
        <button type="submit">Add Leave</button>
      </form>

      {/* Section 2: Table to display absences */}
      <h2>View Absences</h2>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <button onClick={fetchAbsences}>Filter</button>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Division</th>
            <th>Roll No</th>
            <th>Date of Absence</th>
            <th>Reason for Absence</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((absence, index) => (
            <tr key={index}>
              <td>{absence.studentName}</td>
              <td>{absence.division}</td>
              <td>{absence.rollNo}</td>
              <td>{new Date(absence.date).toLocaleDateString()}</td>
              <td>{absence.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveDetails;
