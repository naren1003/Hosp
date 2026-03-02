import React, { useState } from 'react';
import { Play, RotateCcw, Users, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const SimulationPanel = () => {
    const [staffChange, setStaffChange] = useState(0);
    const [iterations, setIterations] = useState(1000);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSimulate = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/simulation/simulate', {
                dept_code: "ER",
                staff_change: staffChange,
                base_workload: 45.0
            });
            setResults(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Play size={20} className="mr-2 text-primary" />
                What-If Simulation Engine
            </h3>

            <div className="space-y-6 flex-1">
                <div>
                    <label className="block text-sm text-slate-400 mb-2 flex items-center justify-between">
                        Staff Reallocation (Current: 15)
                        <span className={`font-bold ${staffChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {staffChange > 0 ? '+' : ''}{staffChange}
                        </span>
                    </label>
                    <input
                        type="range" min="-10" max="10" step="1"
                        value={staffChange}
                        onChange={(e) => setStaffChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-2">Simulated Shift Hours</label>
                    <select className="input-field w-full">
                        <option>8 Hour (Normal)</option>
                        <option>10 Hour (Extended)</option>
                        <option>12 Hour (Emergency)</option>
                    </select>
                </div>
            </div>

            {results && (
                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Predicted Resolution:</span>
                        <span className="font-bold text-blue-400">{results.predicted_avg_res_time} hrs</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Risk Index:</span>
                        <span className={`font-bold ${results.risk_index > 50 ? 'text-red-500' : 'text-green-500'}`}>
                            {results.risk_index}/100
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${results.risk_index}%` }} />
                    </div>
                </div>
            )}

            <button
                onClick={handleSimulate}
                disabled={loading}
                className="mt-6 btn-primary w-full flex items-center justify-center"
            >
                {loading ? 'Running...' : 'Run Simulation'}
            </button>
        </div>
    );
};

export default SimulationPanel;
