import joblib
import pandas as pd
import numpy as np
from typing import Dict, List
import os

class MLService:
    def __init__(self):
        model_path = "ml_models/saved"
        try:
            self.forecast_model = joblib.load(f"{model_path}/workload_forecast.joblib")
            self.forecast_features = joblib.load(f"{model_path}/workload_features.joblib")
            self.classifier_model = joblib.load(f"{model_path}/resolution_classifier.joblib")
            self.classifier_features = joblib.load(f"{model_path}/classifier_features.joblib")
            self.anomaly_detector = joblib.load(f"{model_path}/anomaly_detector.joblib")
        except Exception as e:
            print(f"Error loading models: {e}")
            self.forecast_model = None

    def predict_workload(self, dept_code: str, shift: int, day_of_week: int, prev_workload: float):
        if not self.forecast_model: return 0
        
        # Prepare feature vector
        features = {f: 0 for f in self.forecast_features}
        features['shift'] = shift
        features['day_of_week'] = day_of_week
        features['prev_day_workload'] = prev_workload
        
        dept_feat = f"department_{dept_code}"
        if dept_feat in features:
            features[dept_feat] = 1
            
        df_feat = pd.DataFrame([features])
        prediction = self.forecast_model.predict(df_feat)[0]
        return prediction

    def classify_resolution(self, dept_code: str, priority: str, hour: int, complexity: int):
        if not self.classifier_model: return "Unknown"
        
        features = {f: 0 for f in self.classifier_features}
        features['hour'] = hour
        features['complexity'] = complexity
        
        dept_feat = f"department_{dept_code}"
        if dept_feat in features: features[dept_feat] = 1
            
        pri_feat = f"priority_{priority}"
        if pri_feat in features: features[pri_feat] = 1
            
        df_feat = pd.DataFrame([features])
        return self.classifier_model.predict(df_feat)[0]

    def detect_anomaly(self, res_time: float, complexity: int):
        if not self.anomaly_detector: return False
        X = pd.DataFrame([[res_time, complexity]], columns=['res_time_hrs', 'complexity'])
        return self.anomaly_detector.predict(X)[0] == -1

ml_service = MLService()
