import type { FC, ReactNode, CSSProperties } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const Badge: FC<BadgeProps> = ({ children, variant = 'default' }) => {
    const variantStyles: Record<string, CSSProperties> = {
        default: { backgroundColor: 'rgba(17, 17, 17, 0.05)', color: 'var(--text-primary)' },
        success: { backgroundColor: 'rgba(46, 125, 50, 0.15)', color: '#2E7D32' },
        warning: { backgroundColor: 'rgba(237, 108, 2, 0.15)', color: '#ED6C02' },
        danger: { backgroundColor: 'rgba(211, 47, 47, 0.15)', color: '#D32F2F' },
        info: { backgroundColor: 'rgba(2, 136, 209, 0.15)', color: '#0288D1' },
        neutral: { backgroundColor: 'rgba(17, 17, 17, 0.05)', color: 'rgba(17, 17, 17, 0.6)' },
    };

    return (
        <span style={{
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            ...variantStyles[variant]
        }}>
            {children}
        </span>
    );
};

export default Badge;
