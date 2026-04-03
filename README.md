# 🏥 SymptomSync - AI-Powered Health Tracking App

> Your personal health assistant powered by AI

🌐 **Live Demo:** [symptomsync-tau.vercel.app](https://symptomsync-tau.vercel.app)

---

## ✨ Features

- 🤒 **Symptom Tracking** — Log daily symptoms with severity levels and notes
- 🤖 **AI Health Suggestions** — Get instant medicine suggestions powered by AI
- 👨‍⚕️ **Find Doctors** — Search real doctors near you via Google Maps
- 📊 **Health Graph** — Visualize symptom trends over time
- 💊 **Medicine Reminders** — Never miss a dose with day-wise reminders
- 🏥 **Doctor Appointments** — Book and manage appointments
- 📄 **PDF Reports** — Generate medical reports for doctor visits
- ⚖️ **BMI Calculator** — Check your Body Mass Index
- 💧 **Water Tracker** — Track daily water intake
- 😴 **Sleep Tracker** — Monitor sleep patterns
- 😊 **Mood Tracker** — Track daily emotions
- 💡 **Health Tips** — Daily wellness advice
- 🆘 **Emergency Contacts** — Quick access to emergency numbers

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | AI |
|----------|---------|----------|----|
| React.js | Node.js | MongoDB Atlas | OpenRouter AI |
| React Router | Express.js | Mongoose | Gemini API |
| Recharts | JWT Auth | | |
| jsPDF | bcryptjs | | |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- MongoDB Atlas account
- OpenRouter API key

### Installation
```bash
# Clone the repository
git clone https://github.com/Arpitach64/symptomsync.git
cd symptomsync

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create `backend/.env` file:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Run Locally
```bash
# Start backend (Terminal 1)
cd backend
node server.js

# Start frontend (Terminal 2)
cd frontend
npm start
```

---

## 📱 Screenshots

### 🏠 Landing Page
Beautiful landing page with features overview

### 📊 Dashboard
Track symptoms with AI suggestions and health graph

### 👨‍⚕️ Find Doctors
Search real doctors via Google Maps integration

---

## 🌐 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 👩‍💻 Developer

Made with ❤️ by **Arpita Chaudhary**

[![GitHub](https://img.shields.io/badge/GitHub-Arpitach64-black?style=flat&logo=github)](https://github.com/Arpitach64)

---

## ⚠️ Disclaimer

This app provides general health information only. Always consult a qualified doctor for medical advice.
