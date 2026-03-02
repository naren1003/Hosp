import React from 'react';
import Plot from 'react-plotly.js';

const SankeyDiagram = () => {
    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Ticket Lifecycle Flow</h3>
            <div className="h-[300px]">
                <Plot
                    data={[{
                        type: "sankey",
                        orientation: "h",
                        valueformat: ".0f",
                        valuesuffix: " cases",
                        node: {
                            pad: 20,
                            thickness: 15,
                            line: { color: "rgba(0,0,0,0)", width: 0 },
                            label: ["Open", "Assigned", "In Progress", "Escalated", "Resolved"],
                            color: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"],
                            hoverlabel: { font: { family: 'Inter, sans-serif' } }
                        },
                        link: {
                            source: [0, 1, 2, 2, 3],
                            target: [1, 2, 4, 3, 4],
                            value: [40, 35, 30, 5, 5],
                            color: "rgba(59, 130, 246, 0.2)",
                            hovertemplate: 'Flow: %{value} cases<extra></extra>'
                        }
                    }]}
                    layout={{
                        autosize: true,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#94a3b8', family: 'Inter, sans-serif', size: 11 },
                        margin: { l: 20, r: 20, t: 20, b: 20 }
                    }}
                    config={{ displayModeBar: false, responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default SankeyDiagram;

