import React from 'react';

function Home() {
  return (
    <div style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ background: 'white', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(99,102,241,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🏥</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>SymptomSync</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#features" style={{ color: '#555', textDecoration: 'none', fontWeight: '500', padding: '8px 16px' }}>Features</a>
          <a href="#how" style={{ color: '#555', textDecoration: 'none', fontWeight: '500', padding: '8px 16px' }}>How it Works</a>
          <a href="/" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600', padding: '8px 16px' }}>Login</a>
          <a href="/signup" style={{ background: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: '600', padding: '10px 24px', borderRadius: '10px' }}>Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)', padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏥</div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Your Personal Health<br />Tracking Assistant
        </h1>
        <p style={{ fontSize: '18px', opacity: '0.9', maxWidth: '600px', margin: 'auto', marginBottom: '40px', lineHeight: '1.6' }}>
          Track symptoms, get AI-powered health suggestions, find top doctors near you, and generate medical reports — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{ background: 'white', color: '#6366f1', padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            Get Started Free →
          </a>
          <a href="/" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)' }}>
            Sign In
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
          {[['10K+', 'Users'], ['50K+', 'Symptoms Tracked'], ['100%', 'Free'], ['AI', 'Powered']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800' }}>{num}</div>
              <div style={{ fontSize: '14px', opacity: '0.8' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ padding: '80px 40px', background: '#f8f9ff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', color: '#1a1a2e', marginBottom: '16px' }}>Everything You Need</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '16px', marginBottom: '50px' }}>All health tracking features in one powerful app</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: 'auto' }}>
          {[
            { icon: '🤒', title: 'Symptom Tracking', desc: 'Log daily symptoms with severity levels and notes. Build a complete health timeline.', color: '#fee2e2' },
            { icon: '🤖', title: 'AI Health Suggestions', desc: 'Get instant AI-powered medicine suggestions and home remedies for your symptoms.', color: '#ede9fe' },
            { icon: '👨‍⚕️', title: 'Find Doctors', desc: 'AI recommends the best doctors near you based on your symptoms and location.', color: '#dbeafe' },
            { icon: '📊', title: 'Health Graph', desc: 'Visualize your health trends over time with beautiful interactive charts.', color: '#d1fae5' },
            { icon: '💊', title: 'Medicine Reminders', desc: 'Never miss a dose. Set up medicine reminders for any day of the week.', color: '#fef3c7' },
            { icon: '📄', title: 'PDF Reports', desc: 'Generate professional medical reports to share with your doctor.', color: '#fce7f3' },
          ].map(f => (
            <div key={f.title} style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '60px', height: '60px', background: f.color, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div id="how" style={{ padding: '80px 40px', background: 'white' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', color: '#1a1a2e', marginBottom: '16px' }}>How It Works</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '16px', marginBottom: '50px' }}>Get started in 3 simple steps</p>

        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '900px', margin: 'auto' }}>
          {[
            { step: '1', icon: '📝', title: 'Create Account', desc: 'Sign up for free in seconds. No credit card required.' },
            { step: '2', icon: '🤒', title: 'Log Symptoms', desc: 'Add your daily symptoms with severity and notes.' },
            { step: '3', icon: '🤖', title: 'Get AI Help', desc: 'Receive instant suggestions and find nearby doctors.' },
          ].map(s => (
            <div key={s.step} style={{ textAlign: 'center', flex: '1', minWidth: '220px' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: 'auto', marginBottom: '20px', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
                {s.icon}
              </div>
              <div style={{ width: '32px', height: '32px', background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px', margin: 'auto', marginBottom: '12px' }}>
                {s.step}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Start Tracking Your Health Today</h2>
        <p style={{ fontSize: '16px', opacity: '0.9', marginBottom: '32px' }}>Join thousands of users who trust SymptomSync</p>
        <a href="/signup" style={{ background: 'white', color: '#6366f1', padding: '16px 40px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
          Get Started Free →
        </a>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1a1a2e', padding: '50px 40px 30px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px', marginBottom: '40px', maxWidth: '1100px', margin: 'auto' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>🏥</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#a5b4fc' }}>SymptomSync</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Your personal AI-powered health tracking assistant.</p>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>Features</h4>
            {['Symptom Tracking', 'AI Suggestions', 'Find Doctors', 'Medicine Reminders', 'PDF Reports'].map(f => (
              <p key={f} style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{f}</p>
            ))}
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>Quick Links</h4>
            {[['Login', '/'], ['Sign Up', '/signup'], ['Dashboard', '/dashboard']].map(([label, href]) => (
              <p key={label} style={{ marginBottom: '8px' }}>
                <a href={href} style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>{label}</a>
              </p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center', color: '#6b7280', fontSize: '13px', maxWidth: '1100px', margin: 'auto' }}>
          © 2026 SymptomSync. All rights reserved. | Not a substitute for professional medical advice.
        </div>
      </footer>

    </div>
  );
}

export default Home;