from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import dashboard, simulation
from .core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(simulation.router, prefix="/api/simulation", tags=["Simulation"])

@app.get("/")
def read_root():
    return {"message": "Hospital Operations AI Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
