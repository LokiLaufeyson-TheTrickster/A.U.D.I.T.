'use client';

import React from 'react';

interface Props {
  results: any;
  isAnalyzing: boolean;
}

export default function ForkView({ results, isAnalyzing }: Props) {
  if (isAnalyzing) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '12px', letterSpacing: '4px', color: 'var(--cyan)', animation: 'pulse 1.5s infinite' }}>
          SIMULATING 10-YEAR TRAJECTORY...
        </div>
        <div style={{ width: '200px', height: '1px', background: 'var(--cyan)', marginTop: '10px' }} />
      </div>
    );
  }

  if (!results) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-700)', fontSize: '11px', letterSpacing: '2px' }}>
        AWAITING DECISION INPUT...
      </div>
    );
  }

  const renderPersona = (key: string, label: string, color: string, glow: string) => {
    const data = results[key];
    if (!data) return null;

    return (
      <div style={{ 
        flex: 1, padding: '30px', borderRight: key !== 'shadow' ? '1px solid rgba(255,255,255,0.05)' : 'none',
        background: `linear-gradient(to bottom, ${glow}, transparent)`,
        overflowY: 'auto'
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', color: color, marginBottom: '10px' }}>PERSONA: {label.toUpperCase()}</div>
        
        {/* Timeline Snapshots */}
        <div style={{ marginBottom: '30px' }}>
          {['1m', '1y', '5y', '10y'].map(time => (
            <div key={time} style={{ display: 'flex', gap: '15px', marginBottom: '12px' }}>
              <div style={{ 
                minWidth: '40px', fontSize: '10px', fontWeight: 900, color: color, 
                fontFamily: 'var(--font-mono)', borderRight: `1px solid ${color}44`, paddingRight: '8px'
              }}>
                {time.toUpperCase()}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gray-300)', lineHeight: 1.4 }}>
                {data.snapshots?.[time] || 'Simulation data missing.'}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Paragraph */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: `2px solid ${color}` }}>
          <p style={{ color: 'var(--white)', lineHeight: 1.6, fontSize: '14px', fontStyle: 'italic' }}>
            &quot;{data.impact_narrative}&quot;
          </p>
        </div>

        {/* Regret Impact */}
        <div style={{ marginTop: '30px', padding: '15px', border: `1px solid ${color}44`, borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: color, letterSpacing: '1px' }}>10-YEAR TRAJECTORY SHIFT</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--white)' }}>
            +{( (data.regret_impact || 0) * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fork-container" style={{ height: '100%', display: 'flex' }}>
      {renderPersona('stoic', 'The Stoic', 'var(--emerald)', 'rgba(0,255,136,0.03)')}
      {renderPersona('hedonist', 'The Hedonist', 'var(--amber)', 'rgba(255,170,0,0.03)')}
      {renderPersona('shadow', 'The Shadow', 'var(--crimson)', 'rgba(255,31,68,0.03)')}
    </div>
  );
}

