'use client';

import React, { useState } from 'react';

interface Props {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export default function DecisionInput({ onAnalyze, isAnalyzing }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text);
      setText('');
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2px', borderRadius: '12px', background: 'linear-gradient(90deg, var(--cyan), var(--crimson))' }}>
      <div style={{ background: 'var(--black)', borderRadius: '10px', padding: '15px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px' }}>
          <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ENTER POTENTIAL DECISION (e.g. 'Skip morning workout to sleep in')"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--white)',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '1px'
            }}
          />
          <button 
            type="submit"
            disabled={isAnalyzing || !text.trim()}
            style={{
              background: 'var(--white)',
              color: 'var(--black)',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '4px',
              fontWeight: 900,
              fontSize: '12px',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              opacity: isAnalyzing ? 0.5 : 1,
              transition: 'var(--transition)'
            }}
          >
            {isAnalyzing ? 'LOCKING TRAJECTORY...' : 'ANALYZE'}
          </button>
        </form>
        
        <div style={{ marginTop: '10px', display: 'flex', gap: '20px' }}>
          <div style={{ fontSize: '9px', color: 'var(--gray-500)', letterSpacing: '1px' }}>
            SIGNAL LAYER: <span style={{ color: 'var(--cyan)' }}>ACTIVE</span>
          </div>
          <div style={{ fontSize: '9px', color: 'var(--gray-500)', letterSpacing: '1px' }}>
            BEHAVIORAL ENGINE: <span style={{ color: 'var(--amber)' }}>GROUNDED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
