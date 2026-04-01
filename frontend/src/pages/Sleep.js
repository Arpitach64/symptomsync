import React, { useState, useEffect } from 'react';

function Sleep() {
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState(3);
  const [log, setLog] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sleepLog');
    if (saved) setLog(JSON.parse(saved));
  }, []);

  const calculateHours = (bed, wake) => {
    const [bh, bm] = bed.split(':').map(Number);
    const [wh, wm] = wake.split(':').map(Number);
    let diff = (wh * 60 + wm) - (bh * 60 + bm);
    if (diff < 0) diff += 24 * 60;
    return (diff / 60).toFixed(1);
  };

  const addSleep = () => {
    if (!bedTime || !wakeTime) { setMessage('Please enter bed time and wake time!'); return; }
    const hours = calculateHours(bedTime, wakeTime);
    const entry = {
      date: new Date().toLocaleDateString(),
      bedTime, wakeTime, hours: parseFloat(hours), quality,
      id: Date.now()
    };
    const newLog = [entry, ...log].slice(0, 14);
    setLog(newLog);
    localStorage.setItem('sleepLog', JSON.stringify(newLog));
    setMessage(`Sleep logged! You slept ${hours} hours.`);
    setBedTime(''); setWakeTime(''); setQuality(3);
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteEntry = (id) => {
    const newLog = log.filter(e => e.id !== id);
    setLog(newLog);
    localStorage.setItem('sleepLog', JSON.stringify(newLog));
  };

  const getSleepEmoji = (hours) => {
    if (hours >= 8) return { emoji: '😴', color: '#10b981', label: 'Excellent' };
    if (hours >= 7) return { emoji: '😊', color: '#3b82f6', label: 'Good' };
    if (hours >= 6) return { emoji: '😐', color: '#f59e0b', label: 'Fair' };
    return { emoji: '😟', color: '#ef4444', label: 'Poor' };
  };

  const avgSleep = log.length > 0 ? (log.reduce((a, b) => a + b.hours, 0) / log.length).toFixed(1) : 0;
  const qualityEmojis = ['😟', '😕', '😐', '😊', '😴'];

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            😴 Sleep Tracker
            <span>Track your sleep patterns</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid" style={{ marginBottom: '20px' }}>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: '#6366f1' }}>{avgSleep}h</h2>
            <p style={{ color: '#6b7280' }}>Avg Sleep</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: '#10b981' }}>{log.length}</h2>
            <p style={{ color: '#6b7280' }}>Days Tracked</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: '#f59e0b' }}>8h</h2>
            <p style={{ color: '#6b7280' }}>Recommended</p>
          </div>
        </div>

        <div className="card">
          <div className="section-title">🌙 Log Tonight's Sleep</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontWeight: '600', color: '#555', fontSize: '14px', display: 'block', marginBottom: '8px' }}>🌙 Bed Time</label>
              <input className="input" type="time" value={bedTime} onChange={e => setBedTime(e.target.value)} style={{ marginBottom: 0 }} />
            </div>
            <div>
              <label style={{ fontWeight: '600', color: '#555', fontSize: '14px', display: 'block', marginBottom: '8px' }}>☀️ Wake Time</label>
              <input className="input" type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} style={{ marginBottom: 0 }} />
            </div>
          </div>

          <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', color: '#555', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
              Sleep Quality: {qualityEmojis[quality - 1]}
            </label>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {qualityEmojis.map((emoji, i) => (
                <button key={i} onClick={() => setQuality(i + 1)} style={{
                  fontSize: '28px', background: quality === i + 1 ? '#ede9fe' : '#fafbff',
                  border: quality === i + 1 ? '2px solid #6366f1' : '2px solid #e8ecff',
                  borderRadius: '12px', padding: '8px 12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={addSleep} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px' }}>
            Log Sleep ✓
          </button>

          {message && (
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600', fontSize: '14px', background: '#f0fdf4', padding: '10px', borderRadius: '10px' }}>
              ✅ {message}
            </div>
          )}
        </div>

        {log.length > 0 && (
          <div className="card">
            <div className="section-title">📋 Sleep History</div>
            {log.map(entry => {
              const status = getSleepEmoji(entry.hours);
              return (
                <div key={entry.id} style={{ background: '#fafbff', border: '1px solid #e8ecff', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', background: '#f0f4ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        {status.emoji}
                      </div>
                      <div>
                        <p style={{ fontWeight: '700', color: '#1a1a2e', margin: 0 }}>{entry.hours} hours — {status.label}</p>
                        <p style={{ color: '#6b7280', fontSize: '13px', margin: '2px 0 0' }}>🌙 {entry.bedTime} → ☀️ {entry.wakeTime}</p>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: '2px 0 0' }}>📅 {entry.date} · Quality: {qualityEmojis[entry.quality - 1]}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteEntry(entry.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#ef4444', fontWeight: '700' }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Sleep;