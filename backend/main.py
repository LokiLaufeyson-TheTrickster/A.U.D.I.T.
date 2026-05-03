from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from openrouter import OpenRouterClient
from vector_engine import vector_engine
from simulation import SimulationEngine

app = FastAPI(title="A.U.D.I.T. v2.0 Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DecisionInput(BaseModel):
    text: str
    context: Optional[dict] = {}
    metrics: dict

class Config(BaseModel):
    openrouter_key: str
    model_priority: Optional[List[str]] = None

@app.post("/test-connection")
async def test_connection(config: Config):
    client = OpenRouterClient(config.openrouter_key, config.model_priority)
    return client.test_connection()

@app.post("/analyze-decision")
async def analyze_decision(input: DecisionInput, config: Config):
    client = OpenRouterClient(config.openrouter_key, config.model_priority)
    
    # 1. Similarity Retrieval
    history = vector_engine.search(input.text, top_k=5)
    
    # 2. Grounded Inference Prompt
    history_context = ""
    if history:
        history_context = "Historical Context from B.A.S.E logs:\n"
        for item in history:
            history_context += f"- Decision: {item['metadata'].get('decision')}, Outcome: {item['metadata'].get('outcome')}, Context: {item['metadata'].get('tags')}\n"

    prompt = f"""
    SYSTEM: You are A.U.D.I.T. v2.0 (Predictive Identity Simulation Engine).
    Your decisions are not events. They are trajectory locks.
    
    IMPORTANT: No jargon. No decimals. No "metric shifts." 
    Talk like a hostile but accurate life-coach. Describe real-life impact.
    For each persona, you MUST provide a timeline of where the user's life will be.
    
    USER DECISION: {input.text}
    CURRENT METRICS: {input.metrics}
    
    {history_context}
    
    TASK: Perform a trajectory lock analysis. Fork the persona into:
    1. The Stoic (The Ideal Trajectory)
    2. The Hedonist (The Impulse Trajectory)
    3. The Shadow (The Failure Trajectory)
    
    Return JSON format exactly as follows:
    {{
        "stoic": {{
            "snapshots": {{
                "1m": "...",
                "1y": "...",
                "5y": "...",
                "10y": "..."
            }},
            "impact_narrative": "One paragraph describing the visceral reality of this life.",
            "regret_impact": 0.05
        }},
        "hedonist": {{
            "snapshots": {{
                "1m": "...",
                "1y": "...",
                "5y": "...",
                "10y": "..."
            }},
            "impact_narrative": "...",
            "regret_impact": 0.45
        }},
        "shadow": {{
            "snapshots": {{
                "1m": "...",
                "1y": "...",
                "5y": "...",
                "10y": "..."
            }},
            "impact_narrative": "...",
            "regret_impact": 0.95
        }},
        "regret_score": 0.34
    }}
    """
    
    messages = [{"role": "user", "content": prompt}]
    result = client.chat_completion(messages)
    
    return result

@app.post("/log-outcome")
async def log_outcome(data: dict = Body(...)):
    # Add to FAISS index
    decision = data.get("decision")
    outcome = data.get("outcome")
    tags = data.get("tags", [])
    
    meta = {"decision": decision, "outcome": outcome, "tags": tags}
    vector_engine.add_to_index(decision, meta)
    return {"status": "indexed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
