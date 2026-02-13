import { useState, useEffect } from 'react';
import type { FC } from 'react';
import ContextHeader from '../components/layout/ContextHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const testItems = [
    { id: 'prefs', label: 'Preferences persist after refresh', how: 'Set preferences, refresh, and check if Settings inputs are filled.' },
    { id: 'score', label: 'Match score calculates correctly', how: 'Verify a job matching your criteria has a high score (>70%).' },
    { id: 'toggle', label: '"Show only matches" toggle works', how: 'Enable the toggle and verify only high-score jobs are visible.' },
    { id: 'save', label: 'Save job persists after refresh', how: 'Save a job, refresh, and verify it stays in the Saved page.' },
    { id: 'apply', label: 'Apply opens in new tab', how: 'Click Apply and verify it opens an external link in a new tab.' },
    { id: 'statusPersist', label: 'Status update persists after refresh', how: 'Change status (e.g., Applied), refresh, and confirm badge color.' },
    { id: 'statusFilter', label: 'Status filter works correctly', how: 'Filter by "Applied" and confirm the results.' },
    { id: 'digestTop10', label: 'Digest generates top 10 by score', how: 'Click Generate Digest and confirm it picks high-score roles.' },
    { id: 'digestPersist', label: 'Digest persists for the day', how: 'Generate a digest, refresh, and confirm it remains visible.' },
    { id: 'noConsole', label: 'No console errors on main pages', how: 'Open DevTools (F12) and browse. Ensure no red errors appear.' },
];

const milestones = [
    { name: 'Base Design System', status: 'Completed' },
    { name: 'Navigation & Routing', status: 'Completed' },
    { name: 'Intelligent Match Engine', status: 'Completed' },
    { name: 'Daily Digest System', status: 'Completed' },
    { name: 'Persistence Logic', status: 'Completed' },
    { name: 'Status Tracking UI', status: 'Completed' },
    { name: 'Verification Gates', status: 'Completed' },
    { name: 'Shipping Lock', status: 'Completed' },
];

const ProofPage: FC = () => {
    const [checklist, setChecklist] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            setChecklist(JSON.parse(saved));
        }
    }, []);

    const handleToggle = (id: string) => {
        const updated = { ...checklist, [id]: !checklist[id] };
        setChecklist(updated);
        localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(updated));
    };

    const handleReset = () => {
        if (window.confirm('Clear all test results?')) {
            setChecklist({});
            localStorage.removeItem('jobTrackerTestChecklist');
        }
    };

    const passedCount = Object.values(checklist).filter(v => v).length;
    const isAllPassed = passedCount === 10;

    return (
        <div>
            <ContextHeader title="Verification Center" subtitle="Complete quality checks to unlock shipping." />

            <div className="container" style={{ padding: 'var(--space-4) var(--space-3)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 'var(--space-4)', maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Main Checklist */}
                    <div>
                        <Card style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(17,17,17,0.4)', marginBottom: '4px' }}>Quality Gate</div>
                                    <h3 style={{ fontSize: '20px' }}>Tests Passed: {passedCount} / 10</h3>
                                </div>
                                <Button variant="secondary" onClick={handleReset} style={{ fontSize: '12px', padding: '6px 12px' }}>Reset</Button>
                            </div>

                            {!isAllPassed && (
                                <div style={{ marginTop: '16px', padding: '12px', borderRadius: '4px', backgroundColor: 'rgba(211, 47, 47, 0.05)', color: 'var(--accent-color)', fontSize: '13px', fontWeight: 600 }}>
                                    ⚠️ Resolve all issues before shipping.
                                </div>
                            )}
                            {isAllPassed && (
                                <div style={{ marginTop: '16px', padding: '12px', borderRadius: '4px', backgroundColor: 'rgba(46, 125, 50, 0.05)', color: '#2E7D32', fontSize: '13px', fontWeight: 600 }}>
                                    ✅ All checks passed. Route /jt/08-ship is now active.
                                </div>
                            )}
                        </Card>

                        <Card style={{ padding: 0 }}>
                            {testItems.map((item, idx) => (
                                <div key={item.id} style={{
                                    padding: '16px',
                                    borderBottom: idx === testItems.length - 1 ? 'none' : '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={!!checklist[item.id]}
                                        onChange={() => handleToggle(item.id)}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '15px', fontWeight: 600, color: !!checklist[item.id] ? 'rgba(17,17,17,0.4)' : 'var(--text-primary)', textDecoration: !!checklist[item.id] ? 'line-through' : 'none' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'rgba(17,17,17,0.4)', marginTop: '2px' }}>
                                            {item.how}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>

                    {/* Milestone Sidebar */}
                    <div>
                        <Card style={{ padding: 'var(--space-4)' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: 'var(--space-3)' }}>Project Milestones</h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {milestones.map((m, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{m.name}</span>
                                        <Badge variant="success">{m.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                </div>

                <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
                    <Button
                        disabled={!isAllPassed}
                        onClick={() => window.location.href = '/jt/08-ship'}
                        style={{ padding: '12px 48px' }}
                    >
                        Proceed to Ship
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
