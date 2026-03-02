import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def generate_hospital_data(n_tickets=50000):
    departments = [
        {"name": "Emergency Room", "code": "ER"},
        {"name": "Intensive Care Unit", "code": "ICU"},
        {"name": "Surgery", "code": "SURG"},
        {"name": "Outpatient Department", "code": "OPD"},
        {"name": "Pediatrics", "code": "PEDS"},
        {"name": "Radiology", "code": "RAD"},
        {"name": "Cardiology", "code": "CARD"}
    ]
    
    roles = ["Doctor", "Nurse", "Specialist", "Resident"]
    staff_per_dept = 15
    staff = []
    
    for dept in departments:
        for i in range(staff_per_dept):
            staff.append({
                "id": len(staff) + 1,
                "name": f"Staff_{len(staff)+1}",
                "role": random.choice(roles),
                "dept_code": dept["code"]
            })
            
    # Generate Tickets
    tickets = []
    start_date = datetime.now() - timedelta(days=365)
    
    print(f"Generating {n_tickets} tickets...")
    
    for i in range(n_tickets):
        dept = random.choice(departments)
        priority = random.choices(["High", "Medium", "Low"], weights=[0.2, 0.5, 0.3])[0]
        
        # Time distribution (more tickets during day)
        hour = int(np.random.normal(14, 4)) % 24
        minute = random.randint(0, 59)
        days_offset = random.randint(0, 365)
        created_at = start_date + timedelta(days=days_offset, hours=hour, minutes=minute)
        
        # Resolution time (hours)
        if priority == "High":
            res_time = np.random.gamma(2, 2) # Avg 4 hours
        elif priority == "Medium":
            res_time = np.random.gamma(4, 3) # Avg 12 hours
        else:
            res_time = np.random.gamma(6, 6) # Avg 36 hours
            
        resolved_at = created_at + timedelta(hours=res_time)
        
        # Status
        status = "Resolved"
        if created_at > datetime.now() - timedelta(days=1):
            status = random.choice(["Open", "Pending", "In Progress"])
            resolved_at = None
            
        staff_member = random.choice([s for s in staff if s["dept_code"] == dept["code"]])
        
        tickets.append({
            "id": i + 1,
            "department": dept["code"],
            "priority": priority,
            "status": status,
            "staff_id": staff_member["id"],
            "created_at": created_at,
            "resolved_at": resolved_at,
            "complexity": random.randint(1, 10)
        })
        
    df_tickets = pd.DataFrame(tickets)
    df_staff = pd.DataFrame(staff)
    df_dept = pd.DataFrame(departments)
    
    # Save to CSV
    os.makedirs("database/data", exist_ok=True)
    df_tickets.to_csv("database/data/tickets.csv", index=False)
    df_staff.to_csv("database/data/staff.csv", index=False)
    df_dept.to_csv("database/data/departments.csv", index=False)
    print("Data generation complete.")

if __name__ == "__main__":
    generate_hospital_data()
