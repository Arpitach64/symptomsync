import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setMessage('Please fill all fields!'); return; }
    setLoading(true);
    try {
      const res = await axios.post('https://symptomsync-backend.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="icon">🏥</span>
          <h1>SymptomSync</h1>
          <p>Your personal health tracking assistant</p>
        </div>

        <input
          className="input"
          placeholder="📧 Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          type="email"
        />
        <input
          className="input"
          placeholder="🔒 Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '12px', marginTop: '4px', background: loading ? '#a5b4fc' : '#6366f1' }}
        >
          {loading ? '⏳ Signing in...' : 'Sign In →'}
        </button>

        {message && (
          <div style={{ textAlign: 'center', marginTop: '14px', color: '#ef4444', fontWeight: '500', fontSize: '14px', background: '#fef2f2', padding: '10px', borderRadius: '10px' }}>
            ⚠️ {message}
          </div>
        )}

        <div className="divider" />

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
          Don't have an account?{' '}
          <a href="/signup" className="link">Create one free →</a>
        </p>

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '12px' }}>
          <a href="/home" className="link" style={{ color: '#9ca3af', fontSize: '13px' }}>← Back to Home</a>
        </p>
      </div>
    </div>
  );
}

export default Login;