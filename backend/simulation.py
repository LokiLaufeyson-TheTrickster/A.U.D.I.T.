import math
import random

class SimulationEngine:
    def __init__(self, user_metrics):
        self.metrics = user_metrics # streak, resilience, fatigue, drift
        self.personas = {
            "The Stoic": {"weight": 1.0},
            "The Hedonist": {"weight": 1.0},
            "The Shadow": {"weight": 1.0}
        }
        self.update_persona_weights()

    def update_persona_weights(self):
        # The Stoic: Weighted by Current_Streak and Total_Resilience
        self.personas["The Stoic"]["weight"] = (self.metrics.get("streak", 0) * 0.5) + (self.metrics.get("resilience", 0) * 0.5)
        
        # The Hedonist: Weighted by Current_Fatigue and Temporal_Drift
        self.personas["The Hedonist"]["weight"] = (self.metrics.get("fatigue", 0) * 0.5) + (self.metrics.get("drift", 0) * 0.5)
        
        # The Shadow: Injected with raw failure data
        self.personas["The Shadow"]["weight"] = self.metrics.get("failure_rate", 0) * 2.0

    def calculate_regret(self, delta_p, c_d, t_l, i_d):
        # Rg = (w1 * dP) + (w2 * Cd) + (w3 * Tl) + (w4 * Id)
        w = [0.4, 0.3, 0.2, 0.1]
        rg = (w[0] * delta_p) + (w[1] * c_d) + (w[2] * t_l) + (w[3] * i_d)
        return min(rg, 1.0)

    def run_simulation(self, decision_input, steps=1825):
        # This will be called via API and will interact with LLM for snapshots
        results = {
            "stoic": {"regret": [], "snapshots": []},
            "hedonist": {"regret": [], "snapshots": []},
            "shadow": {"regret": [], "snapshots": []}
        }
        # Simulation logic simplified for now
        return results

simulation_engine = SimulationEngine({})
