import React from 'react';
import ContextHeader from '../layout/ContextHeader';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div>
            <ContextHeader
                title={title}
                subtitle="This section will be built in the next step."
            />
            <div className="container" style={{ padding: 'var(--space-5) var(--space-3)' }}>
                <p style={{ color: 'rgba(17, 17, 17, 0.4)', fontSize: '14px' }}>
                    Placeholder content for {title}.
                </p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
