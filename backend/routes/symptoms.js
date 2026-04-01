const express = require('express');
const router = express.Router();
const Symptom = require('../models/Symptom');
const jwt = require('jsonwebtoken');

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

router.post('/add', auth, async (req, res) => {
  try {
    const { symptoms, severity, notes } = req.body;
    const symptom = await Symptom.create({ userId: req.userId, symptoms, severity, notes });
    res.json({ message: 'Symptom saved!', symptom });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.userId }).sort({ date: -1 });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Symptom.findByIdAndDelete(req.params.id);
    res.json({ message: 'Symptom deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

module.exports = router;