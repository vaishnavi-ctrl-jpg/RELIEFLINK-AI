'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState({
    successRate: 94,
    responseTrend: [65, 78, 82, 75, 90, 88, 95],
    resourceUsage: { food: 85, water: 70, med: 92, fuel: 60 }
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Performance Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>AI-driven insights and response efficiency metrics.</p>
      </div>

      <div className="bento-grid" style={{ gridTemplateRows: 'repeat(6, 1fr)', flex: 1 }}>
        {/* Success Rate Card */}
        <div className="bento-card" style={{ gridColumn: 'span 4', gridRow: 'span 3', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--accent-success)" strokeWidth="8" strokeDasharray="339.292" strokeDashoffset={339.292 * (1 - data.successRate/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{data.successRate}%</span>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SUCCESS</p>
            </div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', fontWeight: 500 }}>Global Match Efficiency</p>
        </div>

        {/* Response Trend */}
        <div className="bento-card" style={{ gridColumn: 'span 8', gridRow: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Response Time Trend (mins)</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>↓ 12% improvement</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '0.5rem 0' }}>
            {data.responseTrend.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${v}%`, background: 'var(--accent-primary)', borderRadius: '4px', opacity: 0.7 + (i * 0.05) }}></div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>D{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Load Forecast */}
        <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>AI Resource Load Forecast</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(data.resourceUsage).map(([name, val], i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{name} Deployment</span>
                  <span style={{ color: val > 80 ? 'var(--accent-critical)' : 'var(--text-secondary)' }}>{val}% Capacity</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${val}%`, height: '100%', background: val > 80 ? 'var(--accent-critical)' : 'var(--accent-primary)', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions Panel */}
        <div className="bento-card" style={{ gridColumn: 'span 6', gridRow: 'span 3', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>✨</div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>AI Predictive Risk</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fca5a5' }}>High Probability Impact</p>
              <p style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Sector 9 flooding risks likely to increase by 22% in next 12h.</p>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#93c5fd' }}>Resource Optimization</p>
              <p style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Divert 15% of surplus medical from Hub B to Field Hospital 2.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
