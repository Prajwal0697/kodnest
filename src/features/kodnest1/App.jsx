import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Practice from './pages/dashboard/Practice';
import History from './pages/dashboard/History';
import Results from './pages/dashboard/Results';
import { Assessments, Resources, Profile } from './pages/dashboard/Placeholders';
import TestPage from './pages/prp/TestPage';
import ShipPage from './pages/prp/ShipPage';
import ProofPage from './pages/prp/ProofPage';
import './App.css';

function Kodnest1Routes() {
    return (
        <Routes>
            {/* base path will be handled by parent route (/project1/*) */}
            <Route index element={<LandingPage />} />

            <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="practice" element={<Practice />} />
                <Route path="history" element={<History />} />
                <Route path="results" element={<Results />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="prp/07-test" element={<DashboardLayout><TestPage /></DashboardLayout>} />
            <Route path="prp/08-ship" element={<DashboardLayout><ShipPage /></DashboardLayout>} />
            <Route path="prp/proof" element={<DashboardLayout><ProofPage /></DashboardLayout>} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default Kodnest1Routes;
