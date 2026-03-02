import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div className="flex-1">
        <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-slate-400 mt-1">This page is currently under development.</p>
        </header>
        <div className="bg-hospital-dark border border-hospital-border rounded-xl p-8 text-center">
            <p className="text-slate-400">Content for {title} will appear here.</p>
        </div>
    </div>
);

export const LiveTickets = () => <PagePlaceholder title="Live Tickets" />;
export const DigitalTwin = () => <PagePlaceholder title="Digital Twin" />;
export const Staffing = () => <PagePlaceholder title="Staffing" />;
export const Reports = () => <PagePlaceholder title="Reports" />;
export const Settings = () => <PagePlaceholder title="Settings" />;
