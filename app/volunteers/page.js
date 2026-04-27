'use client';

import { useState, useEffect } from 'react';

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredVolunteers = volunteers.filter(vol => 
    vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vol.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div style={{ padding: '2rem' }}>Loading Volunteers...</div>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Network Volunteers</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage and deploy your global responder network.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <input 
            type="text" 
            placeholder="Search by name or skill..." 
            className="search-bar"
            style={{ width: '280px', background: 'white', border: '1px solid var(--border-subtle)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="nav-item active" style={{ border: 'none', cursor: 'pointer', padding: '0.6rem 1rem' }}>
            <span>👥</span> Recruit
          </button>
        </div>
      </div>

      <div className="scroll-area" style={{ flex: 1 }}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', paddingBottom: '1rem' }}>
          {filteredVolunteers.map(vol => (
            <div key={vol.id} className="bento-card" style={{ padding: '1.25rem', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#f1f5f9', overflow: 'hidden', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <img src="/placeholder_avatar.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vol.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Active Responder</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📍</span> {vol.location}
                </p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {vol.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="badge" style={{ background: '#f0f9ff', color: '#0369a1', fontSize: '0.65rem', border: '1px solid #e0f2fe' }}>{skill}</span>
                  ))}
                  {vol.skills.length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>+{vol.skills.length - 3} more</span>}
                </div>
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
                <button style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Profile</button>
                <button style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Deploy</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Footer */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', background: '#f8fafc', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <p style={{ fontSize: '0.8rem' }}><strong>{volunteers.length}</strong> Registered Volunteers</p>
        <span style={{ color: 'var(--border-subtle)' }}>|</span>
        <p style={{ fontSize: '0.8rem' }}><strong>{filteredVolunteers.length}</strong> Available in current view</p>
        <span style={{ color: 'var(--accent-success)', fontSize: '0.8rem', marginLeft: 'auto', fontWeight: 600 }}>● All systems operational</span>
      </div>
    </div>
  );
}


