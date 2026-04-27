'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'system', label: 'System Configuration', icon: '⚙️' }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Settings Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage your account preferences and global system rules.</p>
      </div>

      <div className="bento-card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
        {/* Settings Sidebar */}
        <div style={{ width: '200px', background: '#f8fafc', borderRight: '1px solid var(--border-subtle)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="scroll-area" style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'profile' && (
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Admin Profile Information</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2e8f0', position: 'relative', overflow: 'hidden' }}>
                  <Image 
                    src="/images/adminstrator.jpeg" 
                    alt="Avatar" 
                    width={80} 
                    height={80} 
                    style={{ objectFit: 'cover' }} 
                    unoptimized
                  />
                </div>
                <button className="nav-item" style={{ border: '1px solid var(--border-subtle)', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Change Photo</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>FULL NAME</label>
                  <input type="text" defaultValue="Jane Doe" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: '#f8fafc', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>ADMIN ROLE</label>
                  <input type="text" defaultValue="Disaster Relief Officer" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: '#f8fafc', fontSize: '0.9rem' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>EMAIL ADDRESS</label>
                  <input type="email" defaultValue="jane.doe@relieflink.ai" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: '#f8fafc', fontSize: '0.9rem' }} />
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button className="nav-item active" style={{ width: '120px', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Notification Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { title: 'Critical Incident Alerts', desc: 'Notify immediately for all high-urgency reports.', enabled: true },
                  { title: 'Resource Shortage Warnings', desc: 'Alert when supplies fall below 20% capacity.', enabled: true },
                  { title: 'AI Matching Suggestions', desc: 'Daily summary of optimized volunteer deployments.', enabled: false },
                  { title: 'System Status Updates', desc: 'Maintenance and platform performance notifications.', enabled: true }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.title}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                    <div style={{ width: '40px', height: '20px', borderRadius: '20px', background: item.enabled ? 'var(--accent-success)' : '#cbd5e1', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', right: item.enabled ? '2px' : '22px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'right 0.2s' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
