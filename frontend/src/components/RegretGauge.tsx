'use client';

import React from 'react';

interface Props {
  value: number; // 0 to 1
}

export default function RegretGauge({ value }: Props) {
  const height = value * 100;
  const color = value > 0.9 ? 'var(--crimson)' : value > 0.75 ? 'var(--amber)' : 'var(--cyan)';
  
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray-500)', transform: 'rotate(-90deg)', marginBottom: '20px' }}>
        REGRET ENGINE
      </div>
      
      <div style={{
        flex: 1,
        width: '40px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: `${height}%`,
          background: `linear-gradient(to top, ${color} 0%, rgba(255,255,255,0.1) 100%)`,
          boxShadow: `0 0 20px ${color}44`,
          transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Liquid bubbles effect */}
          <div className="bubble" style={{ position: 'absolute', top: '10%', width: '4px', height: '4px', background: 'white', borderRadius: '50%', opacity: 0.3 }} />
        </div>
      </div>
      
      <div style={{ 
        fontSize: '14px', 
        fontWeight: 900, 
        color: color,
        fontFamily: 'var(--font-mono)'
      }}>
        {(value * 100).toFixed(1)}%
      </div>

      <style jsx>{`
        .bubble {
          animation: float 3s infinite;
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
