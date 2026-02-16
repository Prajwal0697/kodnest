import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD } from '../../utils/analysis';
import { saveToHistory } from '../../utils/storage';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { FileText, Building, User, Target, AlertTriangle } from 'lucide-react';

const Practice = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });

    const isShortJD = formData.jdText.length > 0 && formData.jdText.length < 200;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.jdText.length < 10) {
            alert("Please paste a valid Job Description.");
            return;
        }

        setLoading(true);
        // Simulate a brief analysis delay for UX
        setTimeout(() => {
            const analysis = analyzeJD(formData.company, formData.role, formData.jdText);
            saveToHistory(analysis);
            setLoading(false);
            navigate(`/dashboard/results?id=${analysis.id}`);
        }, 1200);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Analyze Job Description</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Paste a JD to get a tailored preparation plan and interview questions.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                        <Card>
                            <CardContent style={{ padding: 'var(--spacing-md)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                    <Building size={16} /> Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent style={{ padding: 'var(--spacing-md)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                    <User size={16} /> Target Role (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Engineer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <FileText size={20} color="var(--color-primary)" />
                                <CardTitle>Job Description Content</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                required
                                value={formData.jdText}
                                onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                                placeholder="Paste the full job description here..."
                                style={{
                                    width: '100%',
                                    minHeight: '250px',
                                    padding: 'var(--spacing-md)',
                                    borderRadius: '4px',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />

                            {isShortJD && (
                                <div style={{
                                    marginTop: 'var(--spacing-md)',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                    border: '1px solid #FF9800',
                                    borderRadius: '4px',
                                    color: '#E65100',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <AlertTriangle size={14} />
                                    This JD is too short to analyze deeply. Paste full JD for better output.
                                </div>
                            )}

                            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="button-primary"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: '12px 24px',
                                        fontSize: '16px'
                                    }}
                                >
                                    {loading ? 'Analyzing...' : (
                                        <>
                                            <Target size={18} />
                                            Analyze Readiness
                                        </>
                                    )}
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
};

export default Practice;
