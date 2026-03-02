import React from 'react';
import { Activity, Play, RotateCcw, Save, ShieldCheck, Zap } from 'lucide-react';
import SimulationPanel from '../components/SimulationPanel';

const DigitalTwin = () => {
    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Digital Twin Engine</h1>
                    <p className="text-slate-400 mt-1">Virtual hospital modeling and stress testing environment.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">
                        <Play size={18} />
                        <span className="font-semibold text-sm">Run Sync</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-hospital-card border border-hospital-border px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors">
                        <RotateCcw size={18} />
                        <span className="font-semibold text-sm">Reset View</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6 border-l-4 border-primary">
                    <div className="flex items-center space-x-3 text-primary mb-2">
                        <Activity size={20} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Sync Status</h3>
                    </div>
                    <p className="text-2xl font-bold">99.8%</p>
                    <p className="text-xs text-slate-500 mt-1">Real-time telemetry parity</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-secondary">
                    <div className="flex items-center space-x-3 text-secondary mb-2">
                        <ShieldCheck size={20} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Model Fidelity</h3>
                    </div>
                    <p className="text-2xl font-bold">High</p>
                    <p className="text-xs text-slate-500 mt-1">Validated against 30-day history</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-accent">
                    <div className="flex items-center space-x-3 text-accent mb-2">
                        <Zap size={20} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Compute Load</h3>
                    </div>
                    <p className="text-2xl font-bold">14ms</p>
                    <p className="text-xs text-slate-500 mt-1">Inference latency (Local Node)</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-danger">
                    <div className="flex items-center space-x-3 text-danger mb-2">
                        <Save size={20} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Active Scenarios</h3>
                    </div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-slate-500 mt-1">Persistence enabled</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1">
                    <SimulationPanel />
                </div>
                <div className="xl:col-span-2 space-y-6">
                    <div className="glass-card p-8 h-full flex flex-col justify-center items-center border-dashed border-2">
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/20">
                            <Activity size={48} className="text-primary animate-pulse" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">3D Spatial Mapping Ready</h2>
                        <p className="text-slate-400 text-center max-w-md mx-auto">
                            Connect an spatial data engine to visualize hospital traffic density, equipment telemetry, and workflow bottlenecks in real-time.
                        </p>
                        <button className="mt-8 btn-primary px-8">Enable Visual Twin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalTwin;
