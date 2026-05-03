'use client';

import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/db';
import RegretGauge from '@/components/RegretGauge';
import ForkView from '@/components/ForkView';
import DecisionInput from '@/components/DecisionInput';
import SettingsLayer from '@/components/SettingsLayer';

export default function MultiverseDashboard() {
  const [decision, setDecision] = useState('');
  const [regretScore, setRegretScore] = useState(0.34); // Demo default
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [simResults, setSimResults] = useState<any>(null);
  const [amplifierText, setAmplifierText] = useState('');

  const cleanJsonResponse = (content: string) => {
    // Remove markdown code blocks if present
    return content.replace(/```json/g, '').replace(/```/g, '').trim();
  };

  const handleAnalyze = async (text: string) => {
    setDecision(text);
    setIsAnalyzing(true);
    
    try {
      const config = await db.configs.get('openrouter_key');
      const priorityConfig = await db.configs.get('model_priority');
      const model_priority = priorityConfig?.value 
        ? priorityConfig.value.split(',').map((m: string) => m.trim())
        : ["google/gemini-2.0-flash-001", "anthropic/claude-3-haiku", "openai/gpt-4o-mini"];

      const response = await fetch('http://localhost:8000/analyze-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            text,
            metrics: { streak: 5, resilience: 0.8, fatigue: 0.2, drift: 0.1, failure_rate: 0.05 }
          },
          config: {
            openrouter_key: config?.value || '',
            model_priority: model_priority
          }
        })
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        const cleaned = cleanJsonResponse(result.content);
        const parsed = JSON.parse(cleaned);
        setSimResults(parsed);
        setRegretScore(parsed.regret_score);
        setAmplifierText(`TRAJECTORY LOCK ENGAGED. 5-YEAR REGRET: ${(parsed.regret_score * 100).toFixed(1)}%`);
      }
    } catch (e) {
      console.error("Simulation failed", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="app-container">
      <div className="scanline" />
      
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '4px' }}>
          A.U.D.I.T. <span style={{ color: 'var(--crimson)', fontSize: '12px' }}>v2.0</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="header-codename" style={{ fontSize: '10px', color: 'var(--gray-500)', letterSpacing: '2px' }}>
            CODENAME: CHRONOS_FORK
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            style={{ 
              background: 'none', border: '1px solid var(--gray-700)', 
              color: 'var(--gray-300)', padding: '4px 12px', borderRadius: '4px',
              fontSize: '10px', cursor: 'pointer'
            }}
          >
            SETTINGS
          </button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Regret Gauge */}
        <div className="gauge-container" style={{ width: '120px', padding: '40px 20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <RegretGauge value={regretScore} />
        </div>

        {/* Center: Multiverse Fork */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ForkView 
            results={simResults} 
            isAnalyzing={isAnalyzing} 
          />
          
          {/* Decision Input Overlay */}
          <div className="decision-input-overlay" style={{ 
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            width: '80%', maxWidth: '800px', zIndex: 10
          }}>
            {amplifierText && (
              <div style={{
                textAlign: 'center', fontSize: '10px', color: 'var(--crimson)',
                letterSpacing: '2px', fontWeight: 900, marginBottom: '15px',
                animation: 'pulse-crimson 2s infinite'
              }}>
                [ ALERT ] {amplifierText}
              </div>
            )}
            <DecisionInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </main>

      {showSettings && <SettingsLayer onClose={() => setShowSettings(false)} />}
    </div>
  );
}
