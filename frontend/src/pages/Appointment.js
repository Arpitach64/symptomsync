import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointment() {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const today = new Date().toISOString().split('T')[0];

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('https://symptomsync-backend.onrender.com/api/appointments/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleAdd = async () => {
    if (!doctorName || !date || !time) {
      setMessage('Doctor name, date and time are required!'); return;
    }
    try {
      const res = await axios.post('https://symptomsync-backend.onrender.com/api/appointments/add',
        { doctorName, specialization, date, time, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setDoctorName(''); setSpecialization(''); setDate(''); setTime(''); setNotes('');
      fetchAppointments();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) { setMessage('Error adding appointment'); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://symptomsync-backend.onrender.com/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAppointments();
    } catch (err) { console.log(err); }
  };

  const upcoming = list.filter(a => a.date >= today);
  const past = list.filter(a => a.date < today);

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            🏥 Doctor Appointments
            <span>Manage your appointments</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/doctors'}>👨‍⚕️ Find Doctors</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="card" style={{ marginBottom: '20px', border: '2px solid #6366f1' }}>
            <div className="section-title">📅 Upcoming Appointments ({upcoming.length})</div>
            {upcoming.map(item => (
              <div key={item._id} style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👨‍⚕️</div>
                    <div>
                      <p style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '16px', margin: 0 }}>{item.doctorName}</p>
                      {item.specialization && <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '600', margin: 0 }}>{item.specialization}</p>}
                      <p style={{ color: '#6b7280', fontSize: '13px', margin: '4px 0 0' }}>📅 {item.date} · ⏰ {item.time}</p>
                      {item.notes && <p style={{ color: '#6b7280', fontSize: '12px', margin: '4px 0 0' }}>📝 {item.notes}</p>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Appointment */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">➕ Book New Appointment</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input className="input" placeholder="👨‍⚕️ Doctor name" value={doctorName} onChange={e => setDoctorName(e.target.value)} style={{ marginBottom: 0 }} />
            <input className="input" placeholder="🏥 Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ marginBottom: 0 }} />
            <input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          <input className="input" placeholder="📝 Notes (e.g. bring reports, fasting required)" value={notes} onChange={e => setNotes(e.target.value)} style={{ marginTop: '12px' }} />

          <button className="btn btn-primary" onClick={handleAdd} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px' }}>
            Book Appointment ✓
          </button>
          {message && <p style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600' }}>{message}</p>}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <div className="card">
            <div className="section-title">🕐 Past Appointments</div>
            {past.map(item => (
              <div key={item._id} style={{ background: '#fafbff', border: '1px solid #e8ecff', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👨‍⚕️</div>
                    <div>
                      <p style={{ fontWeight: '700', color: '#6b7280', fontSize: '15px', margin: 0 }}>{item.doctorName}</p>
                      {item.specialization && <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>{item.specialization}</p>}
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '4px 0 0' }}>📅 {item.date} · ⏰ {item.time}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {list.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏥</div>
            <p style={{ color: '#888', fontSize: '15px' }}>No appointments yet</p>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '6px' }}>Book your first appointment above</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Appointment;