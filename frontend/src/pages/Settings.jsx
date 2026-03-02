import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Cpu, Database, Save, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                    <p className="text-slate-400 mt-1">Configure operational thresholds and AI model parameters.</p>
                </div>
                <button className="flex items-center space-x-2 btn-primary px-6 py-2 rounded-lg">
                    <Save size={18} />
                    <span className="font-semibold text-sm">Save Changes</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="glass-card p-6">
                        <div className="flex items-center space-x-3 text-primary mb-6">
                            <Bell size={20} />
                            <h3 className="text-lg font-bold">Alert Thresholds</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-slate-300">Critical Workload Trigger</label>
                                    <span className="text-xs font-mono text-primary">85%</span>
                                </div>
                                <input type="range" className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary" />
                                <p className="text-[10px] text-slate-500">Threshold for triggering "High Risk" operational status in ER/ICU.</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-slate-300">Resolution SLA Alert</label>
                                    <span className="text-xs font-mono text-primary">120 mins</span>
                                </div>
                                <input type="range" className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary" />
                                <p className="text-[10px] text-slate-500">Time limit before unsolved tickets are escalated to department heads.</p>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-6">
                        <div className="flex items-center space-x-3 text-accent mb-6">
                            <Cpu size={20} />
                            <h3 className="text-lg font-bold">AI Model Configuration</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-300">Forecasting Model</label>
                                <select className="w-full bg-slate-800/50 border border-hospital-border rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary">
                                    <option>Random Forest Regressor (Default)</option>
                                    <option>Prophet Time Series</option>
                                    <option>XGBoost Enterprise</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-300">Inference Frequency</label>
                                <select className="w-full bg-slate-800/50 border border-hospital-border rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary">
                                    <option>Real-time (Stream)</option>
                                    <option>Every 5 Minutes</option>
                                    <option>Hourly Batch</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 flex items-center">
                            <Shield size={18} className="mr-2 text-secondary" />
                            Security & Permissions
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Globe size={16} className="text-slate-400" />
                                    <span className="text-sm">External API Access</span>
                                </div>
                                <div className="w-10 h-5 bg-secondary/30 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-secondary rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Database size={16} className="text-slate-400" />
                                    <span className="text-sm">Local Persistence</span>
                                </div>
                                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-slate-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-primary/5 border border-primary/20">
                        <h4 className="text-xs font-bold text-primary uppercase mb-2">System Info</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500 uppercase">Version</span>
                                <span className="text-slate-300">2.4.0-build.82</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500 uppercase">Kernel</span>
                                <span className="text-slate-300">Vite-HospOps-v1</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500 uppercase">Node ID</span>
                                <span className="text-slate-300">#4192-AF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
