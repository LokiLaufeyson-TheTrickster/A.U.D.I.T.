'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';

interface Props {
  onClose: () => void;
}

export default function SettingsLayer({ onClose }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [latency, setLatency] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  useEffect(() => {
    db.configs.get('openrouter_key').then(config => {
      if (config) setApiKey(config.value);
    });
  }, []);

  const handleSave = async () => {
    await db.configs.put({ key: 'openrouter_key', value: apiKey });
    alert('Configuration Locked.');
  };

  const testConnection = async () => {
    setStatus('testing');
    try {
      // In a real app, this would call the FastAPI backend
      const response = await fetch('http://localhost:8000/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ openrouter_key: apiKey })
      });
      const data = await response.json();
      if (data.status === 'connected') {
        setLatency(data.latency);
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (e) {
      setStatus('failed');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="glass-panel" style={{ width: '500px', padding: '40px' }}>
        <h2 style={{ fontSize: '12px', letterSpacing: '4px', color: 'var(--gray-500)', marginBottom: '30px' }}>SYSTEM CONFIGURATION</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '10px', color: 'var(--gray-400)', display: 'block', marginBottom: '8px' }}>OPENROUTER API KEY</label>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gray-700)',
              padding: '12px', color: 'white', borderRadius: '4px', fontSize: '12px'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ fontSize: '10px', color: 'var(--gray-400)', display: 'block', marginBottom: '8px' }}>MODEL PRIORITY QUEUE</label>
          <div style={{ fontSize: '11px', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
            1. google/gemini-2.0-flash-001 (DEFAULT)<br/>
            2. anthropic/claude-3-haiku<br/>
            3. openai/gpt-4o-mini
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={testConnection}
            style={{
              flex: 1, background: 'transparent', border: '1px solid var(--cyan)', color: 'var(--cyan)',
              padding: '12px', fontSize: '10px', fontWeight: 900, cursor: 'pointer', borderRadius: '4px'
            }}
          >
            {status === 'testing' ? 'PINGING...' : 'TEST CONNECTION'}
          </button>
          <button 
            onClick={handleSave}
            style={{
              flex: 1, background: 'var(--cyan)', border: 'none', color: 'black',
              padding: '12px', fontSize: '10px', fontWeight: 900, cursor: 'pointer', borderRadius: '4px'
            }}
          >
            LOCK CONFIG
          </button>
        </div>

        {status === 'success' && (
          <div style={{ marginTop: '20px', fontSize: '10px', color: 'var(--emerald)' }}>
            CONNECTION SECURED. LATENCY: {latency}
          </div>
        )}
        {status === 'failed' && (
          <div style={{ marginTop: '20px', fontSize: '10px', color: 'var(--crimson)' }}>
            CONNECTION FAILED. CHECK KEY OR BACKEND.
          </div>
        )}

        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', 
            color: 'var(--gray-500)', fontSize: '20px', cursor: 'pointer' 
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
