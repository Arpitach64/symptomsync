import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Medicine() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [days, setDays] = useState([]);
  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/medicines/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchMedicines(); }, []);

  const toggleDay = (day) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleAdd = async () => {
    if (!name || !dosage || !time || days.length === 0) {
      setMessage('Please fill all fields!'); return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/medicines/add',
        { name, dosage, time, days },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setName(''); setDosage(''); setTime(''); setDays([]);
      fetchMedicines();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding medicine');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/medicines/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedicines();
    } catch (err) { console.log(err); }
  };

  const todayMedicines = list.filter(m => m.days.includes(todayDay));

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            💊 Medicine Reminders
            <span>Never miss a dose</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Today's Medicines */}
        {todayMedicines.length > 0 && (
          <div className="card" style={{ marginBottom: '20px', border: '2px solid #10b981' }}>
            <div className="section-title" style={{ color: '#10b981' }}>
              ✅ Today's Medicines ({todayDay})
            </div>
            {todayMedicines.map(item => (
              <div key={item._id} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💊</div>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', margin: 0 }}>{item.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{item.dosage} · ⏰ {item.time}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* Add Medicine */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">➕ Add New Medicine</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input className="input" placeholder="💊 Medicine name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: 0 }} />
            <input className="input" placeholder="📏 Dosage (e.g. 500mg)" value={dosage} onChange={e => setDosage(e.target.value)} style={{ marginBottom: 0 }} />
          </div>

          <input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} style={{ marginTop: '12px' }} />

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', color: '#555', fontSize: '14px', marginBottom: '10px' }}>Select Days</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {allDays.map(day => (
                <button key={day} onClick={() => toggleDay(day)} style={{
                  padding: '8px 14px', borderRadius: '10px', border: '2px solid',
                  borderColor: days.includes(day) ? '#6366f1' : '#e8ecff',
                  background: days.includes(day) ? '#6366f1' : 'white',
                  color: days.includes(day) ? 'white' : '#555',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {day}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleAdd} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px' }}>
            Save Medicine ✓
          </button>
          {message && <p style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600' }}>{message}</p>}
        </div>

        {/* All Medicines */}
        <div className="card">
          <div className="section-title">📋 All Medicines</div>
          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💊</div>
              <p>No medicines added yet</p>
            </div>
          ) : list.map(item => (
            <div key={item._id} style={{ background: '#fafbff', border: '1px solid #e8ecff', borderRadius: '12px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', background: '#ede9fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💊</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', margin: 0 }}>{item.name}</p>
                  <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{item.dosage} · ⏰ {item.time}</p>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                    {item.days.map(d => (
                      <span key={d} style={{ background: '#6366f1', color: 'white', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => handleDelete(item._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Medicine;