'use client';

import { useState, useEffect } from 'react';

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(data => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading Volunteers...</div>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Network Volunteers</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>View and manage our global responder network.</p>
      </div>

      <div className="scroll-area">
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', paddingBottom: '1rem' }}>
          {volunteers.map(vol => (
            <div key={vol.id} className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', textAlign: 'center', padding: '1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: '#f1f5f9', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <img src="/placeholder_avatar.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.2rem' }}>{vol.name}</h3>
                <span className="badge" style={{ background: '#f1f5f9', color: 'var(--text-secondary)', fontSize: '0.65rem' }}>ID: {vol.id}</span>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                <span>📍</span> {vol.location}
              </p>
              
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {vol.skills.map((skill, i) => (
                  <span key={i} className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.65rem' }}>{skill}</span>
                ))}
              </div>
              
              <button className="nav-item" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: '0.75rem', padding: '0.4rem' }}>
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


