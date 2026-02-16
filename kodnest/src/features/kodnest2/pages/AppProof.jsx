import React from 'react';

const AppProof = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '48px auto', padding: '0 24px' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '16px' }}>Project Artifacts</h1>
            <p style={{ color: '#666666', marginBottom: '32px' }}>
                This section tracks the development artifacts and milestones for the core application.
            </p>

            <div style={{
                padding: '32px',
                border: '1px dashed #E0E0E0',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#999'
            }}>
                No artifacts generated yet. Start using the builder to create data.
            </div>
        </div>
    );
};

export default AppProof;
