import React from 'react';
import Plot from 'react-plotly.js';

const TrendChart = ({ data }) => {
    if (!data) return null;

    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Resolution Trends & Forecast</h3>
            <div className="h-[300px]">
                <Plot
                    data={[
                        {
                            x: data.labels,
                            y: data.values,
                            type: 'scatter',
                            mode: 'lines+markers',
                            name: 'Actual',
                            line: { color: '#3b82f6', width: 3 },
                            marker: { color: '#3b82f6', size: 6 }
                        },
                        {
                            x: [...data.labels.slice(-1), "Forecast D1", "Forecast D2"],
                            y: [data.values.slice(-1)[0], ...data.forecast],
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Forecast',
                            line: { color: '#10b981', dash: 'dot', width: 3 }
                        }
                    ]}
                    layout={{
                        autosize: true,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#94a3b8' },
                        margin: { l: 40, r: 10, t: 10, b: 40 },
                        xaxis: { showgrid: false },
                        yaxis: { gridcolor: '#334155' },
                        legend: { orientation: 'h', y: -0.2 }
                    }}
                    config={{ displayModeBar: false, responsive: true }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default TrendChart;
