import React from 'react';

const TopBar = ({ projectName, currentStep, totalSteps, status }) => {
    const statusColors = {
        'Not Started': '#666',
        'In Progress': '#B8860B',
        'Shipped': 'var(--color-success)'
    };

    return (
        <div style={{
            height: '48px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--spacing-lg)',
            fontSize: '14px',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{projectName}</div>

            <div style={{ color: 'var(--color-text-muted)' }}>
                Progress: Step {currentStep} / {totalSteps}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: statusColors[status] || '#ccc'
                }}></span>
                <span style={{ fontWeight: 500 }}>{status}</span>
            </div>
        </div>
    );
};

export default TopBar;
