import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Lock, Ship, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CHECKLIST_KEY = 'prp_test_checklist';

const ShipPage = () => {
    const navigate = useNavigate();
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_KEY);
        if (saved) {
            const checklist = JSON.parse(saved);
            const passedCount = Object.values(checklist).filter(Boolean).length;
            setIsUnlocked(passedCount === 10);
        }
    }, []);

    if (!isUnlocked) {
        return (
            <div style={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-xl)'
            }}>
                <Card style={{ maxWidth: '500px', textAlign: 'center', border: '2px dashed var(--color-error)' }}>
                    <CardContent style={{ padding: 'var(--spacing-xxl)' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto var(--spacing-lg)'
                        }}>
                            <Lock size={40} color="var(--color-error)" />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--spacing-md)' }}>Shipping Route Locked</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)' }}>
                            You must complete all 10 items in the verification checklist before the deployment manifesto can be generated.
                        </p>
                        <button
                            onClick={() => navigate('/prp/07-test')}
                            className="button-primary"
                            style={{ backgroundColor: 'var(--color-error)' }}
                        >
                            Return to Checklist
                        </button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--spacing-md)'
                }}>
                    <Ship size={32} color="var(--color-primary)" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Ship Deployment</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    All tests passed. System is ready for production rollout.
                </p>
            </div>

            <Card style={{ borderLeft: '8px solid var(--color-primary)' }}>
                <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <CheckCircle2 size={24} color="var(--color-primary)" />
                        <CardTitle>Deployment Manifesto</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Status</div>
                            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>VERIFIED & CRYSTAL CLEAR</div>
                        </div>
                        <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Engine</div>
                            <div style={{ fontWeight: 600 }}>Heuristic JD Parser v2.1</div>
                        </div>
                        <div style={{ padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Data Safety</div>
                            <div style={{ fontWeight: 600 }}>Zero External API Calls • 100% LocalStorage</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={() => window.print()}
                            className="button-primary"
                            style={{ padding: '12px 48px', fontSize: '16px' }}
                        >
                            Generate Final Manifesto
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                <AlertCircle size={16} /> Checklist cleared on {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default ShipPage;
