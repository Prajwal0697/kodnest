import React from 'react';

interface WorkspaceLayoutProps {
    primary: React.ReactNode;
    secondary: React.ReactNode;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ primary, secondary }) => {
    return (
        <main style={{
            display: 'flex',
            minHeight: 'calc(100vh - 250px)', // Adjust based on header/footer
            width: '100%'
        }}>
            <div style={{
                width: '70%',
                padding: 'var(--space-4) var(--space-3)',
                borderRight: '1px solid var(--border-color)'
            }}>
                <div className="container" style={{ margin: 0, padding: 0 }}>
                    {primary}
                </div>
            </div>

            <div style={{
                width: '30%',
                padding: 'var(--space-4) var(--space-3)',
                backgroundColor: 'rgba(17, 17, 17, 0.02)'
            }}>
                {secondary}
            </div>
        </main>
    );
};

export default WorkspaceLayout;
