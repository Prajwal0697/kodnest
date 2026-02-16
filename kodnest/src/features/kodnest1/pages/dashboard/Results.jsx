import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getLatestResult, getResultById, updateHistoryEntry } from '../../utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { CheckCircle2, Calendar, MessageSquare, Copy, Download, Zap, Building2, Workflow, Info } from 'lucide-react';

const Results = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const id = searchParams.get('id');
        const result = id ? getResultById(id) : getLatestResult();
        if (!result) {
            navigate('/dashboard/practice');
        } else {
            setData(result);
        }
    }, [searchParams, navigate]);

    const handleToggleSkill = (skill) => {
        if (!data) return;

        const currentField = data.skillConfidenceMap[skill] || 'practice';
        const nextField = currentField === 'know' ? 'practice' : 'know';
        const updatedMap = { ...data.skillConfidenceMap, [skill]: nextField };

        // Update local state by refetching or manual patch
        setData(prev => ({ ...prev, skillConfidenceMap: updatedMap }));

        // Persist to storage
        updateHistoryEntry(data.id, {
            skillConfidenceMap: updatedMap
        });
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied to clipboard!`);
    };

    const downloadTxt = () => {
        if (!data) return;
        const content = `
PLACEMENT READINESS REPORT
Company: ${data.company}
Role: ${data.role}
Readiness Score: ${data.finalScore}%
Created: ${new Date(data.createdAt).toLocaleDateString()}
Last Updated: ${new Date(data.updatedAt).toLocaleDateString()}

COMPANY INTEL:
Industry: ${data.companyIntel?.industry || "N/A"}
Size: ${data.companyIntel?.size || "N/A"}
Hiring Focus: ${data.companyIntel?.hiringFocus || "N/A"}

ROUND MAPPING:
${data.roundMapping?.map((r, i) => `${i + 1}. ${r.roundTitle} (${r.focusAreas.join(', ')})\n   - ${r.whyItMatters}`).join('\n')}

SKILLS DETECTED:
${Object.entries(data.extractedSkills).map(([cat, skills]) => skills.length > 0 ? `${cat}: ${skills.join(', ')}` : null).filter(Boolean).join('\n')}
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.company || 'Analysis'}_Placement_Prep.txt`;
        a.click();
    };

    const weakSkills = useMemo(() => {
        if (!data) return [];
        const allSkills = Object.values(data.extractedSkills).flat();
        return allSkills.filter(s => (data.skillConfidenceMap[s] || 'practice') === 'practice').slice(0, 3);
    }, [data]);

    if (!data) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xxl)' }}>
            {/* Header Summary */}
            <Card style={{ borderLeft: '8px solid var(--color-primary)' }}>
                <CardContent style={{ padding: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xs)' }}>{data.company || "Target Company"}</h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>{data.role || "Target Role"}</p>

                        <div style={{ marginTop: 'var(--spacing-lg)' }}>
                            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                                Interactive Skill Assessment (Self-Analysis)
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                {Object.values(data.extractedSkills).flat().map(skill => {
                                    const isKnow = data.skillConfidenceMap[skill] === 'know';
                                    return (
                                        <button
                                            key={skill}
                                            onClick={() => handleToggleSkill(skill)}
                                            style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                border: '1px solid',
                                                transition: 'all 0.2s ease',
                                                backgroundColor: isKnow ? 'var(--color-primary)' : 'transparent',
                                                color: isKnow ? 'white' : 'var(--color-primary)',
                                                borderColor: 'var(--color-primary)'
                                            }}
                                        >
                                            {skill}: {isKnow ? 'I know this' : 'Need practice'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', minWidth: '150px' }}>
                        <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{data.finalScore}%</div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '4px' }}>Readiness Score</p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-md)', justifyContent: 'center' }}>
                            <button onClick={downloadTxt} className="button-secondary" style={{ padding: '8px', display: 'flex', alignItems: 'center' }} title="Download Report">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Company Intel and Round Mapping */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
                <Card>
                    <CardHeader style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <Building2 size={20} color="var(--color-primary)" />
                        <CardTitle>Company Intel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.companyIntel ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Industry</div>
                                        <div style={{ fontWeight: 600 }}>{data.companyIntel.industry}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Size</div>
                                        <div style={{ fontWeight: 600 }}>{data.companyIntel.size}</div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Typical Hiring Focus</div>
                                    <div style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--color-text-main)' }}>{data.companyIntel.hiringFocus}</div>
                                </div>
                                <div style={{
                                    padding: 'var(--spacing-sm)',
                                    backgroundColor: 'rgba(0,0,0,0.03)',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    color: 'var(--color-text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <Info size={12} />
                                    Demo Mode: Company intel generated heuristically.
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                                    Last synced: {new Date(data.updatedAt).toLocaleString()}
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--color-text-muted)' }}>Enter a company name to see intel.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <Workflow size={20} color="var(--color-primary)" />
                        <CardTitle>Round Mapping Engine</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ position: 'relative', paddingLeft: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>

                            {data.roundMapping?.map((round, idx) => (
                                <div key={idx} style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ position: 'absolute', left: '-26px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', border: '3px solid white' }}></div>
                                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{round.roundTitle}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>Focus: {round.focusAreas.join(', ')}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                                        Why it matters: {round.whyItMatters}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 'var(--spacing-lg)' }}>
                {/* 7-Day Plan */}
                <Card>
                    <CardHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <Calendar size={20} color="var(--color-primary)" />
                            <CardTitle>7-Day Intensive Plan</CardTitle>
                        </div>
                        <button
                            className="button-link"
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                            onClick={() => copyToClipboard(data.plan7Days.map(p => `${p.day}: ${p.focus} - ${p.tasks.join(', ')}`).join('\n'), '7-day plan')}
                        >
                            <Copy size={12} /> Copy 7-day plan
                        </button>
                    </CardHeader>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {data.plan7Days.map((p, i) => (
                                <div key={i} style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    <div style={{ fontWeight: 700, minWidth: '80px', color: 'var(--color-primary)' }}>{p.day}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.focus}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{p.tasks.join(', ')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Checklist */}
                <Card>
                    <CardHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <CheckCircle2 size={20} color="var(--color-primary)" />
                            <CardTitle>Round-wise Checklist</CardTitle>
                        </div>
                        <button
                            className="button-link"
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                            onClick={() => copyToClipboard(data.checklist.map(r => `${r.roundTitle}\n${r.items.join('\n')}`).join('\n\n'), 'Checklist')}
                        >
                            <Copy size={12} /> Copy round checklist
                        </button>
                    </CardHeader>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            {data.checklist.map((round, i) => (
                                <div key={i}>
                                    <h4 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--color-primary)' }}>{round.roundTitle}</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                        {round.items.map((item, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D1D5DB' }}></div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Questions */}
            <Card>
                <CardHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <MessageSquare size={20} color="var(--color-primary)" />
                        <CardTitle>10 Targeted Interview Questions</CardTitle>
                    </div>
                    <button
                        className="button-link"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                        onClick={() => copyToClipboard(data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), 'Questions')}
                    >
                        <Copy size={12} /> Copy 10 questions
                    </button>
                </CardHeader>
                <CardContent>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                        {data.questions.map((q, i) => (
                            <div key={i} style={{ display: 'flex', gap: 'var(--spacing-sm)', padding: 'var(--spacing-md)', backgroundColor: '#F9FAFB', borderRadius: 'var(--border-radius)' }}>
                                <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{i + 1}</span>
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>{q}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Action Next Box */}
            <Card style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px dashed var(--color-primary)' }}>
                <CardContent style={{ padding: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)' }}>Action Next</h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                                {weakSkills.length > 0 ? (
                                    <>Focus on mastering <strong>{weakSkills.join(', ')}</strong> first. </>
                                ) : (
                                    <>Great job! You've marked all core skills as known. </>
                                )}
                                Start Day 1 plan now.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Results;
