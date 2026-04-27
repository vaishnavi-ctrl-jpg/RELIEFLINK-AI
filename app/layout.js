import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ReliefLink AI',
  description: 'AI-powered disaster relief matching',
};

import { ToastProvider } from './components/ToastProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <div className="layout-shell">
            <aside className="sidebar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexShrink: 0 }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>R</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ReliefLink <span style={{ color: 'var(--accent-primary)' }}>AI</span></h2>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <Link href="/" className="nav-item active"><span>📊</span> Dashboard</Link>
                <Link href="/incidents" className="nav-item"><span>⚠️</span> Active Incidents</Link>
                <Link href="/map" className="nav-item"><span>🗺️</span> Resource Map</Link>
                <Link href="/volunteers" className="nav-item"><span>👥</span> Volunteers</Link>
                <Link href="/analytics" className="nav-item"><span>📈</span> Analytics</Link>
                <Link href="/settings" className="nav-item"><span>⚙️</span> Settings</Link>
              </nav>
              
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link href="/help" className="nav-item"><span>❓</span> Help Center</Link>
              </div>
            </aside>

            <main className="main-content">
              <header className="top-header">
                <input type="text" placeholder="Search events, resources..." className="search-bar" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ fontSize: '1.25rem', cursor: 'pointer' }}>🔔</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden' }}>
                      <img src="/images/adminstrator.jpeg" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Jane Doe</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Administrator</p>
                    </div>
                  </div>
                </div>
              </header>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {children}
              </div>
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
