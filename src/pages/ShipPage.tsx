import { useState, useEffect } from 'react';
import type { FC, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextHeader from '../components/layout/ContextHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Toast from '../components/ui/Toast';

type ProjectStatus = 'Not Started' | 'In Progress' | 'Shipped';

const ShipPage: FC = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<ProjectStatus>('In Progress');
    const [links, setLinks] = useState({ live: '', source: '', docs: '' });
    const [isTestPassed, setIsTestPassed] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        const savedLinks = localStorage.getItem('jobTrackerProjectLinks');
        if (savedLinks) {
            const parsed = JSON.parse(savedLinks);
            setLinks({
                live: parsed.live || parsed.lovable || '',
                source: parsed.source || parsed.github || '',
                docs: parsed.docs || parsed.deployed || ''
            });
        }

        const savedStatus = localStorage.getItem('jobTrackerProjectStatus') as ProjectStatus;
        if (savedStatus) setStatus(savedStatus);

        const savedTests = localStorage.getItem('jobTrackerTestChecklist');
        if (savedTests) {
            const checklist = JSON.parse(savedTests);
            const count = Object.values(checklist).filter((v: any) => v).length;
            setIsTestPassed(count === 10);
        }
    }, []);

    const isValidUrl = (url: string) => {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    const handleLinkChange = (key: keyof typeof links, value: string) => {
        const updatedLinks = { ...links, [key]: value };
        setLinks(updatedLinks);
        localStorage.setItem('jobTrackerProjectLinks', JSON.stringify(updatedLinks));
    };

    const handleShip = () => {
        const isValid = isTestPassed &&
            isValidUrl(links.live) &&
            isValidUrl(links.source) &&
            isValidUrl(links.docs);

        if (!isValid) return;

        setStatus('Shipped');
        localStorage.setItem('jobTrackerProjectStatus', 'Shipped');
        setToast('Project 1 Shipped Successfully.');
    };

    const handleCopySubmission = () => {
        const text = `PROJECT 1 SUBMISSION\n--------------------\nLive Demo: ${links.live}\nSource Code: ${links.source}\nDocumentation: ${links.docs}\nStatus: ${status}\nVerification: 10/10 Tests Passed`;
        navigator.clipboard.writeText(text);
        setToast('Final Submission copied to clipboard.');
    };

    const isValidationMet = isTestPassed &&
        isValidUrl(links.live) &&
        isValidUrl(links.source) &&
        isValidUrl(links.docs);

    const getStatusVariant = (s: ProjectStatus): "success" | "warning" | "neutral" => {
        if (s === 'Shipped') return 'success';
        if (s === 'In Progress') return 'warning';
        return 'neutral';
    };

    const labelStyle: CSSProperties = {
        display: 'block',
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'rgba(17,17,17,0.4)',
        marginBottom: '6px'
    };

    const isUrlInvalid = (url: string) => url.length > 0 && !isValidUrl(url);

    return (
        <div>
            <ContextHeader title="Product Launch" subtitle="Final validation and distribution." />

            <div className="container" style={{ padding: 'var(--space-6) var(--space-3)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>

                    <Card style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={labelStyle}>Project 1 Status</div>
                            <Badge variant={getStatusVariant(status)}>{status}</Badge>
                        </div>
                        {status === 'Shipped' && (
                            <div style={{ color: '#2E7D32', fontWeight: 600, fontSize: '14px' }}>
                                Project 1 Shipped Successfully.
                            </div>
                        )}
                    </Card>

                    <Card style={{ padding: 'var(--space-6)' }}>
                        <h3 style={{ fontSize: '24px', marginBottom: 'var(--space-6)', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>Deployment Manifesto</h3>

                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>LIVE DEMO LINK</label>
                                <input
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: isUrlInvalid(links.live) ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        backgroundColor: isUrlInvalid(links.live) ? 'rgba(211, 47, 47, 0.02)' : '#FFFFFF'
                                    }}
                                    value={links.live}
                                    onChange={e => handleLinkChange('live', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>SOURCE CODE LINK</label>
                                <input
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: isUrlInvalid(links.source) ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        backgroundColor: isUrlInvalid(links.source) ? 'rgba(211, 47, 47, 0.02)' : '#FFFFFF'
                                    }}
                                    value={links.source}
                                    onChange={e => handleLinkChange('source', e.target.value)}
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>DOCUMENTATION LINK</label>
                                <input
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: isUrlInvalid(links.docs) ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        backgroundColor: isUrlInvalid(links.docs) ? 'rgba(211, 47, 47, 0.02)' : '#FFFFFF'
                                    }}
                                    value={links.docs}
                                    onChange={e => handleLinkChange('docs', e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {!isTestPassed && (
                            <div style={{ padding: '12px', backgroundColor: 'rgba(211, 47, 47, 0.05)', borderRadius: '6px', color: 'var(--accent-color)', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                                ⚠️ Quality Gateway: 10/10 tests required. Return to Verification Center.
                            </div>
                        )}

                        <div style={{ display: 'grid', gap: '12px' }}>
                            <Button
                                disabled={!isValidationMet || status === 'Shipped'}
                                onClick={handleShip}
                                style={{ padding: '12px' }}
                            >
                                {status === 'Shipped' ? 'Project Shipped' : 'Ship Project'}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleCopySubmission}
                                disabled={status !== 'Shipped'}
                                style={{ padding: '12px' }}
                            >
                                Copy Final Submission
                            </Button>
                        </div>
                    </Card>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                        <Button variant="secondary" onClick={() => navigate('/jt/07-test')}>
                            ← Back to Verification
                        </Button>
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
};

export default ShipPage;
