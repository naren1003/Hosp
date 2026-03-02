import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Ticket, Settings, Activity, FileText, Bell, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

const Sidebar = () => {
    const { department, setDepartment } = useStore();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Ticket, label: 'Live Tickets', path: '/tickets' },
        { icon: Activity, label: 'Digital Twin', path: '/twin' },
        { icon: Users, label: 'Staffing', path: '/staffing' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="w-64 bg-hospital-dark border-r border-hospital-border h-screen flex flex-col p-4 fixed left-0">
            <div className="flex items-center space-x-2 mb-10 px-2 py-4 border-b border-hospital-border/50">
                <Sparkles className="text-primary" size={28} />
                <span className="text-xl font-bold tracking-tight">Hosp<span className="text-primary">Ops</span> AI</span>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto border-t border-hospital-border/50 pt-4 px-2">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-4">Department Center</div>
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-800/50 border border-hospital-border rounded-lg p-2 text-sm focus:outline-none"
                >
                    <option>All Departments</option>
                    <option>ER</option>
                    <option>ICU</option>
                    <option>SURG</option>
                    <option>OPD</option>
                </select>

                <div className="mt-6 flex items-center space-x-3 text-slate-400 hover:text-white cursor-pointer px-2">
                    <Bell size={20} />
                    <span className="text-sm font-medium">Alerts</span>
                    <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

