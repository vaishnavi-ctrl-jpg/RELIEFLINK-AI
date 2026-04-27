'use client';

import { useState } from 'react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Quick Start Guide',
      icon: '🚀',
      description: 'Get up and running with ReliefLink AI in less than 5 minutes.',
      topics: ['Initial setup', 'Dashboard overview', 'First deployment']
    },
    {
      title: 'Crisis Management',
      icon: '⚠️',
      description: 'Advanced patterns for incident triage and response coordination.',
      topics: ['Priority levels', 'Crisis categorization', 'Response workflows']
    },
    {
      title: 'Volunteer Network',
      icon: '👥',
      description: 'Managing your global responder network and deployment logs.',
      topics: ['Skill verification', 'Deployment history', 'Communication']
    },
    {
      title: 'AI & Analytics',
      icon: '📊',
      description: 'Understanding the matching engine and predictive risk models.',
      topics: ['Matching logic', 'Success metrics', 'Forecasting']
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      {/* Header & Search */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Coordination Hub <span style={{ color: 'var(--accent-primary)' }}>Support</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Unlock the full potential of AI-powered disaster relief coordination.</p>
        
        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', opacity: 0.6 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Ask our AI coordination assistant..." 
            style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'white', boxShadow: 'var(--shadow-sm)', fontSize: '1rem', outline: 'none', transition: 'all 0.2s' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>AI Search</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Active Deployment', 'Skill Matching', 'Incident Triage', 'Map Markers'].map(tag => (
             <span key={tag} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', background: '#f1f5f9', borderRadius: '20px', cursor: 'pointer', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Main Content: Bento Grid & Support Panel */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', minHeight: 0 }}>
        {/* Left: Documentation Grid */}
        <div className="scroll-area" style={{ paddingRight: '0.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {helpCategories.map((cat, i) => (
              <div key={i} className="bento-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{cat.description}</p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.topics.map((topic, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      <span style={{ opacity: 0.5 }}>→</span> {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Support Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="bento-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', border: 'none' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Direct Admin Support</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '1.5rem' }}>Need immediate technical assistance or server-side intervention?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'var(--accent-primary)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>💬 Start Live Chat</button>
              <button style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, cursor: 'pointer' }}>📞 Priority Hotline</button>
            </div>
          </div>

          <div className="bento-card" style={{ padding: '1.5rem', flex: 1 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Emergency Guidelines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'System Outage', status: 'Priority 1', color: 'var(--accent-error)' },
                { label: 'Data Breach Suspected', status: 'Priority 1', color: 'var(--accent-error)' },
                { label: 'Network Congestion', status: 'Priority 2', color: 'var(--accent-warning)' },
                { label: 'AI Misalignment', status: 'Priority 2', color: 'var(--accent-warning)' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.label}</span>
                    <span style={{ fontSize: '0.65rem', color: item.color, fontWeight: 700 }}>{item.status}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Follow protocol ALPHA-4 immediately.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
