const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

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

const callAI = async (prompt) => {
  const models = [
    'google/gemma-3-4b-it:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
  ];

  for (const model of models) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.log(`Model ${model} failed, trying next...`);
    }
  }
  throw new Error('All AI models are busy. Please try again in a moment.');
};

router.post('/suggest', auth, async (req, res) => {
  try {
    const { symptoms } = req.body;
    const prompt = `Patient symptoms: "${symptoms}". Reply in exactly this format, nothing else:

🔍 Condition: (1 line)
💊 Medicine: (name + dosage only)
🏠 Home Remedy: (1-2 tips)
⚠️ See Doctor if: (1 line)

No extra text. No explanations. No questions.`;

    const suggestion = await callAI(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'AI Error', error: err.message });
  }
});

router.post('/doctors', auth, async (req, res) => {
  try {
    const { location, specialty } = req.body;
    const prompt = `Generate a list of 4 fictional but realistic doctor profiles for ${specialty} in ${location}, India.
    Return ONLY a JSON array with no extra text, like this:
    [
      {
        "name": "Dr. Full Name",
        "specialty": "${specialty}",
        "hospital": "Hospital Name",
        "experience": "X years",
        "rating": 4.5,
        "fee": 500
      }
    ]`;

    const text = await callAI(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    const doctors = JSON.parse(clean);
    res.json({ doctors });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'AI Error', error: err.message });
  }
});

module.exports = router;