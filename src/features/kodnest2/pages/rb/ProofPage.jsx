import React, { useState, useEffect } from 'react';
import PremiumLayout from '../../layouts/PremiumLayout';
import { STEPS, isStepComplete } from '../../utils/gatingSystem';
import { CheckCircle2, Circle, ExternalLink, Copy, ShieldCheck, AlertCircle, Award } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

const ProofPage = () => {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [shipped, setShipped] = useState(false);
    const [stepStatus, setStepStatus] = useState([]);

    useEffect(() => {
        // Load saved links
        const saved = localStorage.getItem('rb_final_submission');
        if (saved) {
            setLinks(JSON.parse(saved));
        }

        // Check steps
        const status = STEPS.map(step => ({
            ...step,
            completed: isStepComplete(step.id)
        }));
        setStepStatus(status);
    }, []);

    useEffect(() => {
        // Store links
        localStorage.setItem('rb_final_submission', JSON.stringify(links));

        // Calculate Shipped Status
        const allStepsDone = STEPS.every(s => isStepComplete(s.id));
        const allLinksPresent = links.lovable && links.github && links.deployed; // Basic validation
        const isShipped = allStepsDone && allLinksPresent;

        setShipped(isShipped);

        // Update global status for Layout (optional hack if context not used)
        if (isShipped) {
            localStorage.setItem('rb_project_status', 'SHIPPED');
        } else {
            localStorage.removeItem('rb_project_status');
        }

    }, [links]);

    const handleCopySubmission = () => {
        const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
        `.trim();

        navigator.clipboard.writeText(text);
        alert("Final Submission copied to clipboard!");
    };

    return (
        <PremiumLayout stepId={8}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* 1. COMPLETION MESSAGE */}
                {shipped && (
                    <div style={{
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        borderRadius: '12px',
                        padding: '32px',
                        marginBottom: '32px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{
                            width: '64px', height: '64px', backgroundColor: '#DCFCE7', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                        }}>
                            <Award size={32} color="#15803D" />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#14532D', marginBottom: '8px' }}>
                            Project 3 Shipped Successfully.
                        </h2>
                        <p style={{ color: '#166534' }}>
                            All systems operational. Your AI Resume Builder is live.
                        </p>
                    </div>
                )}

                {/* 2. STEP COMPLETION OVERVIEW */}
                <Card style={{ marginBottom: '24px' }}>
                    <CardContent style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck size={20} /> Development Checklist
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {stepStatus.map(step => (
                                <div key={step.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '12px', borderRadius: '8px',
                                    backgroundColor: step.completed ? '#F9F9F9' : 'white',
                                    border: '1px solid #E5E5E5',
                                    opacity: step.completed ? 1 : 0.6
                                }}>
                                    {step.completed ? <CheckCircle2 size={20} color="#22c55e" /> : <Circle size={20} color="#ccc" />}
                                    <span style={{ fontSize: '14px', fontWeight: step.completed ? 600 : 400, color: step.completed ? '#111' : '#666' }}>
                                        {step.id}. {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 3. ARTIFACT COLLECTION */}
                <Card style={{ marginBottom: '24px' }}>
                    <CardContent style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Final Deployment Manifest</h3>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
                            Provide the links to your deployed artifacts to finalize the project.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Lovable */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Lovable Project Link</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={links.lovable}
                                        onChange={(e) => setLinks({ ...links, lovable: e.target.value })}
                                        placeholder="https://lovable.dev/..."
                                        style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '6px', border: '1px solid #ddd' }}
                                    />
                                    <ExternalLink size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                                </div>
                            </div>

                            {/* GitHub */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>GitHub Repository</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={links.github}
                                        onChange={(e) => setLinks({ ...links, github: e.target.value })}
                                        placeholder="https://github.com/..."
                                        style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '6px', border: '1px solid #ddd' }}
                                    />
                                    <ExternalLink size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                                </div>
                            </div>

                            {/* Deployed */}
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Live Deployment URL</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={links.deployed}
                                        onChange={(e) => setLinks({ ...links, deployed: e.target.value })}
                                        placeholder="https://....surge.sh"
                                        style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '6px', border: '1px solid #ddd' }}
                                    />
                                    <ExternalLink size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                {/* 4. FINAL EXPORT */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleCopySubmission}
                        className="button-primary"
                        style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}
                    >
                        <Copy size={20} /> Copy Final Submission
                    </button>
                </div>

                {!shipped && (
                    <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <AlertCircle size={14} /> Complete all steps and provide links to mark as Shipped.
                    </p>
                )}

            </div>
        </PremiumLayout>
    );
};

export default ProofPage;
