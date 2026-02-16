import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, clearHistory } from '../../utils/storage';
import { Card, CardContent } from '../../components/ui/Card';
import { Trash2, ChevronRight, FileSearch, AlertCircle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        try {
            const data = getHistory();
            setHistory(data);
            setError(null);
        } catch (e) {
            setError("Some saved entries couldn't be loaded. Create a new analysis.");
        }
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            clearHistory();
            loadHistory();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)' }}>Analysis History</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Your past job description analyses and readiness scores.</p>
                </div>
                {history.length > 0 && (
                    <button onClick={handleClear} className="button-secondary" style={{ color: 'var(--color-error)' }}>
                        <Trash2 size={18} style={{ marginRight: '8px' }} />
                        Clear History
                    </button>
                )}
            </div>

            {error && (
                <div style={{
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    color: 'var(--color-error)',
                    borderRadius: '4px',
                    marginBottom: 'var(--spacing-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {history.length === 0 ? (
                <Card>
                    <CardContent style={{ padding: 'var(--spacing-xxl)', textAlign: 'center' }}>
                        <FileSearch size={48} color="var(--color-text-muted)" style={{ marginBottom: 'var(--spacing-md)' }} />
                        <h3>No Analyses Found</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                            You haven't analyzed any job descriptions yet.
                        </p>
                        <button onClick={() => navigate('/dashboard/practice')} className="button-primary">
                            Start First Analysis
                        </button>
                    </CardContent>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    {history.map((entry) => (
                        <Card key={entry.id} className="history-card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                            <CardContent
                                onClick={() => navigate(`/dashboard/results?id=${entry.id}`)}
                                style={{
                                    padding: 'var(--spacing-lg)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        fontWeight: 800,
                                        color: 'var(--color-primary)'
                                    }}>
                                        {entry.finalScore}%
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{entry.company || "General Analysis"}</h3>
                                        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                                            {entry.role || "Target Role"} • {new Date(entry.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={20} color="var(--color-text-muted)" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
