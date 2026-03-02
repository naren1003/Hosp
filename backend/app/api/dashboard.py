from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.hospital import Ticket, Department, Staff, Status, Priority
from ..schemas.hospital import KPISummaries
from sqlalchemy import func
from datetime import datetime, timedelta
import random

router = APIRouter()

@router.get("/kpis", response_model=KPISummaries)
def get_kpis(db: Session = Depends(get_db)):
    # Summary of stats
    total = db.query(Ticket).count()
    pending = db.query(Ticket).filter(Ticket.status != Status.RESOLVED).count()
    
    # Calculate avg resolution time
    resolved = db.query(Ticket).filter(Ticket.status == Status.RESOLVED).all()
    if resolved:
        durations = [(t.resolved_at - t.created_at).total_seconds() / 3600 for t in resolved]
        avg_res = sum(durations) / len(durations)
    else:
        avg_res = 0.0
        
    # Dept distribution
    dept_counts = db.query(Department.code, func.count(Ticket.id)).join(Ticket).group_by(Department.code).all()
    dept_dist = {code: count for code, count in dept_counts}
    
    # Priority distribution
    pri_counts = db.query(Ticket.priority, func.count(Ticket.id)).group_by(Ticket.priority).all()
    pri_dist = {p.value: count for p, count in pri_counts}
    
    return {
        "total_tickets": total,
        "pending_tickets": pending,
        "avg_resolution_time": round(avg_res, 2),
        "overdue_percentage": round((pending / total * 100) if total > 0 else 0, 2),
        "risk_index": round(random.uniform(20, 45), 2), # Simulated real-time risk index
        "dept_distribution": dept_dist,
        "priority_distribution": pri_dist
    }

@router.get("/heatmap")
def get_heatmap(db: Session = Depends(get_db)):
    # Mocked heatmap data for departments x shifts
    depts = ["ER", "ICU", "SURG", "OPD", "PEDS"]
    shifts = [0, 1, 2] # Morning, Afternoon, Night
    
    data = []
    for d in depts:
        for s in shifts:
            data.append({
                "dept": d,
                "shift": s,
                "current_workload": random.randint(5, 95),
                "predicted_workload": random.randint(5, 95)
            })
    return data

@router.get("/trends")
def get_trends(db: Session = Depends(get_db)):
    # Last 7 days resolution trends
    labels = [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(7)]
    labels.reverse()
    
    values = [random.uniform(5, 15) for _ in range(7)]
    forecast = [values[-1] + random.uniform(-2, 2) for _ in range(3)]
    
    return {
        "labels": labels,
        "values": values,
        "forecast": forecast
    }
