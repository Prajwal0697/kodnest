import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div className="card">
        <h1 style={{ fontSize: '24px', marginBottom: 'var(--spacing-md)' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
            This is a placeholder for the <strong>{title}</strong> page. Content will be added here soon.
        </p>
    </div>
);

export const Assessments = () => <PagePlaceholder title="Skill Assessments" />;
export const Resources = () => <PagePlaceholder title="Learning Resources" />;
export const Profile = () => <PagePlaceholder title="User Profile" />;
