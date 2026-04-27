'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/incidents', label: 'Active Incidents', icon: '⚠️' },
    { href: '/map', label: 'Resource Map', icon: '🗺️' },
    { href: '/volunteers', label: 'Volunteers', icon: '👥' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const bottomItems = [
    { href: '/help', label: 'Help Center', icon: '❓' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Brand area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1.5rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.25rem' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #4f46e5, #00d4ff)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '1.4rem' }}>R</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
            <span className="brand-gradient">ReliefLink</span> <span style={{ color: 'var(--accent-primary)', opacity: 0.8 }}>AI</span>
          </h2>
        </div>
        
        {/* System Pulse */}
        <div className="system-status" style={{ marginLeft: '2px' }}>
          <div className="pulse-dot"></div>
          RES_COMMAND: ACTIVE
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <div className="nav-pip"></div>
            <span style={{ marginRight: '0.75rem', fontSize: '1.1rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        {bottomItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <div className="nav-pip"></div>
            <span style={{ marginRight: '0.75rem', fontSize: '1.1rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
