import React from 'react';

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: 'Not Started' | 'In Progress' | 'Shipped';
}

const TopBar: React.FC<TopBarProps> = ({ projectName, currentStep, totalSteps, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Not Started': return 'var(--text-primary)';
      case 'In Progress': return 'var(--warning-color)';
      case 'Shipped': return 'var(--success-color)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-2) var(--space-3)',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {projectName}
      </div>
      
      <div style={{ fontSize: '14px', color: 'rgba(17, 17, 17, 0.6)' }}>
        Progress: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Step {currentStep} / {totalSteps}</span>
      </div>

      <div style={{
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '100px',
        border: `1px solid ${getStatusColor()}`,
        color: getStatusColor()
      }}>
        {status}
      </div>
    </div>
  );
};

export default TopBar;
