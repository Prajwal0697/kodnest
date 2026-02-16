import React from 'react';

interface ProofItem {
    label: string;
    checked: boolean;
}

const ProofFooter: React.FC = () => {
    const items: ProofItem[] = [
        { label: 'UI Built', checked: false },
        { label: 'Logic Working', checked: false },
        { label: 'Test Passed', checked: false },
        { label: 'Deployed', checked: false },
    ];

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            zIndex: 100
        }}>
            {items.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    fontSize: '14px',
                    fontWeight: 500
                }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid var(--text-primary)',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {item.checked && '✓'}
                    </div>
                    <span>{item.label}</span>
                </div>
            ))}
        </footer>
    );
};

export default ProofFooter;
