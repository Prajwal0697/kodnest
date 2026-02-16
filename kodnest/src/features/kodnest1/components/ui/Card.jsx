import React from 'react';

export const Card = ({ children, className = '', style = {} }) => (
    <div
        className={`card ${className}`}
        style={{
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            ...style
        }}
    >
        {children}
    </div>
);

export const CardHeader = ({ children, className = '' }) => (
    <div className={`card-header ${className}`} style={{ marginBottom: 'var(--spacing-md)' }}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`card-title ${className}`} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`card-content ${className}`}>
        {children}
    </div>
);
