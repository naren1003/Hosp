import React from 'react';
import Plot from 'react-plotly.js';

const SunburstChart = () => {
    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Hospital Operational Hierarchy</h3>
            <div className="h-[300px]">
                <Plot
                    data={[{
                        type: "sunburst",
                        labels: ["Hospital", "ER", "ICU", "SURG", "Staff A", "Staff B", "Shift 1", "Shift 2", "High", "Med", "Low"],
                        parents: ["", "Hospital", "Hospital", "Hospital", "ER", "ICU", "Staff A", "Staff A", "Shift 1", "Shift 1", "Shift 1"],
                        values: [100, 40, 30, 30, 20, 15, 10, 10, 5, 3, 2],
                        branchvalues: "total",
                        marker: { line: { width: 0.5 }, colorscale: 'Portland' },
                    }]}
                    layout={{
                        autosize: true,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#94a3b8' },
                        margin: { l: 0, r: 0, t: 0, b: 0 }
                    }}
                    config={{ displayModeBar: false, responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default SunburstChart;
