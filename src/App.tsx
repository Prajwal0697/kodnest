import type { FC, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import ProofFooter from './components/layout/ProofFooter';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import ProofPage from './pages/ProofPage';
import ShipPage from './pages/ShipPage';
import Kodnest1Page from './features/kodnest1/Kodnest1Page';
import Kodnest2Page from './features/kodnest2/Kodnest2Page';

const ProtectedShipRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const saved = localStorage.getItem('jobTrackerTestChecklist');
  let isAllPassed = false;
  if (saved) {
    const checklist = JSON.parse(saved);
    const count = Object.values(checklist).filter(v => v).length;
    isAllPassed = count === 10;
  }

  return isAllPassed ? children : <Navigate to="/jt/07-test" replace />;
};

const App: FC = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/digest" element={<DigestPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* feature routes */}
            <Route path="/project1/*" element={<Kodnest1Page />} />
            <Route path="/project2/*" element={<Kodnest2Page />} />
            {/* New JT routes mapping */}
            <Route path="/jt/07-test" element={<ProofPage />} />
            <Route path="/proof" element={<Navigate to="/jt/07-test" replace />} />

            <Route path="/jt/08-ship" element={
              <ProtectedShipRoute>
                <ShipPage />
              </ProtectedShipRoute>
            } />
          </Routes>
        </main>

        <ProofFooter />
      </div>
    </Router>
  );
};

export default App;
