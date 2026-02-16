import { useEffect } from 'react';
import type { FC } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#111111',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '40px',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }} />
            {message}
        </div>
    );
};

export default Toast;
