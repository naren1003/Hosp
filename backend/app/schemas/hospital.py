from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any
from ..models.hospital import Priority, Status

class DepartmentBase(BaseModel):
    name: str
    code: str

class DepartmentSchema(DepartmentBase):
    id: int
    class Config: from_attributes = True

class StaffBase(BaseModel):
    name: str
    role: str
    department_id: int
    is_active: bool = True

class StaffSchema(StaffBase):
    id: int
    workload_score: float
    class Config: from_attributes = True

class TicketBase(BaseModel):
    title: str
    priority: Priority
    department_id: int
    assigned_staff_id: Optional[int] = None
    complexity: int

class TicketSchema(TicketBase):
    id: int
    status: Status
    created_at: datetime
    resolved_at: Optional[datetime] = None
    class Config: from_attributes = True

class KPISummaries(BaseModel):
    total_tickets: int
    pending_tickets: int
    avg_resolution_time: float
    overdue_percentage: float
    risk_index: float
    dept_distribution: Dict[str, int]
    priority_distribution: Dict[str, int]

class SimulationRequest(BaseModel):
    dept_code: str
    staff_change: int
    base_workload: float

class SimulationResponse(BaseModel):
    dept_code: str
    predicted_avg_res_time: float
    risk_index: float
    staff_utilization: float
    confidence_interval: List[float]
