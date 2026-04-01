const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');
const medicineRoutes = require('./routes/medicines');
const appointmentRoutes = require('./routes/appointments');
const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('DB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SymptomSync Backend chal raha hai!' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} pe chal raha hai`);
});