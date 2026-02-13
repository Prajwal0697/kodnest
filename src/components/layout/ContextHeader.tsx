import type { FC, ReactNode } from 'react';

interface ContextHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
}

const ContextHeader: FC<ContextHeaderProps> = ({ title, subtitle, actions }) => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: 'var(--space-4) 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <div>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '32px',
                        marginBottom: 'var(--space-1)'
                    }}>{title}</h1>
                    {subtitle && <p style={{
                        color: 'rgba(17, 17, 17, 0.6)',
                        fontSize: '16px'
                    }}>{subtitle}</p>}
                </div>
                {actions && <div>{actions}</div>}
            </div>
        </div>
    );
};

export default ContextHeader;
