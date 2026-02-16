import type { FC } from 'react';
import type { Job } from '../../types/job';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface JobModalProps {
    job: Job;
    onClose: () => void;
}

const JobModal: FC<JobModalProps> = ({ job, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--bg-color)',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '8px',
                padding: 'var(--space-4)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'rgba(17, 17, 17, 0.4)'
                    }}
                >
                    ×
                </button>

                <div className="mb-3">
                    <Badge variant="default">{job.company}</Badge>
                    <h2 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>{job.title}</h2>
                    <p style={{ color: 'rgba(17, 17, 17, 0.6)', fontSize: '14px' }}>
                        {job.location} • {job.mode} • {job.experience} Exp
                    </p>
                </div>

                <div className="mb-4">
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(17, 17, 17, 0.4)', marginBottom: '8px' }}>
                        Description
                    </h4>
                    <p style={{ lineHeight: 1.7, fontSize: '15px' }}>{job.description}</p>
                </div>

                <div className="mb-4">
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(17, 17, 17, 0.4)', marginBottom: '8px' }}>
                        Required Skills
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{
                                padding: '4px 12px',
                                backgroundColor: 'rgba(17, 17, 17, 0.05)',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-3)' }}>
                    <Button onClick={() => window.open(job.applyUrl, '_blank')} style={{ flex: 1 }}>
                        Apply Now
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
