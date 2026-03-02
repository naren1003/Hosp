import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import os

def train_classifier_model():
    df = pd.read_csv("database/data/tickets.csv")
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['resolved_at'] = pd.to_datetime(df['resolved_at'])
    
    # Filter only resolved tickets
    df = df.dropna(subset=['resolved_at'])
    
    # Calculate resolution time in hours
    df['res_time_hrs'] = (df['resolved_at'] - df['created_at']).dt.total_seconds() / 3600
    
    # Define classes: Fast (<6 hrs), Average (6-24 hrs), Slow (>24 hrs)
    def classify_res_time(hrs):
        if hrs < 6: return "Fast"
        elif hrs <= 24: return "Average"
        else: return "Slow"
        
    df['resolution_class'] = df['res_time_hrs'].apply(classify_res_time)
    
    # Features
    df['hour'] = df['created_at'].dt.hour
    df = pd.get_dummies(df, columns=['department', 'priority'])
    
    X = df.drop(['id', 'status', 'created_at', 'resolved_at', 'res_time_hrs', 'resolution_class', 'staff_id'], axis=1)
    y = df['resolution_class']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print("\nResolution Classifier Report:")
    print(classification_report(y_test, model.predict(X_test)))
    
    os.makedirs("ml_models/saved", exist_ok=True)
    joblib.dump(model, "ml_models/saved/resolution_classifier.joblib")
    joblib.dump(X.columns.tolist(), "ml_models/saved/classifier_features.joblib")
    print("Classifier model saved.")

if __name__ == "__main__":
    train_classifier_model()
