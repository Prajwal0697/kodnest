import React from 'react';

const ContextHeader = ({ title, subtext }) => {
    return (
        <div style={{
            padding: 'var(--spacing-xl) var(--spacing-lg)',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: 'var(--spacing-xs)',
                color: 'var(--color-text-main)'
            }}>
                {title}
            </h1>
            <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '1.1rem'
            }}>
                {subtext}
            </p>
        </div>
    );
};

export default ContextHeader;
