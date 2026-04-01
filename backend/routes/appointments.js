const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

// Token verify middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, 'secret123');
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Appointment add karo
router.post('/add', auth, async (req, res) => {
  try {
    const { doctorName, specialization, date, time, notes } = req.body;
    const appointment = await Appointment.create({ userId: req.userId, doctorName, specialization, date, time, notes });
    res.json({ message: 'Appointment saved!', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

// Saare appointments lao
router.get('/all', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

// Appointment delete karo
router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

module.exports = router;