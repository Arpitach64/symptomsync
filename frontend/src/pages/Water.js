import React, { useState, useEffect } from 'react';

function Water() {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('waterLog');
    const savedDate = localStorage.getItem('waterDate');
    const today = new Date().toDateString();

    if (savedDate === today && saved) {
      const data = JSON.parse(saved);
      setGlasses(data.glasses);
      setLog(data.log);
    } else {
      localStorage.setItem('waterDate', today);
      localStorage.setItem('waterLog', JSON.stringify({ glasses: 0, log: [] }));
    }
  }, []);

  const addWater = (amount) => {
    const newGlasses = glasses + amount;
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const newLog = [...log, { amount, time }];
    setGlasses(newGlasses);
    setLog(newLog);
    localStorage.setItem('waterLog', JSON.stringify({ glasses: newGlasses, log: newLog }));
  };

  const reset = () => {
    setGlasses(0);
    setLog([]);
    localStorage.setItem('waterLog', JSON.stringify({ glasses: 0, log: [] }));
  };

  const percentage = Math.min((glasses / goal) * 100, 100);
  const getColor = () => {
    if (percentage >= 100) return '#10b981';
    if (percentage >= 60) return '#3b82f6';
    if (percentage >= 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            💧 Water Tracker
            <span>Stay hydrated every day</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>
            {percentage >= 100 ? '🎉' : percentage >= 60 ? '💧' : percentage >= 30 ? '😐' : '😟'}
          </div>

          <div style={{ position: 'relative', width: '160px', height: '160px', margin: 'auto', marginBottom: '20px' }}>
            <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="#e8ecff" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke={getColor()} strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: getColor() }}>{glasses}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>of {goal} glasses</div>
            </div>
          </div>

          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            {percentage >= 100 ? '🎉 Daily goal achieved! Great job!' :
             `${goal - glasses} more glasses to reach your goal`}
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            {[0.5, 1, 1.5, 2].map(amount => (
              <button key={amount} onClick={() => addWater(amount)} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '14px' }}>
                +{amount} 🥛
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <label style={{ fontWeight: '600', color: '#555', fontSize: '14px' }}>Daily Goal:</label>
            <input type="number" value={goal} onChange={e => setGoal(Number(e.target.value))}
              style={{ width: '70px', padding: '8px', border: '2px solid #e8ecff', borderRadius: '8px', textAlign: 'center', fontWeight: '700' }} />
            <span style={{ color: '#6b7280', fontSize: '14px' }}>glasses</span>
            <button onClick={reset} className="btn btn-danger" style={{ padding: '8px 14px', fontSize: '12px' }}>Reset</button>
          </div>
        </div>

        {log.length > 0 && (
          <div className="card">
            <div className="section-title">📝 Today's Log</div>
            {[...log].reverse().map((entry, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '10px', marginBottom: '8px', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <span style={{ fontSize: '20px' }}>💧</span>
                <span style={{ fontWeight: '600', color: '#1a1a2e' }}>{entry.amount} glass{entry.amount > 1 ? 'es' : ''}</span>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>⏰ {entry.time}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Water;