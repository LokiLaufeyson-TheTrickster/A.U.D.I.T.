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
            "snapshot_1m": "Body remains in peak rhythm despite the temptation.",
            "snapshot_1y": "Discipline is now a character trait, not a chore.",
            "snapshot_5y": "Unrecognizable resilience compared to peers.",
            "snapshot_10y": "Biological age significantly lower than chronological age.",
            "impact_narrative": "You become a fortress of discipline, impervious to the minor impulses that derail others.",
            "regret_impact": 0.05
        }},
        "hedonist": {{
            "snapshot_1m": "Temporary satisfaction followed by a slight dip in morning energy.",
            "snapshot_1y": "Consistency has eroded; you find excuses for comfort twice a week.",
            "snapshot_5y": "Metabolic health begins to slide; sleep quality is chronically compromised.",
            "snapshot_10y": "You look and feel significantly older than your potential.",
            "impact_narrative": "A life defined by the pursuit of comfort, leading to a body and mind that are soft and easily fatigued.",
            "regret_impact": 0.45
        }},
        "shadow": {{
            "snapshot_1m": "The first domino falls; discipline is replaced by a cycle of 'starting tomorrow'.",
            "snapshot_1y": "Health markers are in decline; cooking is a rare event, and energy is non-existent.",
            "snapshot_5y": "Chronic health issues emerge; you have lost control over your baseline habits.",
            "snapshot_10y": "Full trajectory collapse; the version of you that could have been is now an impossible dream.",
            "impact_narrative": "A tragic collapse of potential where your body has become a prison of your own making.",
            "regret_impact": 0.95
        }},
        "regret_score": 0.34
    }}
    """
    
    print(f"--- SIMULATING TRAJECTORY FOR: {input.text} ---")
    response = await client.get_completion(prompt, config.model_priority)
    print(f"--- RAW LLM OUTPUT ---\n{response}\n--- END OUTPUT ---")
    return {"status": "success", "content": response}

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
