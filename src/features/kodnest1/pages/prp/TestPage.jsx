import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AlertTriangle, CheckCircle2, RotateCcw, Info } from 'lucide-react';

const CHECKLIST_KEY = 'prp_test_checklist';

const TEST_ITEMS = [
    { id: 'jd_req', label: 'JD required validation works', hint: 'Try submitting the practice form with an empty JD.' },
    { id: 'short_jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a small sentence in the JD box and check for the orange warning.' },
    { id: 'skill_groups', label: 'Skills extraction groups correctly', hint: 'Check if React appears in "Web" and DSA in "Core CS".' },
    { id: 'round_map', label: 'Round mapping changes based on company + skills', hint: 'Compare results for "Amazon" vs a small startup.' },
    { id: 'score_det', label: 'Score calculation is deterministic', hint: 'Ensure same JD always yields the same base score.' },
    { id: 'live_score', label: 'Skill toggles update score live', hint: 'Toggle a skill on/off in Results and watch the % change.' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh the page, and check if it stays toggled.' },
    { id: 'history_sync', label: 'History saves and loads correctly', hint: 'Check the History page after an analysis and reopen it.' },
    { id: 'export_copy', label: 'Export buttons copy the correct content', hint: 'Copy the 7-day plan and paste it into a notepad to verify.' },
    { id: 'console_clean', label: 'No console errors on core pages', hint: 'Open F12 DevTools and check for red error logs.' }
];

const TestPage = () => {
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
    }, [checklist]);

    const handleToggle = (id) => {
        setChecklist(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleReset = () => {
        if (window.confirm('Reset all checklist items?')) {
            setChecklist({});
        }
    };

    const passedCount = Object.values(checklist).filter(Boolean).length;
    const isComplete = passedCount === TEST_ITEMS.length;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Verification Checklist</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    Self-certify the platform before final deployment.
                </p>
            </div>

            <Card style={{ marginBottom: 'var(--spacing-lg)', border: isComplete ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
                <CardContent style={{ padding: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Progress Status
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: isComplete ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
                            Tests Passed: {passedCount} / {TEST_ITEMS.length}
                        </div>
                    </div>
                    {isComplete ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700 }}>
                            <CheckCircle2 size={32} /> Ready to Ship
                        </div>
                    ) : (
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                                <AlertTriangle size={18} /> Fix issues before shipping
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                All 10 tests must be checked to unlock the ship route.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {TEST_ITEMS.map((item) => (
                    <Card key={item.id} style={{ opacity: checklist[item.id] ? 0.8 : 1 }}>
                        <CardContent style={{ padding: 'var(--spacing-md)', display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                            <input
                                type="checkbox"
                                checked={!!checklist[item.id]}
                                onChange={() => handleToggle(item.id)}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    accentColor: 'var(--color-primary)',
                                    marginTop: '4px'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '16px', color: checklist[item.id] ? 'var(--color-primary)' : 'inherit' }}>
                                    {item.label}
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Info size={12} /> {item.hint}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                <button
                    onClick={handleReset}
                    className="button-secondary"
                    style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <RotateCcw size={18} /> Reset checklist
                </button>
                <button
                    onClick={() => window.location.href = '/project1/prp/08-ship'}
                    className="button-primary"
                    style={{ opacity: isComplete ? 1 : 0.5 }}
                >
                    Go to Ship Page
                </button>
            </div>
        </div>
    );
};

export default TestPage;
