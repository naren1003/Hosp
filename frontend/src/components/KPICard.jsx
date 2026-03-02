import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, unit, trend, forecast, confidence, data }) => {
    const isPositive = trend >= 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="kpi-card"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <button className="text-slate-500 hover:text-slate-300">
                    <Info size={16} />
                </button>
            </div>

            <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-slate-400 text-sm">{unit}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    <span>{Math.abs(trend)}%</span>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center text-[10px] text-slate-500 uppercase">
                        Forecast: {forecast > 0 ? '+' : ''}{forecast}
                    </div>
                    <div className="text-[10px] text-blue-400 font-semibold">
                        Conf: {confidence}%
                    </div>
                </div>
            </div>

            {/* Mini Sparkline Placeholder */}
            <div className="mt-4 h-8 w-full bg-slate-800/50 rounded overflow-hidden">
                <div className="h-full bg-blue-500/20 flex items-end">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-blue-500/40 border-t border-blue-400"
                            style={{ height: `${20 + Math.random() * 60}%` }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default KPICard;
