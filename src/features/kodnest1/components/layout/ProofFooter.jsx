import React from 'react';

const ProofFooter = ({ items }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-xl)',
            zIndex: 100
        }}>
            {items.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    fontSize: '14px',
                    color: item.checked ? 'var(--color-text-main)' : 'var(--color-text-muted)'
                }}>
                    <div style={{
                        width: '18px',
                        height: '18px',
                        border: `1px solid ${item.checked ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.checked ? 'var(--color-primary)' : 'transparent',
                        transition: 'all 0.2s ease'
                    }}>
                        {item.checked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                    </div>
                    <span style={{ fontWeight: item.checked ? 600 : 400 }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default ProofFooter;
