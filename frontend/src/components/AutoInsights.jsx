import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const AutoInsights = () => {
    const insights = [
        {
            type: 'warning',
            text: "ER workload predicted to spike by 24% in the next shift. Suggest reallocating 3 staff members from OPD.",
            icon: AlertCircle,
            color: "text-amber-500"
        },
        {
            type: 'success',
            text: "Surgery resolution time improved by 15% following last week's staffing adjustment.",
            icon: CheckCircle2,
            color: "text-emerald-500"
        },
        {
            type: 'info',
            text: "SLA compliance for High Priority tickets remains stable at 94.2%.",
            icon: Sparkles,
            color: "text-blue-500"
        }
    ];

    return (
        <div className="glass-card p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                    <Sparkles size={20} className="mr-2 text-primary" />
                    AI-Generated Insights
                </h3>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded font-bold uppercase">Live</span>
            </div>

            <div className="space-y-4">
                {insights.map((insight, idx) => (
                    <div key={idx} className="flex space-x-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
                        <insight.icon className={`${insight.color} shrink-0 mt-1`} size={18} />
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                            {insight.text}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-xs font-bold text-primary uppercase mb-1">Optimization Logic</div>
                <p className="text-xs text-slate-400">
                    The Staff Reallocation Optimizer suggests moving **3 Nurses** to **ICU** to mitigate predicted SLA breaches.
                </p>
            </div>
        </div>
    );
};

export default AutoInsights;
