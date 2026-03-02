import pandas as pd
from sqlalchemy.orm import Session
from backend.app.core.database import SessionLocal, engine
from backend.app.models.base import Base
from backend.app.models.hospital import Department, Staff, Ticket, Priority, Status

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Load Departments
        df_dept = pd.read_csv("database/data/departments.csv")
        for _, row in df_dept.iterrows():
            db_dept = Department(name=row['name'], code=row['code'])
            db.add(db_dept)
        db.commit()
        
        # Load Staff
        df_staff = pd.read_csv("database/data/staff.csv")
        dept_map = {d.code: d.id for d in db.query(Department).all()}
        for _, row in df_staff.iterrows():
            db_staff = Staff(
                name=row['name'], 
                role=row['role'], 
                department_id=dept_map[row['dept_code']]
            )
            db.add(db_staff)
        db.commit()
        
        # Load Tickets (Batch insert for speed)
        df_tickets = pd.read_csv("database/data/tickets.csv")
        df_tickets['created_at'] = pd.to_datetime(df_tickets['created_at'])
        df_tickets['resolved_at'] = pd.to_datetime(df_tickets['resolved_at'])
        
        staff_map = {s.id: s.id for s in db.query(Staff).all()}
        
        print("Inserting 50,000 tickets...")
        tickets = []
        for i, row in df_tickets.iterrows():
            ticket = Ticket(
                title=f"Incident {row['id']}",
                priority=Priority(row['priority']),
                status=Status(row['status']),
                department_id=dept_map[row['department']],
                assigned_staff_id=row['staff_id'],
                created_at=row['created_at'],
                resolved_at=row['resolved_at'] if pd.notnull(row['resolved_at']) else None,
                complexity=row['complexity']
            )
            tickets.append(ticket)
            if len(tickets) >= 1000:
                db.bulk_save_objects(tickets)
                db.commit()
                tickets = []
                print(f"Inserted {i+1} tickets...")
                
        if tickets:
            db.bulk_save_objects(tickets)
            db.commit()
            
        print("Data loading complete.")
        
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
