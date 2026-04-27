'use client';

import { useState, useEffect } from 'react';

export default function MapPage() {
  const [incidents, setIncidents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch('/api/request')
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(e => console.error(e));
  }, []);

  const filters = [
    { id: 'all', label: 'All Markers', icon: '🌐' },
    { id: 'medical', label: 'Medical', icon: '🏥' },
    { id: 'supplies', label: 'Supplies', icon: '📦' },
    { id: 'shelter', label: 'Shelter', icon: '🏠' },
  ];

  return (
    <div className="map-container">
      {/* Background Map Mockup */}
      <img 
        src="/map_mockup.png" 
        alt="ReliefLink Map" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.05)' }} 
      />

      {/* Floating Controls */}
      <div className="map-ui-overlay">
        <div className="map-control-panel">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Resource Navigator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {filters.map(f => (
              <button 
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: activeFilter === f.id ? 'var(--accent-primary)' : 'white',
                  color: activeFilter === f.id ? 'white' : 'var(--text-main)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span>{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI INSIGHT</p>
            <div className="incident-pill pill-info" style={{ fontSize: '0.7rem', padding: '0.4rem' }}>
              High demand predicted in Sector 7
            </div>
          </div>
        </div>
      </div>

      <div className="map-search">
        <input 
          type="text" 
          placeholder="Search coordinates, sectors..." 
          className="search-bar" 
          style={{ width: '100%', background: 'white', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }} 
        />
      </div>

      {/* Interactive Markers (Simulated Positions) */}
      {incidents.map((incident, i) => {
        // Deterministic random-like positions for simulation if not present
        const left = 20 + (i * 15) % 60;
        const top = 30 + (i * 12) % 50;
        
        return (
          <div 
            key={i} 
            className="map-marker" 
            style={{ 
              left: `${left}%`, 
              top: `${top}%`,
              background: incident.urgency === 'high' ? 'var(--accent-critical)' : 'var(--accent-primary)'
            }}
            title={incident.title}
          >
            <div className="marker-pulse"></div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="map-legend">
        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Legend</p>
        <div className="legend-item"><span className="dot" style={{ background: 'var(--accent-critical)' }}></span> Critical Need</div>
        <div className="legend-item"><span className="dot" style={{ background: 'var(--accent-primary)' }}></span> General Support</div>
        <div className="legend-item"><span className="dot" style={{ background: 'var(--accent-success)' }}></span> Resource Center</div>
      </div>
    </div>
  );
}
