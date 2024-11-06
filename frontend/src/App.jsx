
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FaceDetection from './pages/FaceDetection';
import AddStudent from './pages/AddStudent';
import LeaveDetails from './pages/LeaveDetails';
import AttendanceRecord from './pages/AttendanceRecord';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const location = useLocation();

  // Only show the Navbar if we are not on the Login page
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/face-detection" element={<ProtectedRoute><FaceDetection /></ProtectedRoute>} />
        <Route path="/add-student" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/leave-details" element={<ProtectedRoute><LeaveDetails /></ProtectedRoute>} />
        <Route path="/attendance-record" element={<ProtectedRoute><AttendanceRecord /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
