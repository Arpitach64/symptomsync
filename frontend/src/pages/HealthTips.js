import React, { useState, useEffect } from 'react';

const allTips = [
  { icon: '💧', title: 'Stay Hydrated', tip: 'Drink at least 8 glasses of water daily. Proper hydration improves energy, skin health, and digestion.', category: 'Lifestyle', color: '#3b82f6', bg: '#eff6ff' },
  { icon: '🥗', title: 'Eat More Vegetables', tip: 'Include at least 5 servings of fruits and vegetables daily. They provide essential vitamins, minerals, and fiber.', category: 'Nutrition', color: '#10b981', bg: '#f0fdf4' },
  { icon: '🏃', title: 'Exercise Daily', tip: 'Aim for at least 30 minutes of moderate exercise daily. Even a brisk walk can improve heart health significantly.', category: 'Fitness', color: '#f59e0b', bg: '#fffbeb' },
  { icon: '😴', title: 'Sleep 7-8 Hours', tip: 'Quality sleep is essential for immune function, mental health, and physical recovery. Maintain a consistent sleep schedule.', category: 'Sleep', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: '🧘', title: 'Practice Meditation', tip: 'Just 10 minutes of daily meditation can reduce stress, improve focus, and boost emotional wellbeing.', category: 'Mental Health', color: '#ec4899', bg: '#fdf2f8' },
  { icon: '🚶', title: 'Take Regular Breaks', tip: 'If you work at a desk, take a 5-minute break every hour. Stand up, stretch, and walk around to prevent back pain.', category: 'Lifestyle', color: '#6366f1', bg: '#f0f4ff' },
  { icon: '🍎', title: 'Eat Whole Foods', tip: 'Choose whole grains over refined ones. Brown rice, oats, and whole wheat bread provide more nutrients and fiber.', category: 'Nutrition', color: '#ef4444', bg: '#fef2f2' },
  { icon: '☀️', title: 'Get Sunlight', tip: 'Spend 15-20 minutes in sunlight daily. It helps your body produce Vitamin D, which is essential for bone health and immunity.', category: 'Lifestyle', color: '#f97316', bg: '#fff7ed' },
  { icon: '🦷', title: 'Oral Hygiene', tip: 'Brush twice daily and floss once. Poor oral health is linked to heart disease, diabetes, and respiratory infections.', category: 'Hygiene', color: '#14b8a6', bg: '#f0fdfa' },
  { icon: '🧠', title: 'Stay Mentally Active', tip: 'Read books, solve puzzles, or learn new skills. Mental stimulation helps prevent cognitive decline as you age.', category: 'Mental Health', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: '🥜', title: 'Healthy Snacking', tip: 'Replace chips and cookies with nuts, seeds, or fruits. Healthy snacks maintain energy levels and prevent overeating.', category: 'Nutrition', color: '#10b981', bg: '#f0fdf4' },
  { icon: '🚭', title: 'Avoid Smoking', tip: 'Smoking damages nearly every organ in the body. Quitting smoking reduces risk of cancer, heart disease, and stroke.', category: 'Lifestyle', color: '#ef4444', bg: '#fef2f2' },
  { icon: '🍵', title: 'Drink Green Tea', tip: 'Green tea is rich in antioxidants. It may help reduce the risk of heart disease, improve brain function, and aid weight loss.', category: 'Nutrition', color: '#10b981', bg: '#f0fdf4' },
  { icon: '🏋️', title: 'Strength Training', tip: 'Include strength training 2-3 times per week. It builds muscle, strengthens bones, and boosts metabolism.', category: 'Fitness', color: '#f59e0b', bg: '#fffbeb' },
  { icon: '👥', title: 'Stay Social', tip: 'Maintain strong social connections. Loneliness is as harmful as smoking 15 cigarettes a day for your health.', category: 'Mental Health', color: '#ec4899', bg: '#fdf2f8' },
];

function HealthTips() {
  const [category, setCategory] = useState('All');
  const [savedTips, setSavedTips] = useState([]);
  const [todayTip, setTodayTip] = useState(null);

  const categories = ['All', 'Nutrition', 'Fitness', 'Lifestyle', 'Mental Health', 'Sleep', 'Hygiene'];

  useEffect(() => {
    const saved = localStorage.getItem('savedTips');
    if (saved) setSavedTips(JSON.parse(saved));
    const dayIndex = new Date().getDay();
    setTodayTip(allTips[dayIndex % allTips.length]);
  }, []);

  const toggleSave = (tip) => {
    const isSaved = savedTips.some(t => t.title === tip.title);
    const newSaved = isSaved ? savedTips.filter(t => t.title !== tip.title) : [...savedTips, tip];
    setSavedTips(newSaved);
    localStorage.setItem('savedTips', JSON.stringify(newSaved));
  };

  const isSaved = (tip) => savedTips.some(t => t.title === tip.title);

  const filteredTips = category === 'All' ? allTips : allTips.filter(t => t.category === category);

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            💡 Health Tips
            <span>Daily wellness advice</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Tip of the Day */}
        {todayTip && (
          <div style={{ background: `linear-gradient(135deg, ${todayTip.color}, ${todayTip.color}99)`, borderRadius: '20px', padding: '28px', marginBottom: '20px', color: 'white', boxShadow: `0 8px 32px ${todayTip.color}40` }}>
            <p style={{ fontSize: '12px', fontWeight: '700', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>💡 Tip of the Day</p>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{todayTip.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{todayTip.title}</h3>
            <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>{todayTip.tip}</p>
            <span style={{ display: 'inline-block', marginTop: '12px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
              {todayTip.category}
            </span>
          </div>
        )}

        {/* Categories */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: '8px 16px', borderRadius: '20px', border: '2px solid',
                borderColor: category === cat ? '#6366f1' : '#e8ecff',
                background: category === cat ? '#6366f1' : 'white',
                color: category === cat ? 'white' : '#555',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div style={{ display: 'grid', gap: '14px' }}>
          {filteredTips.map((tip, index) => (
            <div key={index} className="card" style={{ padding: '20px', marginBottom: 0, border: `2px solid ${isSaved(tip) ? tip.color : '#e8ecff'}` }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '52px', height: '52px', background: tip.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                  {tip.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <h4 style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', margin: 0 }}>{tip.title}</h4>
                      <span style={{ background: tip.bg, color: tip.color, padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700' }}>{tip.category}</span>
                    </div>
                    <button onClick={() => toggleSave(tip)} style={{ background: isSaved(tip) ? '#fef3c7' : '#fafbff', border: `2px solid ${isSaved(tip) ? '#f59e0b' : '#e8ecff'}`, borderRadius: '10px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' }}>
                      {isSaved(tip) ? '⭐' : '☆'}
                    </button>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.6', margin: 0, marginTop: '8px' }}>{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Tips */}
        {savedTips.length > 0 && (
          <div className="card" style={{ marginTop: '20px' }}>
            <div className="section-title">⭐ Saved Tips ({savedTips.length})</div>
            {savedTips.map((tip, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: tip.bg, borderRadius: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{tip.icon}</span>
                <span style={{ fontWeight: '600', color: tip.color, fontSize: '14px' }}>{tip.title}</span>
                <button onClick={() => toggleSave(tip)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: '700' }}>✕</button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default HealthTips;