from typing import Dict, Any
from datetime import datetime

class DigitalTwin:
    """
    Maintains a persistent state of the "virtual" hospital.
    Used for simulation testing without affecting live operations.
    """
    def __init__(self):
        self.state = {
            "last_sync": datetime.now(),
            "departments": {
                "ER": {"staff": 15, "active_tickets": 10},
                "ICU": {"staff": 10, "active_tickets": 5},
                "SURG": {"staff": 12, "active_tickets": 8},
                "OPD": {"staff": 20, "active_tickets": 25},
                "PEDS": {"staff": 8, "active_tickets": 4},
            },
            "global_risk": 32.5
        }

    def update_state(self, dept_code: str, updates: Dict[str, Any]):
        if dept_code in self.state["departments"]:
            self.state["departments"][dept_code].update(updates)
            self.state["last_sync"] = datetime.now()
            
    def get_state(self):
        return self.state

digital_twin = DigitalTwin()
