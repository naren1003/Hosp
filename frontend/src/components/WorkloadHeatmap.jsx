import React from 'react';
import Plot from 'react-plotly.js';

const WorkloadHeatmap = ({ data }) => {
    const depts = ["ER", "ICU", "SURG", "OPD", "PEDS"];
    const shifts = ["Morning", "Afternoon", "Night"];

    // Pivot data for heatmap
    const z = depts.map(dept =>
        shifts.map((shift, idx) => {
            const item = data.find(d => d.dept === dept && d.shift === idx);
            return item ? item.predicted_workload : 0;
        })
    );

    // Custom Warm Colorscale (Non-Blue: Purple to Red)
    const colorscale = [
        [0, '#0f172a'],      // Slate 900 (Baseline)
        [0.4, '#7e22ce'],    // Deep Purple
        [0.7, '#ea580c'],    // Orange
        [1, '#f43f5e']       // Red/Coral
    ];

    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Predictive Workload Heatmap (48h)</h3>
            <div className="h-[300px]">
                <Plot
                    data={[{
                        z: z,
                        x: shifts,
                        y: depts,
                        type: 'heatmap',
                        colorscale: colorscale,
                        showscale: true,
                        hoverongaps: false,
                        zmin: 0,
                        zmax: 100,
                        xgap: 4,
                        ygap: 4,
                        hovertemplate: '<b>%{y}</b><br>Shift: %{x}<br>Workload: %{z}%<extra></extra>',
                        colorbar: {
                            thickness: 15,
                            len: 0.9,
                            tickfont: { color: '#64748b', size: 10 }
                        }
                    }]}
                    layout={{
                        autosize: true,
                        margin: { l: 60, r: 10, t: 10, b: 40 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#94a3b8', family: 'Inter, sans-serif' },
                        xaxis: {
                            ticks: '',
                            side: 'bottom',
                            gridcolor: 'rgba(255,255,255,0.05)',
                            zeroline: false
                        },
                        yaxis: {
                            ticks: '',
                            autorange: 'reversed',
                            gridcolor: 'rgba(255,255,255,0.05)',
                            zeroline: false
                        }
                    }}
                    config={{ displayModeBar: false, responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default WorkloadHeatmap;

