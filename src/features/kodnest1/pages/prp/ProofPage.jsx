import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { CheckCircle2, Circle, Link as LinkIcon, Copy, Award, AlertCircle } from 'lucide-react';

const SUBMISSION_KEY = 'prp_final_submission';
const CHECKLIST_KEY = 'prp_test_checklist';

const STEPS = [
    'Project Setup & Planning',
    'Core Analysis Engine',
    'Interactive Results Page',
    'Company Intel & Round Mapping',
    'Data Hardening & Validation',
    'Test Checklist Implementation',
    'Proof & Submission System',
    'Final Deployment'
];

const ProofPage = () => {
    const [submission, setSubmission] = useState(() => {
        const saved = localStorage.getItem(SUBMISSION_KEY);
        return saved ? JSON.parse(saved) : {
            steps: {},
            lovableLink: '',
            githubLink: '',
            deployedLink: ''
        };
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
    }, [submission]);

    const validateURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleStepToggle = (index) => {
        setSubmission(prev => ({
            ...prev,
            steps: {
                ...prev.steps,
                [index]: !prev.steps[index]
            }
        }));
    };

    const handleURLChange = (field, value) => {
        setSubmission(prev => ({ ...prev, [field]: value }));
        if (value && !validateURL(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Invalid URL format' }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const copySubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovableLink || '[Not provided]'}
GitHub Repository: ${submission.githubLink || '[Not provided]'}
Live Deployment: ${submission.deployedLink || '[Not provided]'}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
        navigator.clipboard.writeText(text);
        alert('Final submission copied to clipboard!');
    };

    // Calculate shipped status
    const stepsComplete = Object.values(submission.steps).filter(Boolean).length === STEPS.length;
    const linksComplete = submission.lovableLink && submission.githubLink && submission.deployedLink &&
        validateURL(submission.lovableLink) && validateURL(submission.githubLink) && validateURL(submission.deployedLink);

    const checklistSaved = localStorage.getItem(CHECKLIST_KEY);
    const checklistComplete = checklistSaved ? Object.values(JSON.parse(checklistSaved)).filter(Boolean).length === 10 : false;

    const isShipped = stepsComplete && linksComplete && checklistComplete;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: isShipped ? 'rgba(34, 197, 94, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--spacing-md)'
                }}>
                    <Award size={32} color={isShipped ? '#22c55e' : 'var(--color-primary)'} />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Proof of Work</h1>
                <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: isShipped ? '#22c55e' : '#f59e0b',
                    color: 'white',
                    marginTop: 'var(--spacing-sm)'
                }}>
                    {isShipped ? '✓ SHIPPED' : 'IN PROGRESS'}
                </div>
            </div>

            {isShipped && (
                <Card style={{ marginBottom: 'var(--spacing-lg)', backgroundColor: 'rgba(34, 197, 94, 0.05)', border: '2px solid #22c55e' }}>
                    <CardContent style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--color-text-main)', fontWeight: 500 }}>
                            You built a real product.<br />
                            Not a tutorial. Not a clone.<br />
                            A structured tool that solves a real problem.
                        </p>
                        <p style={{ fontSize: '1.1rem', marginTop: 'var(--spacing-md)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            This is your proof of work.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Step Completion Overview */}
            <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
                <CardHeader>
                    <CardTitle>Step Completion Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                onClick={() => handleStepToggle(index)}
                                style={{
                                    padding: 'var(--spacing-md)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    backgroundColor: submission.steps[index] ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {submission.steps[index] ? (
                                    <CheckCircle2 size={20} color="var(--color-primary)" />
                                ) : (
                                    <Circle size={20} color="var(--color-text-muted)" />
                                )}
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: submission.steps[index] ? 'var(--color-primary)' : 'inherit'
                                }}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 'var(--spacing-md)', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                        Completed: {Object.values(submission.steps).filter(Boolean).length} / {STEPS.length}
                    </div>
                </CardContent>
            </Card>

            {/* Artifact Links */}
            <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
                <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <LinkIcon size={20} color="var(--color-primary)" />
                        <CardTitle>Artifact Links (Required for Ship Status)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                Lovable Project Link
                            </label>
                            <input
                                type="url"
                                value={submission.lovableLink}
                                onChange={(e) => handleURLChange('lovableLink', e.target.value)}
                                placeholder="https://lovable.dev/projects/..."
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: `1px solid ${errors.lovableLink ? 'var(--color-error)' : 'var(--color-border)'}`,
                                    fontSize: '14px'
                                }}
                            />
                            {errors.lovableLink && (
                                <div style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <AlertCircle size={12} /> {errors.lovableLink}
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                GitHub Repository Link
                            </label>
                            <input
                                type="url"
                                value={submission.githubLink}
                                onChange={(e) => handleURLChange('githubLink', e.target.value)}
                                placeholder="https://github.com/username/repo"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: `1px solid ${errors.githubLink ? 'var(--color-error)' : 'var(--color-border)'}`,
                                    fontSize: '14px'
                                }}
                            />
                            {errors.githubLink && (
                                <div style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <AlertCircle size={12} /> {errors.githubLink}
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                Deployed URL
                            </label>
                            <input
                                type="url"
                                value={submission.deployedLink}
                                onChange={(e) => handleURLChange('deployedLink', e.target.value)}
                                placeholder="https://your-app.surge.sh"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: `1px solid ${errors.deployedLink ? 'var(--color-error)' : 'var(--color-border)'}`,
                                    fontSize: '14px'
                                }}
                            />
                            {errors.deployedLink && (
                                <div style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <AlertCircle size={12} /> {errors.deployedLink}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Status Requirements */}
            <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
                <CardHeader>
                    <CardTitle>Shipped Status Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {stepsComplete ? <CheckCircle2 size={18} color="#22c55e" /> : <Circle size={18} color="var(--color-text-muted)" />}
                            <span style={{ fontSize: '14px' }}>All 8 steps marked completed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {checklistComplete ? <CheckCircle2 size={18} color="#22c55e" /> : <Circle size={18} color="var(--color-text-muted)" />}
                            <span style={{ fontSize: '14px' }}>All 10 checklist items passed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {linksComplete ? <CheckCircle2 size={18} color="#22c55e" /> : <Circle size={18} color="var(--color-text-muted)" />}
                            <span style={{ fontSize: '14px' }}>All 3 proof links provided</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={copySubmission}
                    className="button-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 32px',
                        fontSize: '16px'
                    }}
                >
                    <Copy size={18} /> Copy Final Submission
                </button>
            </div>
        </div>
    );
};

export default ProofPage;
