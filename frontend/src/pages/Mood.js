import React, { useState, useEffect } from 'react';

function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [log, setLog] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('moodLog');
    if (saved) setLog(JSON.parse(saved));
  }, []);

  const moods = [
    { emoji: '😄', label: 'Great', color: '#10b981', bg: '#f0fdf4' },
    { emoji: '🙂', label: 'Good', color: '#3b82f6', bg: '#eff6ff' },
    { emoji: '😐', label: 'Okay', color: '#f59e0b', bg: '#fffbeb' },
    { emoji: '😕', label: 'Bad', color: '#f97316', bg: '#fff7ed' },
    { emoji: '😢', label: 'Awful', color: '#ef4444', bg: '#fef2f2' },
  ];

  const addMood = () => {
    if (!selectedMood) { setMessage('Please select a mood!'); return; }
    const entry = {
      mood: selectedMood,
      note,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      id: Date.now()
    };
    const newLog = [entry, ...log].slice(0, 30);
    setLog(newLog);
    localStorage.setItem('moodLog', JSON.stringify(newLog));
    setMessage('Mood logged successfully!');
    setSelectedMood(null); setNote('');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteEntry = (id) => {
    const newLog = log.filter(e => e.id !== id);
    setLog(newLog);
    localStorage.setItem('moodLog', JSON.stringify(newLog));
  };

  const getMoodCount = (label) => log.filter(e => e.mood.label === label).length;
  const mostCommonMood = moods.reduce((a, b) => getMoodCount(a.label) > getMoodCount(b.label) ? a : b);

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            😊 Mood Tracker
            <span>Track your daily emotions</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Stats */}
        {log.length > 0 && (
          <div className="stat-grid" style={{ marginBottom: '20px' }}>
            <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
              <h2 style={{ color: '#6366f1' }}>{log.length}</h2>
              <p style={{ color: '#6b7280' }}>Entries</p>
            </div>
            <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
              <h2>{mostCommonMood.emoji}</h2>
              <p style={{ color: '#6b7280' }}>Most Common</p>
            </div>
            <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
              <h2 style={{ color: '#10b981' }}>{getMoodCount('Great') + getMoodCount('Good')}</h2>
              <p style={{ color: '#6b7280' }}>Good Days</p>
            </div>
          </div>
        )}

        <div className="card">
          <div className="section-title">💭 How are you feeling today?</div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            {moods.map(mood => (
              <button key={mood.label} onClick={() => setSelectedMood(mood)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                padding: '16px 20px', borderRadius: '16px', border: '2px solid',
                borderColor: selectedMood?.label === mood.label ? mood.color : '#e8ecff',
                background: selectedMood?.label === mood.label ? mood.bg : 'white',
                cursor: 'pointer', transition: 'all 0.2s',
                transform: selectedMood?.label === mood.label ? 'scale(1.1)' : 'scale(1)',
              }}>
                <span style={{ fontSize: '36px' }}>{mood.emoji}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: mood.color }}>{mood.label}</span>
              </button>
            ))}
          </div>

          <input className="input" placeholder="📝 What's on your mind? (optional)" value={note} onChange={e => setNote(e.target.value)} />

          <button className="btn btn-primary" onClick={addMood} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px' }}>
            Log Mood ✓
          </button>

          {message && (
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600', fontSize: '14px', background: '#f0fdf4', padding: '10px', borderRadius: '10px' }}>
              ✅ {message}
            </div>
          )}
        </div>

        {/* Mood Summary */}
        {log.length > 0 && (
          <div className="card">
            <div className="section-title">📊 Mood Summary</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {moods.map(mood => (
                <div key={mood.label} style={{ flex: '1', minWidth: '80px', background: mood.bg, border: `2px solid ${mood.color}20`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{mood.emoji}</div>
                  <div style={{ fontWeight: '800', color: mood.color, fontSize: '20px' }}>{getMoodCount(mood.label)}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{mood.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Log History */}
        {log.length > 0 && (
          <div className="card">
            <div className="section-title">📋 Mood History</div>
            {log.map(entry => (
              <div key={entry.id} style={{ background: entry.mood.bg, border: `1px solid ${entry.mood.color}30`, borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{entry.mood.emoji}</span>
                    <div>
                      <p style={{ fontWeight: '700', color: entry.mood.color, margin: 0 }}>{entry.mood.label}</p>
                      {entry.note && <p style={{ color: '#6b7280', fontSize: '13px', margin: '2px 0 0' }}>"{entry.note}"</p>}
                      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '2px 0 0' }}>📅 {entry.date} · ⏰ {entry.time}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteEntry(entry.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#ef4444', fontWeight: '700' }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Mood;
