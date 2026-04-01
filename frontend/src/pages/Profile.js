import React, { useState, useEffect } from 'react';
import axios from 'axios';

const avatars = ['🧑‍⚕️', '👩‍⚕️', '🧔', '👩', '👨', '🧕', '👱‍♀️', '👱'];

function Profile() {
  const [user, setUser] = useState(null);
  const [symptomCount, setSymptomCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [avatar, setAvatar] = useState('🧑‍⚕️');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) setAvatar(savedAvatar);

    const fetchData = async () => {
      try {
        const [symptoms, medicines, appointments] = await Promise.all([
          axios.get('https://symptomsync-backend.onrender.com/api/symptoms/all', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://symptomsync-backend.onrender.com/api/medicines/all', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://symptomsync-backend.onrender.com/api/appointments/all', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setSymptomCount(symptoms.data.length);
        setMedicineCount(medicines.data.length);
        setAppointmentCount(appointments.data.length);
      } catch (err) { console.log(err); }
    };
    fetchData();
  }, []);

  const changeAvatar = (a) => {
    setAvatar(a);
    localStorage.setItem('avatar', a);
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            🏥 SymptomSync
            <span>My Profile</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/home'}>🏠 Home</button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>{avatar}</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e', marginBottom: '4px' }}>
            {user?.name || 'User'}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>📧 {user?.email}</p>

          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: '600', color: '#555', fontSize: '14px', marginBottom: '12px' }}>Choose Your Avatar</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {avatars.map(a => (
                <button key={a} onClick={() => changeAvatar(a)} style={{
                  fontSize: '28px', background: avatar === a ? '#ede9fe' : '#f8f9ff',
                  border: avatar === a ? '2px solid #6366f1' : '2px solid #e8ecff',
                  borderRadius: '12px', padding: '8px 12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">📊 Health Summary</div>
          <div className="stat-grid">
            <div className="stat-card" style={{ background: '#e8f5e9' }}>
              <h2 style={{ color: '#10b981' }}>{symptomCount}</h2>
              <p style={{ color: '#065f46' }}>Symptoms</p>
            </div>
            <div className="stat-card" style={{ background: '#f3e5f5' }}>
              <h2 style={{ color: '#9C27B0' }}>{medicineCount}</h2>
              <p style={{ color: '#581c87' }}>Medicines</p>
            </div>
            <div className="stat-card" style={{ background: '#e3f2fd' }}>
              <h2 style={{ color: '#2196F3' }}>{appointmentCount}</h2>
              <p style={{ color: '#1e3a5f' }}>Appointments</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-title">⚡ Quick Links</div>
          {[
            { icon: '🤒', label: 'Log Symptoms', href: '/dashboard', color: '#fee2e2' },
            { icon: '📊', label: 'Health Graph', href: '/chart', color: '#ede9fe' },
            { icon: '💊', label: 'Medicine Reminders', href: '/medicine', color: '#d1fae5' },
            { icon: '🏥', label: 'Doctor Appointments', href: '/appointment', color: '#dbeafe' },
            { icon: '👨‍⚕️', label: 'Find Doctors', href: '/doctors', color: '#fef3c7' },
            { icon: '⚖️', label: 'BMI Calculator', href: '/bmi', color: '#fce7f3' },
            { icon: '💧', label: 'Water Tracker', href: '/water', color: '#e0f2fe' },
            { icon: '😴', label: 'Sleep Tracker', href: '/sleep', color: '#f5f3ff' },
            { icon: '😊', label: 'Mood Tracker', href: '/mood', color: '#fdf2f8' },
            { icon: '💡', label: 'Health Tips', href: '/tips', color: '#fffbeb' },
            { icon: '🆘', label: 'Emergency Contacts', href: '/emergency', color: '#fef2f2' },
          ].map(link => (
            <button key={link.label} onClick={() => window.location.href = link.href} className="quick-link-btn">
              <div style={{ width: '40px', height: '40px', background: link.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {link.icon}
              </div>
              <span>{link.label}</span>
              <span style={{ marginLeft: 'auto', color: '#9ca3af' }}>→</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Profile;