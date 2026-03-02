from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Enum, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base
import enum

class Priority(enum.Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class Status(enum.Enum):
    OPEN = "Open"
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"
    ESCALATED = "Escalated"

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    code = Column(String, unique=True, index=True) # ER, ICU, etc.
    
    staff = relationship("Staff", back_populates="department")
    tickets = relationship("Ticket", back_populates="department")

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    department_id = Column(Integer, ForeignKey("departments.id"))
    workload_score = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    
    department = relationship("Department", back_populates="staff")
    tickets = relationship("Ticket", back_populates="assigned_staff")

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    priority = Column(Enum(Priority), default=Priority.MEDIUM)
    status = Column(Enum(Status), default=Status.OPEN)
    department_id = Column(Integer, ForeignKey("departments.id"))
    assigned_staff_id = Column(Integer, ForeignKey("staff.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    complexity = Column(Integer) # 1-10
    
    department = relationship("Department", back_populates="tickets")
    assigned_staff = relationship("Staff", back_populates="tickets")

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    target_date = Column(DateTime)
    department_id = Column(Integer, ForeignKey("departments.id"))
    predicted_workload = Column(Integer)
    risk_level = Column(Float) # 0-100
    confidence_score = Column(Float)
    
class SimulationRun(Base):
    __tablename__ = "simulation_runs"
    id = Column(Integer, primary_key=True, index=True)
    parameters = Column(JSON)
    results = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
