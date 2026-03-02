import React from 'react';
import { FileText, Download, Calendar, BarChart3, Clock, PieChart } from 'lucide-react';

const recentReports = [
    { id: 'REP-2025-01', name: 'Monthly Operational Summary', date: 'Feb 28, 2025', size: '2.4 MB', type: 'PDF' },
    { id: 'REP-2025-02', name: 'ER Workload Forecast Accuracy', date: 'Feb 25, 2025', size: '1.2 MB', type: 'PDF' },
    { id: 'REP-2025-03', name: 'Staff Allocation Audit', date: 'Feb 20, 2025', size: '840 KB', type: 'CSV' },
    { id: 'REP-2025-04', name: 'Equipment Telemetry Logs', date: 'Feb 15, 2025', size: '4.8 MB', type: 'ZIP' },
];

const Reports = () => {
    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Intelligence Reports</h1>
                    <p className="text-slate-400 mt-1">Historical performance data and operational audits.</p>
                </div>
                <button className="flex items-center space-x-2 bg-hospital-card border border-hospital-border px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors">
                    <Calendar size={18} />
                    <span className="font-semibold text-sm">Select Range</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="glass-card p-6 border-b-2 border-primary">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Reports</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">128</span>
                        <span className="text-xs text-secondary">+5 this month</span>
                    </div>
                </div>
                <div className="glass-card p-6 border-b-2 border-secondary">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Storage Used</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">4.2</span>
                        <span className="text-xl font-medium text-slate-400">GB</span>
                    </div>
                </div>
                <div className="glass-card p-6 border-b-2 border-accent">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Automated Runs</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">24</span>
                        <span className="text-xs text-slate-500">Scheduled daily</span>
                    </div>
                </div>
                <div className="glass-card p-6 border-b-2 border-danger">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Compliance</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">100%</span>
                        <span className="text-xs text-secondary">HIPAA Validated</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-hospital-card border border-hospital-border rounded-xl">
                        <div className="p-6 border-b border-hospital-border flex justify-between items-center">
                            <h2 className="text-lg font-bold">Recent Generated Reports</h2>
                            <button className="text-xs text-primary hover:underline font-semibold">View All</button>
                        </div>
                        <div className="divide-y divide-hospital-border">
                            {recentReports.map((report) => (
                                <div key={report.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200">{report.name}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{report.id} • {report.date} • {report.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded transition-colors">
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Quick Insights</h3>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-primary/10 rounded text-primary">
                                    <BarChart3 size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Efficiency Peak</p>
                                    <p className="text-xs text-slate-400">03:00 AM - 05:00 AM</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-secondary/10 rounded text-secondary">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Avg Triage Time</p>
                                    <p className="text-xs text-slate-400">14m (Stable)</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-accent/10 rounded text-accent">
                                    <PieChart size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Resource Usage</p>
                                    <p className="text-xs text-slate-400">Optimized at 82%</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-sm font-bold rounded-lg transition-colors border border-hospital-border">
                            Generate Custom Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
