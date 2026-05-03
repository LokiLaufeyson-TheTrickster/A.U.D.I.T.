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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ 
          fontSize: '12px', letterSpacing: '4px', color: 'var(--cyan)',
          animation: 'pulse 1.5s infinite'
        }}>
          SIMULATING 1,825 TRAJECTORY STEPS...
        </div>
        <div style={{ width: '200px', height: '1px', background: 'var(--cyan)', marginTop: '10px', animation: 'grow 2s infinite' }} />
        
        <style jsx>{`
          @keyframes grow {
            0% { width: 0; }
            100% { width: 200px; }
          }
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }

  if (!results) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gray-700)',
        fontSize: '11px',
        letterSpacing: '2px'
      }}>
        AWAITING DECISION INPUT...
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      {/* The Stoic */}
      <div style={{ 
        flex: 1, padding: '40px', borderRight: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(to bottom right, rgba(0,255,136,0.02), transparent)'
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--emerald)', marginBottom: '10px' }}>PERSONA: THE STOIC</div>
        <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '20px' }}>Ideal Trajectory</h2>
        <p style={{ color: 'var(--gray-300)', lineHeight: 1.6, fontSize: '14px' }}>
          {results.stoic.prediction}
        </p>
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid var(--emerald)', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: 'var(--emerald)' }}>5-YEAR REGRET IMPACT</div>
          <div style={{ fontSize: '20px', fontWeight: 900 }}>+{(results.stoic.impact * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* The Hedonist */}
      <div style={{ 
        flex: 1, padding: '40px', borderRight: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(to bottom, rgba(255,170,0,0.02), transparent)'
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--amber)', marginBottom: '10px' }}>PERSONA: THE HEDONIST</div>
        <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '20px' }}>Impulse Path</h2>
        <p style={{ color: 'var(--gray-300)', lineHeight: 1.6, fontSize: '14px' }}>
          {results.hedonist.prediction}
        </p>
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid var(--amber)', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: 'var(--amber)' }}>5-YEAR REGRET IMPACT</div>
          <div style={{ fontSize: '20px', fontWeight: 900 }}>+{(results.hedonist.impact * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* The Shadow */}
      <div style={{ 
        flex: 1, padding: '40px',
        background: 'linear-gradient(to bottom left, rgba(255,31,68,0.02), transparent)'
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--crimson)', marginBottom: '10px' }}>PERSONA: THE SHADOW</div>
        <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '20px' }}>Reality Check</h2>
        <p style={{ color: 'var(--gray-300)', lineHeight: 1.6, fontSize: '14px' }}>
          {results.shadow.prediction}
        </p>
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid var(--crimson)', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: 'var(--crimson)' }}>5-YEAR REGRET IMPACT</div>
          <div style={{ fontSize: '20px', fontWeight: 900 }}>+{(results.shadow.impact * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
