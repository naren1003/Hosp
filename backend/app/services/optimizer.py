from typing import List, Dict, Any

class StaffOptimizer:
    def optimize_load(self, dept_stats: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Suggest staff moves to balance workload.
        dept_stats: List of {dept_code, current_staff, current_workload}
        """
        # Calculate ratio: workload per staff
        for stat in dept_stats:
            stat['ratio'] = stat['current_workload'] / stat['current_staff']
            
        # Target: Average ratio
        avg_ratio = sum(s['ratio'] for s in dept_stats) / len(dept_stats)
        
        moves = []
        surplus_depts = sorted([s for s in dept_stats if s['ratio'] < avg_ratio], key=lambda x: x['ratio'])
        deficit_depts = sorted([s for s in dept_stats if s['ratio'] > avg_ratio], key=lambda x: x['ratio'], reverse=True)
        
        for deficit in deficit_depts:
            while deficit['ratio'] > avg_ratio * 1.1 and surplus_depts:
                surplus = surplus_depts[0]
                moves.append({
                    "from": surplus['dept_code'],
                    "to": deficit['dept_code'],
                    "staff_count": 1,
                    "reason": f"High workload in {deficit['dept_code']} (ratio: {round(deficit['ratio'], 2)})"
                })
                # Update local stats for next iteration
                deficit['current_staff'] += 1
                surplus['current_staff'] -= 1
                deficit['ratio'] = deficit['current_workload'] / deficit['current_staff']
                surplus['ratio'] = surplus['current_workload'] / surplus['current_staff']
                
                if surplus['ratio'] >= avg_ratio:
                    surplus_depts.pop(0)
                    
        return moves

staff_optimizer = StaffOptimizer()
