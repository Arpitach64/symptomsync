import React, { useState } from 'react';

function Doctors() {
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('General Physician');
  const [mapUrl, setMapUrl] = useState('');
  const [searched, setSearched] = useState(false);

  const specialties = [
    { name: 'General Physician', icon: '🩺' },
    { name: 'Cardiologist', icon: '❤️' },
    { name: 'Dermatologist', icon: '🧴' },
    { name: 'ENT Specialist', icon: '👂' },
    { name: 'Orthopedic', icon: '🦴' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Gastroenterologist', icon: '🫃' },
    { name: 'Pulmonologist', icon: '🫁' },
    { name: 'Psychiatrist', icon: '🧘' },
  ];

  const searchDoctors = () => {
    if (!location) return;
    const query = `${specialty} doctor in ${location}`;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=13`;
    setMapUrl(url);
    setSearched(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            👨‍⚕️ Find Real Doctors
            <span>Search verified doctors near you</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/appointment'}>🏥 Appointments</button>
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">🔍 Search Doctors Near You</div>

          <input className="input" placeholder="📍 Enter your city (e.g. Delhi, Mumbai, Gorakhpur)" value={location} onChange={e => setLocation(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && searchDoctors()} />

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', color: '#555', fontSize: '14px', marginBottom: '12px' }}>Select Specialty</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {specialties.map(s => (
                <button key={s.name} onClick={() => setSpecialty(s.name)} style={{
                  padding: '8px 16px', borderRadius: '10px', border: '2px solid',
                  borderColor: specialty === s.name ? '#6366f1' : '#e8ecff',
                  background: specialty === s.name ? '#6366f1' : 'white',
                  color: specialty === s.name ? 'white' : '#555',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  {s.icon} {s.name}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={searchDoctors} style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '12px' }}>
            🗺️ Find Doctors on Map
          </button>
        </div>

        {searched && mapUrl && (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', background: '#f0f4ff', borderBottom: '1px solid #e8ecff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '700', color: '#1a1a2e', margin: 0 }}>🗺️ {specialty} Doctors in {location}</p>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: '4px 0 0' }}>Click on any marker to see doctor details</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(specialty + ' doctor in ' + location)}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px', textDecoration: 'none' }}>
                  Open in Maps
                </a>
                <a href={`https://www.practo.com/search/doctors?results_type=doctor&q=${encodeURIComponent(specialty)}&city=${encodeURIComponent(location)}`} target="_blank" rel="noreferrer" style={{ padding: '8px 14px', fontSize: '12px', background: '#5dbea3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
                  Practo
                </a>
              </div>
            </div>
            <iframe
              title="doctors-map"
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        )}

        {!searched && (
          <div className="card">
            <div className="section-title">💡 How It Works</div>
            {[
              { icon: '📍', title: 'Enter Your City', desc: 'Type your city name above to find doctors near you.' },
              { icon: '🏥', title: 'Select Specialty', desc: 'Choose the type of doctor you need.' },
              { icon: '🗺️', title: 'View on Map', desc: 'Real doctors will appear on Google Maps with ratings and contact info.' },
            ].map(tip => (
              <div key={tip.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px', background: '#fafbff', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e8ecff' }}>
                <div style={{ width: '44px', height: '44px', background: '#f0f4ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  {tip.icon}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a1a2e', margin: 0, fontSize: '14px' }}>{tip.title}</p>
                  <p style={{ color: '#6b7280', fontSize: '13px', margin: '4px 0 0', lineHeight: '1.5' }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Doctors;