import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function Dashboard() {
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [warning, setWarning] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('🧑‍⚕️');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) setAvatar(savedAvatar);
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const res = await axios.get('https://symptomsync-backend.onrender.com/api/symptoms/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(res.data);
      checkPatterns(res.data);
    } catch (err) { console.log(err); }
  };

  const checkPatterns = (data) => {
    const count = {};
    data.forEach(item => {
      const words = item.symptoms.toLowerCase().split(',').map(s => s.trim());
      words.forEach(word => { count[word] = (count[word] || 0) + 1; });
    });
    const repeated = Object.entries(count).filter(([_, v]) => v >= 2).map(([k]) => k);
    if (repeated.length > 0) {
      setWarning(`These symptoms keep recurring: ${repeated.join(', ')} — Please consult a doctor!`);
    } else { setWarning(''); }
  };

  const handleAdd = async () => {
    if (!symptoms) return;
    try {
      await axios.post('https://symptomsync-backend.onrender.com/api/symptoms/add',
        { symptoms, severity, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Symptom saved successfully!');
      setSymptoms(''); setNotes(''); setSeverity(5); setAiSuggestion('');
      fetchSymptoms();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) { setMessage('Error saving symptom'); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://symptomsync-backend.onrender.com/api/symptoms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSymptoms();
    } catch (err) { console.log(err); }
  };

  const getAISuggestion = async () => {
    if (!symptoms) { setMessage('Please enter symptoms first!'); return; }
    setLoadingAI(true);
    try {
      const res = await axios.post('https://symptomsync-backend.onrender.com/api/ai/suggest',
        { symptoms },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiSuggestion(res.data.suggestion);
    } catch (err) { setAiSuggestion('AI suggestion unavailable. Please try again.'); }
    setLoadingAI(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('SymptomSync - Medical Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Patient: ${user?.name || 'User'}`, 20, 45);
    doc.text('-------------------------------------------', 20, 52);
    let y = 65;
    list.forEach((item, index) => {
      doc.setFontSize(13);
      doc.text(`Entry ${index + 1}:`, 20, y); y += 8;
      doc.setFontSize(11);
      doc.text(`Symptoms: ${item.symptoms}`, 25, y); y += 7;
      doc.text(`Severity: ${item.severity}/10`, 25, y); y += 7;
      if (item.notes) { doc.text(`Notes: ${item.notes}`, 25, y); y += 7; }
      doc.text(`Date: ${new Date(item.date).toLocaleDateString()}`, 25, y); y += 7;
      doc.text('-------------------------------------------', 20, y); y += 10;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    doc.save('SymptomSync-Report.pdf');
  };

  const getBadgeClass = (s) => {
    if (s >= 8) return 'badge badge-high';
    if (s >= 5) return 'badge badge-mid';
    return 'badge badge-low';
  };

  const getSeverityColor = (s) => {
    if (s >= 8) return '#ef4444';
    if (s >= 5) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '28px' }}>{avatar}</div>
            <div className="navbar-brand">
              SymptomSync
              <span>Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</span>
            </div>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/profile'}>👤</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/medicine'}>💊</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/appointment'}>🏥</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/doctors'}>👨‍⚕️</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/chart'}>📊</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff', cursor: 'pointer' }} onClick={() => window.location.href = '/chart'}>
            <h2 style={{ color: '#6366f1' }}>{list.length}</h2>
            <p style={{ color: '#6b7280' }}>Symptoms Logged</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff', cursor: 'pointer' }} onClick={() => window.location.href = '/medicine'}>
            <h2 style={{ color: '#10b981' }}>💊</h2>
            <p style={{ color: '#6b7280' }}>Medicines</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff', cursor: 'pointer' }} onClick={() => window.location.href = '/doctors'}>
            <h2 style={{ color: '#f59e0b' }}>👨‍⚕️</h2>
            <p style={{ color: '#6b7280' }}>Find Doctors</p>
          </div>
        </div>

        {warning && <div className="warning-box">⚠️ {warning}</div>}

        <div className="card">
          <div className="section-title">➕ Log Today's Symptom</div>

          <input className="input" placeholder="🤒 Describe your symptoms (e.g. fever, headache)" value={symptoms} onChange={e => setSymptoms(e.target.value)} />

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontWeight: '600', color: '#555', fontSize: '14px' }}>Severity Level</label>
              <span style={{ fontWeight: '800', color: getSeverityColor(severity), fontSize: '18px' }}>{severity}/10</span>
            </div>
            <input type="range" min="1" max="10" value={severity} onChange={e => setSeverity(e.target.value)}
              style={{ width: '100%', accentColor: getSeverityColor(severity), height: '6px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>Mild</span>
              <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600' }}>Moderate</span>
              <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600' }}>Severe</span>
            </div>
          </div>

          <input className="input" placeholder="📝 Additional notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-success" onClick={handleAdd} style={{ flex: 1, padding: '13px', fontSize: '14px', borderRadius: '12px' }}>
              ✓ Save Symptom
            </button>
            <button className="btn btn-primary" onClick={getAISuggestion} style={{ flex: 1, padding: '13px', fontSize: '14px', borderRadius: '12px' }} disabled={loadingAI}>
              {loadingAI ? '⏳ Analyzing...' : '🤖 AI Suggestion'}
            </button>
          </div>

          {message && (
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600', fontSize: '14px', background: '#f0fdf4', padding: '10px', borderRadius: '10px' }}>
              ✅ {message}
            </div>
          )}

          {aiSuggestion && (
            <div className="ai-box">
              <h4>🤖 AI Health Suggestion</h4>
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{aiSuggestion}</p>
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div className="section-title" style={{ margin: 0 }}>📋 Symptom History</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary" onClick={() => window.location.href = '/chart'}>📊 Graph</button>
              <button className="btn btn-info" onClick={generatePDF}>📄 PDF</button>
            </div>
          </div>

          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🩺</div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#555' }}>No symptoms logged yet</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>Start tracking your health above</p>
            </div>
          ) : list.map((item, index) => (
            <div className="symptom-card" key={item._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px' }}>🤒 {item.symptoms}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={getBadgeClass(item.severity)}>{item.severity}/10</span>
                  <button onClick={() => handleDelete(item._id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', color: '#ef4444', fontSize: '14px', fontWeight: '700', transition: 'all 0.2s' }}>✕</button>
                </div>
              </div>
              {item.notes && <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px' }}>📝 {item.notes}</p>}
              <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '8px' }}>📅 {new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;