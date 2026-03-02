import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

def train_forecast_model():
    df = pd.read_csv("database/data/tickets.csv")
    df['created_at'] = pd.to_datetime(df['created_at'])
    
    # Feature Engineering for Workload Forecasting
    # We want to predict "number of tickets" per department per 8-hour shift
    df['date'] = df['created_at'].dt.date
    df['hour'] = df['created_at'].dt.hour
    df['shift'] = df['hour'] // 8 # 0, 1, 2
    df['day_of_week'] = df['created_at'].dt.dayofweek
    
    # Group by Dept, Date, Shift
    workload = df.groupby(['department', 'date', 'shift', 'day_of_week']).size().reset_index(name='ticket_count')
    
    # Add lag features (previous day's workload for same shift)
    workload = workload.sort_values(['department', 'date', 'shift'])
    workload['prev_day_workload'] = workload.groupby(['department', 'shift'])['ticket_count'].shift(1)
    workload = workload.dropna()
    
    # Encode Department
    workload = pd.get_dummies(workload, columns=['department'])
    
    X = workload.drop(['date', 'ticket_count'], axis=1)
    y = workload['ticket_count']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    preds = model.predict(X_test)
    print(f"Workload Forecast MAE: {mean_absolute_error(y_test, preds)}")
    
    os.makedirs("ml_models/saved", exist_ok=True)
    joblib.dump(model, "ml_models/saved/workload_forecast.joblib")
    joblib.dump(X.columns.tolist(), "ml_models/saved/workload_features.joblib")
    print("Forecasting model saved.")

if __name__ == "__main__":
    train_forecast_model()
