'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--bg-main)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Radar Animation Background */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
      }}>
        <div style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(59, 130, 246, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px solid rgba(59, 130, 246, 0.02)',
          }}></div>
        </div>
        
        {/* Sweeping Radar Line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(to right, transparent, var(--accent-primary))',
          transformOrigin: 'left center',
          animation: 'radar-sweep 4s linear infinite',
          zIndex: 1
        }}></div>
      </div>

      <style jsx>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="bento-card" style={{ zIndex: 10, maxWidth: '480px', padding: '3rem', alignItems: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛰️</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Signal Lost</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          We've scanned the entire crisis zone, but this coordinates (404) are currently unresponsive.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Return to Command Center
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="btn" 
            style={{ background: '#f1f5f9', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
          >
            Re-scan Frequency
          </button>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
        ReliefLink AI Terminal // v0.1.0 // Status: Searching...
      </div>
    </div>
  );
}
