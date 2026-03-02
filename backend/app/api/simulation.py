from fastapi import APIRouter, Depends
from ..schemas.hospital import SimulationRequest, SimulationResponse
from ..services.simulation import simulation_engine

router = APIRouter()

@router.post("/simulate", response_model=SimulationResponse)
def run_simulation(req: SimulationRequest):
    result = simulation_engine.run_monte_carlo(
        dept_code=req.dept_code,
        staff_change=req.staff_change,
        base_workload=req.base_workload
    )
    return result
