import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LiveTickets from './pages/LiveTickets';
import DigitalTwin from './pages/DigitalTwin';
import Staffing from './pages/Staffing';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex bg-hospital-dark min-h-screen text-slate-100">
        <Sidebar />

        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<LiveTickets />} />
            <Route path="/twin" element={<DigitalTwin />} />
            <Route path="/staffing" element={<Staffing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
