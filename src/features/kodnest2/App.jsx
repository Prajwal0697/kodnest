import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PremiumLayout from './layouts/PremiumLayout';
import AppLayout from './layouts/AppLayout';

// App Pages
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import AppProof from './pages/AppProof';

// Build Track Pages
import ProofPage from './pages/rb/ProofPage';
import Step01Problem from './pages/rb/Step01Problem';
import Step02Market from './pages/rb/Step02Market';
import Step03Architecture from './pages/rb/Step03Architecture';
import Step04HLD from './pages/rb/Step04HLD';
import Step05LLD from './pages/rb/Step05LLD';
import Step06Build from './pages/rb/Step06Build';
import Step07Test from './pages/rb/Step07Test';
import Step08Ship from './pages/rb/Step08Ship';

function Kodnest2Routes() {
    return (
        <Routes>
            {/* core application; parent route will supply base path */}
            <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="builder" element={<Builder />} />
                <Route path="preview" element={<Preview />} />
                <Route path="proof" element={<AppProof />} />
            </Route>

            {/* Build Track Routes */}
            <Route path="rb/01-problem" element={<PremiumLayout stepId={1}><Step01Problem /></PremiumLayout>} />
            <Route path="rb/02-market" element={<PremiumLayout stepId={2}><Step02Market /></PremiumLayout>} />
            <Route path="rb/03-architecture" element={<PremiumLayout stepId={3}><Step03Architecture /></PremiumLayout>} />
            <Route path="rb/04-hld" element={<PremiumLayout stepId={4}><Step04HLD /></PremiumLayout>} />
            <Route path="rb/05-lld" element={<PremiumLayout stepId={5}><Step05LLD /></PremiumLayout>} />
            <Route path="rb/06-build" element={<PremiumLayout stepId={6}><Step06Build /></PremiumLayout>} />
            <Route path="rb/07-test" element={<PremiumLayout stepId={7}><Step07Test /></PremiumLayout>} />
            <Route path="rb/08-ship" element={<PremiumLayout stepId={8}><Step08Ship /></PremiumLayout>} />

            {/* Build Track Proof Page */}
            <Route path="rb/proof" element={<ProofPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default Kodnest2Routes;