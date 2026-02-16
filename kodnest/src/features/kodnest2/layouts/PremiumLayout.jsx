import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { STEPS, getArtifact, saveArtifact, isStepComplete, canAccessStep, getCompletedStepsCount } from '../utils/gatingSystem';
import { CheckCircle2, Circle, ChevronRight, Copy, Upload, AlertCircle } from 'lucide-react';

const PremiumLayout = ({ children, stepId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentStep = STEPS.find(s => s.id === stepId);

    // Redirect if trying to skip steps
    useEffect(() => {
        if (!canAccessStep(stepId)) {
            // Find the furthest accessible step
            let targetStep = 1;
            for (let i = 1; i <= 8; i++) {
                if (canAccessStep(i)) targetStep = i;
                else break;
            }
            const stepRoute = STEPS.find(s => s.id === targetStep).route;
            navigate(`/rb/${stepRoute}`, { replace: true });
        }
    }, [stepId, navigate]);

    const [hasArtifact, setHasArtifact] = useState(isStepComplete(stepId));
    const [promptText, setPromptText] = useState('');

    // Update prompt text based on children props if available, or use a default
    // Note: This relies on the child component passing the prompt via a prop or context
    // For simplicity in this layout, we'll let the child render the content and handles its own prompts
    // But the COPY button is here in the layout. 
    // To make this work cleanly, we can use a ref or state lifted up.
    // For this implementation, we will pass a setPromptText function to children.

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        alert('Prompt copied to clipboard!');
    };

    const handleArtifactUpload = () => {
        // Simulate upload/screenshot for now
        const timestamp = new Date().toISOString();
        saveArtifact(stepId, `screenshot_placeholder_${timestamp}`);
        setHasArtifact(true);
    };

    const handleNext = () => {
        if (stepId < 8) {
            const nextStep = STEPS.find(s => s.id === stepId + 1);
            navigate(`/rb/${nextStep.route}`);
        } else {
            navigate('/rb/proof');
        }
    };

    const completedCount = getCompletedStepsCount();

    // Check for final shipped status stored by ProofPage
    const isShipped = localStorage.getItem('rb_project_status') === 'SHIPPED';

    const progressStatus = isShipped ? 'SHIPPED' : stepId === 8 ? 'FINALIZING' : 'BUILDING';
    const statusColor = isShipped ? '#22c55e' : '#4f46e5';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
            {/* Top Bar */}
            <header style={{
                height: '64px',
                backgroundColor: 'white',
                borderBottom: '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
                    AI Resume Builder
                </div>
                <div style={{ fontWeight: 600, color: '#666666' }}>
                    Project 3 — Step {stepId} of 8
                </div>
                <div style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    backgroundColor: `${statusColor}15`,
                    color: statusColor,
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}>
                    {progressStatus}
                </div>
            </header>

            {/* Context Header */}
            <div style={{
                backgroundColor: 'white',
                padding: '24px 32px',
                borderBottom: '1px solid #E0E0E0'
            }}>
                <h1 style={{ fontSize: '24px', fontFamily: 'Playfair Display, serif', fontWeight: 700, margin: 0 }}>
                    {currentStep.title}
                </h1>
                <p style={{ color: '#666666', marginTop: '8px', fontSize: '14px' }}>
                    Complete this step to unlock the next phase of the project.
                </p>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* Main Workspace (70%) */}
                <div style={{ flex: '0 0 70%', padding: '32px', overflowY: 'auto' }}>
                    {React.cloneElement(children, { setPromptText })}
                </div>

                {/* Secondary Build Panel (30%) */}
                <div style={{
                    flex: '0 0 30%',
                    backgroundColor: 'white',
                    borderLeft: '1px solid #E0E0E0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Copy size={18} /> Copy This Into Lovable
                        </h3>
                        <textarea
                            readOnly
                            value={promptText}
                            style={{
                                width: '100%',
                                height: '200px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #E0E0E0',
                                backgroundColor: '#F5F5F5',
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                resize: 'none',
                                marginBottom: '12px'
                            }}
                            placeholder="Prompt will appear here..."
                        />
                        <button
                            onClick={handleCopy}
                            className="button-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            <Copy size={16} /> Copy Prompt
                        </button>
                    </div>

                    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F0F9FF', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0369A1', marginBottom: '8px' }}>
                            Build in Lovable
                        </h3>
                        <p style={{ fontSize: '12px', color: '#0C4A6E', marginBottom: '12px' }}>
                            Open Lovable in a new tab and paste the prompt to generate your interface.
                        </p>
                        <a
                            href="https://lovable.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-secondary"
                            style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', fontSize: '13px' }}
                        >
                            Open Lovable ↗
                        </a>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                            Validation
                        </h3>

                        {!hasArtifact ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button
                                    onClick={() => alert('Check the error logs in Lovable.')}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #EF4444',
                                        color: '#EF4444',
                                        backgroundColor: 'white',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    It Errored
                                </button>
                                <button
                                    onClick={handleArtifactUpload}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #22c55e',
                                        color: '#22c55e',
                                        backgroundColor: 'white',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <Upload size={16} /> It Worked (Add Screenshot)
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                padding: '16px',
                                backgroundColor: '#F0FDF4',
                                border: '1px solid #BBF7D0',
                                borderRadius: '8px',
                                color: '#15803D',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}>
                                <CheckCircle2 size={20} />
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Step Completed</span>
                            </div>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={!hasArtifact}
                            className="button-primary"
                            style={{
                                width: '100%',
                                marginTop: '16px',
                                opacity: hasArtifact ? 1 : 0.5,
                                cursor: hasArtifact ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            Next Step <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Proof Footer */}
            <footer style={{
                height: '48px',
                backgroundColor: 'white',
                borderTop: '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'center',
                padding: '0 32px',
                gap: '8px'
            }}>
                <span style={{ fontSize: '13px', color: '#666666' }}>Progress:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {STEPS.map(step => (
                        <div
                            key={step.id}
                            style={{
                                width: '24px',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: isStepComplete(step.id) ? '#22c55e' : step.id === stepId ? '#4f46e5' : '#E0E0E0'
                            }}
                        />
                    ))}
                </div>
                <div style={{ flex: 1 }}></div>
                <a href="/rb/proof" style={{ textDecoration: 'none', color: '#4f46e5', fontSize: '13px', fontWeight: 600 }}>
                    View Proof of Work →
                </a>
            </footer>
        </div>
    );
};

export default PremiumLayout;
