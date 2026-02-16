import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const LandingPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            padding: 'var(--space-5) var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '80vh'
        }}>
            <h1 style={{
                fontSize: '64px',
                marginBottom: 'var(--space-2)',
                lineHeight: 1.1
            }}>
                Stop Missing The Right Jobs.
            </h1>
            <p style={{
                fontSize: '20px',
                color: 'rgba(17, 17, 17, 0.6)',
                marginBottom: 'var(--space-4)',
                maxWidth: '600px'
            }}>
                Precision-matched job discovery delivered daily at 9AM. Consistent, calm, and professional.
            </p>
            <Button onClick={() => navigate('/settings')} style={{ padding: '16px 40px', fontSize: '16px' }}>
                Start Tracking
            </Button>
        </div>
    );
};

export default LandingPage;
