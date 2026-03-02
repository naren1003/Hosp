import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import KPICard from '../components/KPICard';
import WorkloadHeatmap from '../components/WorkloadHeatmap';
import SankeyDiagram from '../components/SankeyDiagram';
import TrendChart from '../components/TrendChart';
import SunburstChart from '../components/SunburstChart';
import SimulationPanel from '../components/SimulationPanel';
import AutoInsights from '../components/AutoInsights';
import useStore from '../store/useStore';

const fetchKPIs = async () => {
    const { data } = await axios.get('http://localhost:8000/api/dashboard/kpis');
    return data;
};

const fetchHeatmap = async () => {
    const { data } = await axios.get('http://localhost:8000/api/dashboard/heatmap');
    return data;
};

const fetchTrends = async () => {
    const { data } = await axios.get('http://localhost:8000/api/dashboard/trends');
    return data;
};

function Dashboard() {
    const { department } = useStore();

    const { data: kpis, isLoading: kpiLoading } = useQuery({ queryKey: ['kpis'], queryFn: fetchKPIs });
    const { data: heatmap, isLoading: heatmapLoading } = useQuery({ queryKey: ['heatmap'], queryFn: fetchHeatmap });
    const { data: trends, isLoading: trendsLoading } = useQuery({ queryKey: ['trends'], queryFn: fetchTrends });

    return (
        <div className="flex-1">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Executive Command Center</h1>
                    <p className="text-slate-400 mt-1">Real-time predictive analytics and hospital telemetry.</p>
                </div>
                <div className="flex space-x-3">
                    <span className="flex items-center bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-500/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                        SYSTEMS OPERATIONAL
                    </span>
                </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <KPICard
                    title="Active Tickets"
                    value={kpis?.pending_tickets || "---"}
                    unit="cases"
                    trend={-4.2}
                    forecast={2}
                    confidence={92}
                />
                <KPICard
                    title="Avg Resolution"
                    value={kpis?.avg_resolution_time || "---"}
                    unit="hours"
                    trend={+12.5}
                    forecast={-1.5}
                    confidence={88}
                />
                <KPICard
                    title="Overdue Rate"
                    value={(kpis?.overdue_percentage || 0) + "%"}
                    unit=""
                    trend={-2.1}
                    forecast={0.5}
                    confidence={95}
                />
                <KPICard
                    title="Operational Risk"
                    value={kpis?.risk_index || "---"}
                    unit="/ 100"
                    trend={+1.4}
                    forecast={5}
                    confidence={79}
                />
            </div>

            {/* Middle Section: Visuals & Simulations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <WorkloadHeatmap data={heatmap || []} />
                        <SankeyDiagram />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TrendChart data={trends} />
                        <SunburstChart />
                    </div>
                </div>

                <div className="space-y-6">
                    <SimulationPanel />
                    <AutoInsights />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
