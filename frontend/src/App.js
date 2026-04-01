import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Chart from './pages/Chart';
import Medicine from './pages/Medicine';
import Appointment from './pages/Appointment';
import Profile from './pages/Profile';
import Doctors from './pages/Doctors';
import BMI from './pages/BMI';
import Water from './pages/Water';
import Sleep from './pages/Sleep';
import Mood from './pages/Mood';
import HealthTips from './pages/HealthTips';
import Emergency from './pages/Emergency';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/water" element={<Water />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/tips" element={<HealthTips />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;