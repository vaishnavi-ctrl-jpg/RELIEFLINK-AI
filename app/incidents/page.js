'use client';

import { useState, useEffect } from 'react';
import { useToast } from '../components/ToastProvider';

const IncidentSkeleton = () => (
  <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', gap: '1rem', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: '14px', width: '80%', marginBottom: '6px' }} />
        <div className="skeleton" style={{ height: '10px', width: '40%' }} />
      </div>
    </div>
    <div className="skeleton" style={{ height: '14px', width: '60%' }} />
    <div className="skeleton" style={{ height: '24px', width: '70px', borderRadius: '99px' }} />
    <div className="skeleton" style={{ height: '14px', width: '80%' }} />
    <div className="skeleton" style={{ height: '14px', width: '50px' }} />
  </div>
);

export default function IncidentsPage() {
  const { showToast } = useToast();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/request')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setIncidents(data);
          setLoading(false);
        }, 800);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const filteredIncidents = incidents.filter(inc => 
    inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Active Incidents</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Monitor and manage real-time disaster reports.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search incidents..." 
            className="search-bar"
            style={{ width: '250px', background: 'white', border: '1px solid var(--border-subtle)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="nav-item active" style={{ border: 'none', cursor: 'pointer', padding: '0.6rem 1rem' }}>
            <span>➕</span> New Incident
          </button>
        </div>
      </div>

      <div className="bento-card" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', gap: '1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <div>INCIDENT DETAILS</div>
            <div>LOCATION</div>
            <div>STATUS</div>
            <div>TIME REPORTED</div>
            <div>ACTIONS</div>
          </div>
          
          <div className="scroll-area" style={{ flex: 1 }}>
            {loading ? (
              Array(10).fill(0).map((_, i) => <IncidentSkeleton key={i} />)
            ) : (
              filteredIncidents.map((inc, i) => (
                <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', gap: '1rem', alignItems: 'center', transition: 'background 0.2s', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: i % 2 === 0 ? '#fee2e2' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1.2rem' }}>{i % 2 === 0 ? '🔥' : '💧'}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{inc.title}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>Ref: INC-{1000 + i}</p>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem' }}>
                    <p style={{ fontWeight: 500 }}>{inc.location}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sector 4-G</p>
                  </div>
                  
                  <div>
                    <span className={`badge ${inc.urgency === 'high' ? 'pill-critical' : 'pill-warning'}`} style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}>
                      {inc.urgency === 'high' ? 'Critical' : 'Moderate'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {new Date(inc.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => showToast(`Opening management console for ${inc.title}`, 'info')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      Manage
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      {!loading && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem' }}>
          <div style={{ padding: '0.75rem 1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-subtle)', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-critical)' }}></div>
            <p style={{ fontSize: '0.8rem' }}><strong>{incidents.filter(i => i.urgency === 'high').length} Critical</strong> incidents requiring dispatch</p>
          </div>
          <div style={{ padding: '0.75rem 1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-subtle)', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-warning)' }}></div>
            <p style={{ fontSize: '0.8rem' }}><strong>{incidents.filter(i => i.urgency !== 'high').length} Moderate</strong> incidents under observation</p>
          </div>
        </div>
      )}
    </div>
  );
}
