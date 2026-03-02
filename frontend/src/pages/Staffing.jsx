import React from 'react';
import { Users, UserPlus, TrendingUp, AlertTriangle } from 'lucide-react';

const staffMembers = [
    { id: 'STF-01', name: 'Dr. Sarah Wilson', role: 'Head of ER', status: 'On Shift', department: 'ER', load: '85%' },
    { id: 'STF-02', name: 'Dr. Marc Chen', role: 'Senior Surgeon', status: 'On Shift', department: 'SURG', load: '92%' },
    { id: 'STF-03', name: 'Nurse Elena Rodriguez', role: 'ICU Specialist', status: 'Break', department: 'ICU', load: 'N/A' },
    { id: 'STF-04', name: 'Dr. James Miller', role: 'Junior Resident', status: 'On Shift', department: 'OPD', load: '45%' },
];

const Staffing = () => {
    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff Operations</h1>
                    <p className="text-slate-400 mt-1">Workforce allocation and shift efficiency monitoring.</p>
                </div>
                <button className="flex items-center space-x-2 btn-primary px-4 py-2 rounded-lg">
                    <UserPlus size={18} />
                    <span className="font-semibold text-sm">Update Roster</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-bold text-secondary flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            +12
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Active Staff</h3>
                    <p className="text-3xl font-bold">142</p>
                    <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-primary h-full rounded-full" style={{ width: '78%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">78% of total capacity currently active</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-accent/10 rounded-lg text-accent">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Overloaded Units</h3>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-xs text-slate-500 mt-2">ER and SURG reporting high workload</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Shift Efficiency</h3>
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-xs text-slate-500 mt-2">Resource allocation optimized by AI</p>
                </div>
            </div>

            <div className="bg-hospital-card border border-hospital-border rounded-xl">
                <div className="p-6 border-b border-hospital-border bg-slate-800/20">
                    <h2 className="text-lg font-bold">Active Staff Directory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-hospital-border bg-slate-800/10">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Workload</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-hospital-border">
                            {staffMembers.map((staff) => (
                                <tr key={staff.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
                                                {staff.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium">{staff.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{staff.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ring-1 ${staff.status === 'On Shift' ? 'bg-secondary/10 text-secondary ring-secondary/20' : 'bg-slate-500/10 text-slate-500 ring-slate-500/20'}`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{staff.department}</td>
                                    <td className="px-6 py-4">
                                        {staff.load !== 'N/A' ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 bg-slate-800 rounded-full h-1.5">
                                                    <div className={`h-full rounded-full ${parseInt(staff.load) > 90 ? 'bg-danger' : 'bg-primary'}`} style={{ width: staff.load }} />
                                                </div>
                                                <span className="text-xs font-mono">{staff.load}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-500">---</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Staffing;
