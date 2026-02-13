import type { FC, ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card: FC<CardProps> = ({ children, style, ...props }) => {
    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: 'var(--space-3)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
            ...style
        }} {...props}>
            {children}
        </div>
    );
};

export default Card;
