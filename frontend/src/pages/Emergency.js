import React, { useState, useEffect } from 'react';

function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('emergencyContacts');
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  const addContact = () => {
    if (!name || !phone) { setMessage('Name and phone are required!'); return; }
    const contact = { id: Date.now(), name, phone, relation };
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
    setName(''); setPhone(''); setRelation('');
    setMessage('Contact saved!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteContact = (id) => {
    const newContacts = contacts.filter(c => c.id !== id);
    setContacts(newContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
  };

  const relationEmojis = {
    'Family': '👨‍👩‍👧', 'Friend': '👫', 'Doctor': '👨‍⚕️', 'Other': '👤'
  };

  const emergencyNumbers = [
    { name: 'Ambulance', number: '108', icon: '🚑', color: '#ef4444' },
    { name: 'Police', number: '100', icon: '👮', color: '#3b82f6' },
    { name: 'Fire Brigade', number: '101', icon: '🚒', color: '#f97316' },
    { name: 'Women Helpline', number: '1091', icon: '👩', color: '#ec4899' },
    { name: 'Child Helpline', number: '1098', icon: '👶', color: '#8b5cf6' },
    { name: 'Disaster Management', number: '1078', icon: '🆘', color: '#6366f1' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            🆘 Emergency Contacts
            <span>Quick access when you need help</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="card" style={{ marginBottom: '20px', border: '2px solid #ef4444' }}>
          <div className="section-title" style={{ color: '#ef4444' }}>🚨 India Emergency Numbers</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {emergencyNumbers.map(num => (
              <a key={num.name} href={`tel:${num.number}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: `${num.color}10`, border: `2px solid ${num.color}30`, borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: '28px' }}>{num.icon}</span>
                  <div>
                    <p style={{ fontWeight: '700', color: num.color, margin: 0, fontSize: '14px' }}>{num.name}</p>
                    <p style={{ fontWeight: '800', color: '#1a1a2e', margin: 0, fontSize: '20px' }}>{num.number}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Add Contact */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">➕ Add Emergency Contact</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input className="input" placeholder="👤 Full Name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: 0 }} />
            <input className="input" placeholder="📞 Phone Number" value={phone} onChange={e => setPhone(e.target.value)} type="tel" style={{ marginBottom: 0 }} />
          </div>

          <div style={{ marginTop: '12px', marginBottom: '14px' }}>
            <p style={{ fontWeight: '600', color: '#555', fontSize: '14px', marginBottom: '10px' }}>Relation</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Family', 'Friend', 'Doctor', 'Other'].map(r => (
                <button key={r} onClick={() => setRelation(r)} style={{
                  padding: '8px 16px', borderRadius: '10px', border: '2px solid',
                  borderColor: relation === r ? '#6366f1' : '#e8ecff',
                  background: relation === r ? '#6366f1' : 'white',
                  color: relation === r ? 'white' : '#555',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {relationEmojis[r]} {r}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={addContact} style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '12px' }}>
            Save Contact ✓
          </button>

          {message && (
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#10b981', fontWeight: '600', fontSize: '14px', background: '#f0fdf4', padding: '10px', borderRadius: '10px' }}>
              ✅ {message}
            </div>
          )}
        </div>

        {/* Contacts List */}
        <div className="card">
          <div className="section-title">📋 My Emergency Contacts</div>
          {contacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
              <p style={{ fontSize: '15px' }}>No contacts added yet</p>
              <p style={{ fontSize: '13px', marginTop: '6px', color: '#aaa' }}>Add your emergency contacts above</p>
            </div>
          ) : contacts.map(contact => (
            <div key={contact.id} style={{ background: '#fafbff', border: '1px solid #e8ecff', borderRadius: '12px', padding: '16px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                    {relationEmojis[contact.relation] || '👤'}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', margin: 0 }}>{contact.name}</p>
                    <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '600', margin: '2px 0' }}>{contact.relation || 'Contact'}</p>
                    <a href={`tel:${contact.phone}`} style={{ color: '#10b981', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>📞 {contact.phone}</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`tel:${contact.phone}`} className="btn btn-success" style={{ padding: '8px 14px', fontSize: '13px', textDecoration: 'none' }}>Call</a>
                  <button onClick={() => deleteContact(contact.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', color: '#ef4444', fontWeight: '700' }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Emergency;