'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/request')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const stats = [
    { title: 'Major Incidents', value: '3', trend: 'High Urgency', color: 'pill-critical' },
    { title: 'Pending Assistance', value: '12', trend: 'Medium', color: 'pill-warning' },
    { title: 'Monitoring', value: '25', trend: 'Low', color: 'pill-info' },
    { title: 'AI Predictions', value: 'Active', trend: 'Optimizing...', color: 'pill-info', isAI: true }
  ];

  if (loading) return <div style={{ padding: '2rem' }}>Loading ReliefLink AI...</div>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem 1.5rem 0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Incident Overview</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Real-time coordination and AI-driven resource allocation.</p>
        </div>
        <div style={{ padding: '0.3rem 0.6rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', fontWeight: 500 }}>
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="bento-grid" style={{ flex: 1, overflow: 'hidden' }}>
        {/* Summary Stats */}
        {stats.map((stat, i) => (
          <div key={i} className="bento-card" style={{ gridColumn: 'span 3', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{stat.title}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h2>
              </div>
              <span className={`incident-pill ${stat.color}`} style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}>{stat.trend}</span>
            </div>
            <div className="sparkline-container" style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '20px' }}>
              {[4, 7, 5, 8, 6, 9, 7].map((h, j) => (
                <div key={j} style={{ flex: 1, height: `${h * 2}px`, background: stat.isAI ? 'linear-gradient(to top, #3b82f6, #9333ea)' : '#cbd5e1', borderRadius: '1px', transition: 'height 0.3s ease' }}></div>
              ))}
            </div>
          </div>
        ))}

        {/* Real-time Resource Map */}
        <div className="bento-card" style={{ gridColumn: 'span 8', gridRow: 'span 4', padding: 0, overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '1rem', position: 'absolute', top: 0, left: 0, zIndex: 1, background: 'rgba(255,255,255,0.8)', borderBottomRightRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Real-time Resource Map</h3>
          </div>
          <img 
            src="/map_mockup.png" 
            alt="Resource Map" 
            className="map-placeholder" 
            style={{ filter: 'brightness(1.02)' }} 
          />
          <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button className="bento-card" style={{ padding: '0.4rem', borderRadius: '8px', cursor: 'pointer', background: 'white' }}>➕</button>
            <button className="bento-card" style={{ padding: '0.4rem', borderRadius: '8px', cursor: 'pointer', background: 'white' }}>➖</button>
          </div>
        </div>

        {/* Resource Availability */}
        <div className="bento-card" style={{ gridColumn: 'span 4', gridRow: 'span 4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Resource Availability</h3>
            <span style={{ cursor: 'pointer', fontSize: '0.8rem' }}>•••</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem', paddingBottom: '0.5rem', minHeight: 0 }}>
            {[80, 40, 90, 60, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${h}%`, background: '#10b981', borderRadius: '3px', position: 'relative', transition: 'height 0.5s ease' }}>
                  {h > 70 && <div style={{ position: 'absolute', top: '10%', width: '100%', height: '20%', background: 'rgba(255,255,255,0.2)' }}></div>}
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{['Med', 'Water', 'Food', 'Fuel', 'Staff'][i]}</span>
              </div>
            ))}
          </div>
          <div className="scroll-area" style={{ maxHeight: '100px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="incident-pill pill-critical" style={{ justifyContent: 'space-between', fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>
                <span>Field Hospital 3 (Red)</span>
                <span>Low Oxygen</span>
              </div>
              <div className="incident-pill pill-warning" style={{ justifyContent: 'space-between', fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>
                <span>Shelter 7 (Yellow)</span>
                <span>Water Shortage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Live Feed</h3>
            <select style={{ border: 'none', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', outline: 'none' }}>
              <option>Urgency</option>
            </select>
          </div>
          <div className="scroll-area">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {requests.map((req, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === 0 ? '#ef4444' : '#f59e0b' }}></div>
                    <div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 500 }}>{req.title}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{req.location}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Queue */}
        <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Task Queue</h3>
            <span style={{ cursor: 'pointer', fontSize: '0.8rem' }}>•••</span>
          </div>
          <div className="scroll-area">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ paddingBottom: '0.5rem' }}>Task</th>
                  <th style={{ paddingBottom: '0.5rem' }}>Level</th>
                  <th style={{ paddingBottom: '0.5rem' }}>Lead</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr key={i} style={{ fontSize: '0.8rem', borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.5rem 0' }}>{req.title.length > 20 ? req.title.substring(0, 20) + '...' : req.title}</td>
                    <td style={{ padding: '0.5rem 0' }}>
                      <span className={`badge ${i === 0 ? 'pill-critical' : 'pill-warning'}`} style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>{i === 0 ? 'High' : 'Medium'}</span>
                    </td>
                    <td style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden' }}>
                        <img src="/placeholder_avatar.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem' }}>Jane Doe</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

