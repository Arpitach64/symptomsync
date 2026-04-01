import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

function Chart() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ avg: 0, max: 0, min: 0, total: 0 });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://symptomsync-backend.onrender.com/api/symptoms/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const reversed = res.data.reverse();
        const chartData = reversed.map(item => ({
          date: new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
          severity: Number(item.severity),
          symptom: item.symptoms
        }));
        setData(chartData);

        if (chartData.length > 0) {
          const severities = chartData.map(d => d.severity);
          setStats({
            avg: (severities.reduce((a, b) => a + b, 0) / severities.length).toFixed(1),
            max: Math.max(...severities),
            min: Math.min(...severities),
            total: chartData.length
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', border: '1px solid #e8ecff', borderRadius: '10px', padding: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <p style={{ fontWeight: '700', color: '#1a1a2e', margin: 0 }}>{label}</p>
          <p style={{ color: '#6366f1', margin: '4px 0 0', fontWeight: '600' }}>Severity: {payload[0].value}/10</p>
          <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '12px' }}>{payload[0].payload.symptom}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        <div className="navbar">
          <div className="navbar-brand">
            📊 Health Graph
            <span>Track your symptom trends</span>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-white" onClick={() => window.location.href = '/dashboard'}>← Dashboard</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid" style={{ marginBottom: '20px' }}>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: '#6366f1' }}>{stats.total}</h2>
            <p style={{ color: '#6b7280' }}>Total Entries</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: stats.avg >= 7 ? '#ef4444' : stats.avg >= 4 ? '#f59e0b' : '#10b981' }}>{stats.avg}</h2>
            <p style={{ color: '#6b7280' }}>Avg Severity</p>
          </div>
          <div className="stat-card" style={{ background: 'white', border: '1px solid #e8ecff' }}>
            <h2 style={{ color: '#ef4444' }}>{stats.max}</h2>
            <p style={{ color: '#6b7280' }}>Highest</p>
          </div>
        </div>

        {/* Area Chart */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="section-title">📈 Severity Over Time</div>
          {data.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
              <p>No data yet — start logging symptoms!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSeverity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="severity" stroke="#6366f1" strokeWidth={3} fill="url(#colorSeverity)" dot={{ fill: '#6366f1', r: 6, strokeWidth: 2, stroke: 'white' }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Symptom List */}
        <div className="card">
          <div className="section-title">📋 Symptom History</div>
          {data.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>No symptoms logged yet</p>
          ) : [...data].reverse().map((item, index) => (
            <div key={index} className="symptom-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{item.symptom}</p>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: '4px 0 0' }}>📅 {item.date}</p>
                </div>
                <span className={`badge ${item.severity >= 8 ? 'badge-high' : item.severity >= 5 ? 'badge-mid' : 'badge-low'}`}>
                  {item.severity}/10
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Chart;