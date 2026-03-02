import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib
import os

def train_anomaly_model():
    df = pd.read_csv("database/data/tickets.csv")
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['resolved_at'] = pd.to_datetime(df['resolved_at'])
    
    df = df.dropna(subset=['resolved_at'])
    df['res_time_hrs'] = (df['resolved_at'] - df['created_at']).dt.total_seconds() / 3600
    
    # Features for anomaly detection: resolution time and complexity
    X = df[['res_time_hrs', 'complexity']]
    
    model = IsolationForest(contamination=0.05, random_state=42)
    model.fit(X)
    
    os.makedirs("ml_models/saved", exist_ok=True)
    joblib.dump(model, "ml_models/saved/anomaly_detector.joblib")
    print("Anomaly detector model saved.")

if __name__ == "__main__":
    train_anomaly_model()
