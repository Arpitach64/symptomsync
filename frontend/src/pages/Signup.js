import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) { setMessage('Please fill all fields!'); return; }
    if (password.length < 6) { setMessage('Password must be at least 6 characters!'); return; }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/signup', { name, email, password });
      setSuccess(true);
      setMessage(res.data.message);
      setTimeout(() => window.location.href = '/', 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSignup();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="icon">🏥</span>
          <h1>SymptomSync</h1>
          <p>Create your free health account</p>
        </div>

        <input
          className="input"
          placeholder="👤 Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          className="input"
          placeholder="📧 Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          className="input"
          placeholder="🔒 Password (min 6 characters)"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          className="btn btn-primary"
          onClick={handleSignup}
          disabled={loading}
          style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '12px', marginTop: '4px', background: loading ? '#a5b4fc' : '#6366f1' }}
        >
          {loading ? '⏳ Creating account...' : 'Create Account →'}
        </button>

        {message && (
          <div style={{ textAlign: 'center', marginTop: '14px', color: success ? '#10b981' : '#ef4444', fontWeight: '500', fontSize: '14px', background: success ? '#f0fdf4' : '#fef2f2', padding: '10px', borderRadius: '10px' }}>
            {success ? '✅' : '⚠️'} {message}
          </div>
        )}

        <div className="divider" />

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
          Already have an account?{' '}
          <a href="/" className="link">Sign in →</a>
        </p>

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '12px' }}>
          <a href="/home" className="link" style={{ color: '#9ca3af', fontSize: '13px' }}>← Back to Home</a>
        </p>

        <div style={{ marginTop: '20px', background: '#f0fdf4', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
          <p style={{ color: '#065f46', fontSize: '13px', fontWeight: '500' }}>
            🔒 Your data is secure & private
          </p>
          <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
            We never share your health data with anyone
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;