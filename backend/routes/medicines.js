const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
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

// Medicine add karo
router.post('/add', auth, async (req, res) => {
  try {
    const { name, dosage, time, days } = req.body;
    const medicine = await Medicine.create({ userId: req.userId, name, dosage, time, days });
    res.json({ message: 'Medicine saved!', medicine });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

// Saari medicines lao
router.get('/all', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

// Medicine delete karo
router.delete('/:id', auth, async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

module.exports = router;