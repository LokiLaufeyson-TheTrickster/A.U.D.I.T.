# A.U.D.I.T. v2.0
**Codename: CHRONOS_FORK**

> "Your decisions are not events. They are trajectory locks."

A.U.D.I.T. is a predictive identity simulation engine that anchors Large Language Model (LLM) projections in grounded behavioral data. By combining FAISS-based behavioral clustering with natural language persona forking, the system models the long-term statistical drift of a user's life.

## 🚀 Core Philosophy
Your life is a sequence of trajectory locks. Every minor decision (skipping a workout, delaying a task, choosing rest over effort) is not an isolated event—it is a weight applied to a specific future persona. A.U.D.I.T. exposes the compounding debt of these decisions.

## 🛠 Features
- **OpenRouter Signal Layer**: High-availability AI engine with multi-model fallback (Gemini 2.0 Flash, Claude 3, GPT-4o).
- **Behavioral Vector Engine (FAISS)**: Uses historical behavioral logs to ground simulations in reality.
- **Persona Forking Engine**: Dynamic weighting of personas (The Stoic, The Hedonist, The Shadow) based on real metrics.
- **The Simulation Loop**: Runs 5-year simulations (1,825 steps) to predict statistical drift.
- **Regret Engine ($R_g$)**: Computes a mathematical value for trajectory debt.
- **Multiverse Dashboard**: A premium, glassmorphism-based UI for real-time decision analysis.

## 🏗 Architecture
- **Frontend**: Next.js 15, Dexie.js v2, Vanilla CSS.
- **Backend**: FastAPI, FAISS, Sentence-Transformers.
- **AI Engine**: OpenRouter API.

## 🛠 Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenRouter API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LokiLaufeyson-TheTrickster/A.U.D.I.T.
   cd A.U.D.I.T.
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Configuration**:
   - Access the dashboard at `http://localhost:3000`.
   - Click **SETTINGS** to input your OpenRouter API Key.
   - Run a connection test to ensure the Signal Layer is active.

---
*Developed by Antigravity | Project PRISM*
