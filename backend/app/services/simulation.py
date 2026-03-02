import numpy as np
from typing import Dict, Any
from .ml_service import ml_service

class SimulationEngine:
    def run_monte_carlo(self, 
                       dept_code: str, 
                       staff_change: int, 
                       base_workload: float, 
                       iterations: int = 1000) -> Dict[str, Any]:
        """
        Simulate impact of staffing changes on resolution time and risk index.
        """
        # Historical baseline resolution times (hypothetical distributions)
        # In a real app, we'd pull these from the DB
        base_res_time = 12.0 # hours
        
        results = []
        for _ in range(iterations):
            # Sample workload with some variance
            sim_workload = np.random.normal(base_workload, base_workload * 0.1)
            
            # Impact of staffing on resolution time (Queuing Theory approximation)
            # res_time is proportional to workload / capacity
            capacity = 10 + staff_change # Assume base capacity of 10 staff
            if capacity <= 0: capacity = 1
                
            res_time_sim = (sim_workload / capacity) * (base_res_time / (base_workload/10))
            
            # Add some randomness
            res_time_sim *= np.random.uniform(0.8, 1.2)
            results.append(res_time_sim)
            
        avg_res_time = np.mean(results)
        risk_index = min(100, (avg_res_time / 24.0) * 100) # Simple risk index based on resolution time
        
        return {
            "dept_code": dept_code,
            "predicted_avg_res_time": round(float(avg_res_time), 2),
            "risk_index": round(float(risk_index), 2),
            "staff_utilization": round(min(100, (base_workload/capacity)*10), 2),
            "confidence_interval": [round(float(np.percentile(results, 5)), 2), 
                                   round(float(np.percentile(results, 95)), 2)]
        }

simulation_engine = SimulationEngine()
