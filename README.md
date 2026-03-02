# 🏥 AI-Powered Hospital Operations Dashboard

A predictive, simulation-driven analytics platform for hospital administration.

## 🚀 Key Features
- **Real-time KPI Command Center**: Monitor ER, ICU, and Surgery metrics.
- **ML Forecasting**: Predict workload spikes 24-48 hours in advance using Random Forest.
- **Monte Carlo Simulation**: Test staffing and shift changes before implementation.
- **Digital Twin Engine**: Virtual operational state for persistent modelling.
- **Anomaly Detection**: Flag SLA breaches and workload spikes automatically.
- **Staff Reallocation Optimizer**: AI-driven suggestions for load balancing.

## 🧱 Tech Stack
- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Celery, Redis.
- **Frontend**: React (Vite), TailwindCSS, Plotly.js, Framer Motion, Zustand.
- **ML**: Scikit-learn (Random Forest, Isolation Forest).

## 🛠️ Setup Instructions

### Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)
- Python 3.10+ (for local dev)

### Docker Deployment (Recommended)
```bash
docker-compose up --build
```

### Local Development
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📊 ML Pipeline
Models are located in `ml_models/`.
- `generate_data.py`: Creates synthetic dataset.
- `training/`: Contains training scripts for forecast, classification, and anomaly models.

## 🧩 Structure
- `/backend`: FastAPI application and business logic.
- `/frontend`: React UI with interactive dashboards.
- `/ml_models`: Saved models and training pipelines.
- `/database`: Schema definitions and data loading scripts.
