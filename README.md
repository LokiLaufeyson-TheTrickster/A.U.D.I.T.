# A.U.D.I.T. v2.0
**Codename: CHRONOS_FORK**

> "Your decisions are not events. They are trajectory locks."

A.U.D.I.T. is a predictive identity simulation engine that anchors Large Language Model (LLM) projections in grounded behavioral data. It transforms "what if" into "most likely" by modeling the long-term statistical drift of a user's life.

## 🚀 Core Philosophy
Your life is a sequence of trajectory locks. Every minor decision is a weight applied to a specific future persona. A.U.D.I.T. exposes the compounding debt of these decisions.

## 🛠 Features
- **OpenRouter Signal Layer**: High-availability AI engine with **user-defined model priority** (allowing for cost optimization and use of free models).
- **Behavioral Vector Engine (FAISS)**: Grounds simulations in reality using B.A.S.E logs or **A.U.D.I.T. native logs**.
- **Persona Forking Engine**: Dynamic weighting of personas (The Stoic, The Hedonist, The Shadow, etc.) based on real metrics.
- **The Simulation Loop**: Runs 5-year simulations (1,825 steps) to predict statistical drift.
- **Regret Engine ($R_g$)**: Computes a mathematical value for trajectory debt.
- **Multiverse Dashboard**: A premium UI for real-time decision analysis and trajectory comparison.

## 🏗 Architecture
- **Frontend**: Next.js 15 (Optimized for Vercel deployment), Dexie.js v2, Vanilla CSS.
- **Backend**: FastAPI (Runs **locally** on device for privacy and FAISS efficiency).
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

2. **Setup Local Backend**:
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
   - Click **SETTINGS** to input your OpenRouter API Key and custom model priority list.
   - Run a connection test to ensure the Signal Layer is active.

---
*Developed by Antigravity | Project PRISM*
