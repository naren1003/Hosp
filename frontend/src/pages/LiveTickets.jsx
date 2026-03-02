import React from 'react';
import { Ticket, Clock, CheckCircle2, AlertCircle, Filter, Search } from 'lucide-react';

const tickets = [
    { id: 'TKT-1042', patient: 'A. Sharma', department: 'ER', priority: 'Critical', status: 'In Progress', time: '12 mins ago' },
    { id: 'TKT-1043', patient: 'R. Patel', department: 'ICU', priority: 'High', status: 'Pending', time: '5 mins ago' },
    { id: 'TKT-1044', patient: 'S. Khan', department: 'OPD', priority: 'Medium', status: 'In Progress', time: '25 mins ago' },
    { id: 'TKT-1045', patient: 'M. Gupta', department: 'SURG', priority: 'Critical', status: 'Pending', time: '2 mins ago' },
    { id: 'TKT-1046', patient: 'J. Das', department: 'ER', priority: 'Low', status: 'Resolved', time: '1 hour ago' },
];

const PriorityBadge = ({ priority }) => {
    const styles = {
        Critical: 'bg-red-500/10 text-red-500 ring-red-500/20',
        High: 'bg-orange-500/10 text-orange-500 ring-orange-500/20',
        Medium: 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/20',
        Low: 'bg-green-500/10 text-green-500 ring-green-500/20',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ring-1 ${styles[priority]}`}>
            {priority}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        'In Progress': 'text-primary',
        Pending: 'text-slate-400',
        Resolved: 'text-secondary',
    };
    return (
        <span className={`flex items-center text-xs font-medium ${styles[status]}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'In Progress' ? 'bg-primary animate-pulse' : status === 'Pending' ? 'bg-slate-400' : 'bg-secondary'}`} />
            {status}
        </span>
    );
};

const LiveTickets = () => {
    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Live Ticket Command</h1>
                    <p className="text-slate-400 mt-1">Real-time triage and case management monitoring.</p>
                </div>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            className="bg-hospital-card border border-hospital-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
                        />
                    </div>
                    <button className="bg-hospital-card border border-hospital-border p-2 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <div className="bg-hospital-card border border-hospital-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-hospital-border bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Case ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Elapsed</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-hospital-border">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-primary">{ticket.id}</td>
                                    <td className="px-6 py-4 font-medium">{ticket.patient}</td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{ticket.department}</td>
                                    <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                                    <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{ticket.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-slate-800/50 border-t border-hospital-border flex justify-between items-center">
                    <p className="text-xs text-slate-500">Showing 5 of 124 active tickets</p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-hospital-dark border border-hospital-border rounded text-xs text-slate-400 hover:text-white">Previous</button>
                        <button className="px-3 py-1 bg-hospital-dark border border-hospital-border rounded text-xs text-slate-400 hover:text-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTickets;
