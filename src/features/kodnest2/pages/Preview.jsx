import React, { useState, useEffect } from 'react';
import ResumePreview from '../components/ResumePreview';
import { Printer, Copy, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { calculateScore } from '../utils/atsScoring';

const STORAGE_KEY = 'resumeBuilderData';

const Preview = () => {
    const [resumeData, setResumeData] = useState(null);
    const [template, setTemplate] = useState('classic');
    const [color, setColor] = useState('hsl(0, 0%, 25%)'); // Default Charcoal
    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState({ score: 0, color: '#ccc', label: 'Estimating...', improvements: [] });

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setResumeData(parsed);
            setTemplate(parsed.template || 'classic');
            setColor(parsed.color || 'hsl(0, 0%, 25%)');
            setScoreData(calculateScore(parsed));
        }
        setLoading(false);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleCopyText = () => {
        if (!resumeData) return;
        const { personalInfo, summary, experience, projects, education, skills } = resumeData;

        let text = `${personalInfo.fullName.toUpperCase()}\n`;
        text += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n\n`;

        if (summary) text += `SUMMARY\n${summary}\n\n`;

        if (experience.length > 0) {
            text += `EXPERIENCE\n`;
            experience.forEach(exp => {
                text += `${exp.title}, ${exp.company} (${exp.duration})\n${exp.description}\n\n`;
            });
        }

        if (projects.length > 0) {
            text += `PROJECTS\n`;
            projects.forEach(proj => {
                text += `${proj.name}\n${proj.description}\n\n`;
            });
        }

        if (Object.keys(skills).length > 0) {
            text += `SKILLS\n`;
            if (skills.technical) text += `Technical: ${skills.technical.join(', ')}\n`;
            if (skills.tools) text += `Tools: ${skills.tools.join(', ')}\n`;
            if (skills.soft) text += `Soft Skills: ${skills.soft.join(', ')}\n`;
        }

        navigator.clipboard.writeText(text);
        alert("Resume copied to clipboard!");
    };

    if (loading) return <div>Loading...</div>;
    if (!resumeData) return <div style={{ padding: '40px', color: 'white' }}>No resume data found. Please go to the Builder first.</div>;

    // Radius for circle progress
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scoreData.score / 100) * circumference;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px',
            backgroundColor: '#525252',
            minHeight: 'calc(100vh - 64px)'
        }}>
            {/* ATS Score Panel (Visible only on screen) */}
            <div className="no-print" style={{
                width: '210mm',
                backgroundColor: '#1A1A1A',
                color: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                display: 'flex',
                gap: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
                {/* Visual Score */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', minWidth: '120px' }}>
                    <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                        {/* Background Circle */}
                        <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                            <circle
                                cx="45" cy="45" r={radius}
                                stroke="#333" strokeWidth="8" fill="transparent"
                            />
                            <circle
                                cx="45" cy="45" r={radius}
                                stroke={scoreData.color} strokeWidth="8" fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700 }}>
                            {scoreData.score}
                        </div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: scoreData.color }}>{scoreData.label}</div>
                </div>

                {/* Improvements */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp size={18} /> ATS Audit Report
                    </h3>

                    {scoreData.improvements.length === 0 ? (
                        <div style={{ color: '#4ade80', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                            <CheckCircle2 size={24} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Perfect Score!</div>
                                <div style={{ fontSize: '13px', opacity: 0.8 }}>Your resume is optimized for ATS parsing.</div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {scoreData.improvements.map((imp, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderLeft: '3px solid #f87171'
                                }}>
                                    <AlertTriangle size={14} color="#f87171" style={{ flexShrink: 0 }} />
                                    {imp}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="no-print" style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>

                <button onClick={handleCopyText} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Copy size={16} /> Copy as Text
                </button>
                <button onClick={handlePrint} className="button-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Printer size={16} /> Print / Save PDF
                </button>
            </div>

            {/* Print Area */}
            <div className="print-area">
                <ResumePreview data={resumeData} template={template} color={color} />
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                    }
                    nav, header, .no-print {
                        display: none !important;
                    }
                    @page {
                        margin: 0;
                        size: auto;
                    }
                }
            `}</style>
        </div>
    );
};

export default Preview;
