import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: FC<InputProps> = ({ label, style, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-2)', width: '100%' }}>
            {label && <label style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(17, 17, 17, 0.6)',
                textTransform: 'uppercase'
            }}>{label}</label>}
            <input
                style={{
                    padding: '12px 16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    fontSize: '14px',
                    transition: 'border-color 150ms ease-in-out',
                    ...style
                }}
                {...props}
            />
        </div>
    );
};

export default Input;
