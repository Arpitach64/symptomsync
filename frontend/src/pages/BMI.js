import React, { useState } from 'react';

function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const result = (w / (h * h)).toFixed(1);
    setBmi(result);

    if (result < 18.5) setCategory({ label: 'Underweight', color: '#3b82f6', emoji: '⚠️', tip: 'You need to eat more nutritious food and gain healthy weight.' });
    else if (result < 25) setCategory({ label: 'Normal Weight', color: '#10b981', emoji: '✅', tip: 'Great! Maintain your healthy lifestyle with balanced diet and exercise.' });
    else if (result < 30) setCategory({ label: 'Overweight', color: '#f59e0b', emoji: '⚠️', tip: 'Consider reducing calorie intake and increasing physical activity.' });
    else setCategory({ label: 'Obese', color: '#ef4444', emoji: '🚨', tip: 'Please consult a doctor. Focus on diet and regular exercise.' });
  };

  const getBMIPosition = () => {
    if (!bmi) return 0;
    const min = 10, max = 40;
    return Math.min(Math.max(((bmi - min) / (max - min)) * 100, 0), 100);
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            ⚖️ BMI Calculator
            <span>Check your Body Mass Index</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        <div className="card">
          <div className="section-title">📏 Enter Your Details</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontWeight: '600', color: '#555', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Height (cm)</label>
              <input className="input" placeholder="e.g. 165" value={height} onChange={e => setHeight(e.target.value)} type="number" style={{ marginBottom: 0 }} />
            </div>
            <div>
              <label style={{ fontWeight: '600', color: '#555', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Weight (kg)</label>
              <input className="input" placeholder="e.g. 60" value={weight} onChange={e => setWeight(e.target.value)} type="number" style={{ marginBottom: 0 }} />
            </div>
          </div>

          <button className="btn btn-primary" onClick={calculateBMI} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px', marginTop: '16px' }}>
            Calculate BMI
          </button>
        </div>

        {bmi && (
          <>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', fontWeight: '800', color: category.color, marginBottom: '8px' }}>{bmi}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: category.color, marginBottom: '8px' }}>{category.emoji} {category.label}</div>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>{category.tip}</p>

              {/* BMI Scale */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ position: 'relative', height: '12px', borderRadius: '6px', background: 'linear-gradient(to right, #3b82f6 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%)', marginBottom: '8px' }}>
                  <div style={{ position: 'absolute', top: '-4px', left: `${getBMIPosition()}%`, transform: 'translateX(-50%)', width: '20px', height: '20px', background: 'white', border: `3px solid ${category.color}`, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af' }}>
                  <span>Underweight<br/>&lt;18.5</span>
                  <span>Normal<br/>18.5-24.9</span>
                  <span>Overweight<br/>25-29.9</span>
                  <span>Obese<br/>&gt;30</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">📊 BMI Categories</div>
              {[
                { range: '< 18.5', label: 'Underweight', color: '#3b82f6' },
                { range: '18.5 - 24.9', label: 'Normal Weight', color: '#10b981' },
                { range: '25 - 29.9', label: 'Overweight', color: '#f59e0b' },
                { range: '≥ 30', label: 'Obese', color: '#ef4444' },
              ].map(cat => (
                <div key={cat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '10px', marginBottom: '8px', background: '#fafbff', border: `2px solid ${cat.label === category.label ? cat.color : '#e8ecff'}` }}>
                  <span style={{ fontWeight: '600', color: cat.color }}>{cat.label}</span>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>BMI {cat.range}</span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default BMI;