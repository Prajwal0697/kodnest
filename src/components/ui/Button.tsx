import type { FC, ButtonHTMLAttributes, CSSProperties } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({ children, variant = 'primary', style, ...props }) => {
    const baseStyle: CSSProperties = {
        padding: '12px 24px',
        fontSize: '14px',
        fontWeight: 600,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 150ms ease-in-out',
        border: 'none',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
    };

    const variantStyles: Record<string, CSSProperties> = {
        primary: {
            backgroundColor: 'var(--text-primary)',
            color: '#FFFFFF',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
        }
    };

    const combinedStyle = { ...baseStyle, ...variantStyles[variant] };

    return (
        <button style={combinedStyle} {...props}>
            {children}
        </button>
    );
};

export default Button;
