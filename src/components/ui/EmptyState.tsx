import type { FC, ReactNode } from 'react';

interface EmptyStateProps {
    message: string;
    subtext?: string;
    icon?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({ message, subtext, icon }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-5) var(--space-3)',
            textAlign: 'center',
            minHeight: '400px'
        }}>
            {icon && <div style={{ marginBottom: 'var(--space-3)', opacity: 0.5 }}>{icon}</div>}
            <h3 style={{
                fontSize: '24px',
                marginBottom: 'var(--space-1)',
                fontWeight: 600
            }}>
                {message}
            </h3>
            {subtext && (
                <p style={{
                    fontSize: '16px',
                    color: 'rgba(17, 17, 17, 0.6)',
                    maxWidth: '400px'
                }}>
                    {subtext}
                </p>
            )}
        </div>
    );
};

export default EmptyState;
