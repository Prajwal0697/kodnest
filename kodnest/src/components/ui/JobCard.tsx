import { useState, useEffect } from 'react';
import type { MouseEvent, FC, ChangeEvent } from 'react';
import type { Job } from '../../types/job';
import type { JobStatus } from '../../types/status';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import JobModal from './JobModal';
import Toast from './Toast';
import { getScoreBadgeVariant } from '../../utils/matchEngine';
import { getJobStatus, updateJobStatus, getStatusBadgeVariant } from '../../utils/statusTracker';

interface JobCardProps {
    job: Job;
    isSavedInitially?: boolean;
    onSaveToggle?: (jobId: string, isSaved: boolean) => void;
    matchScore?: number;
    onStatusChange?: (jobId: string, status: JobStatus) => void;
}

const JobCard: FC<JobCardProps> = ({ job, isSavedInitially = false, onSaveToggle, matchScore, onStatusChange }) => {
    const [isSaved, setIsSaved] = useState(isSavedInitially);
    const [status, setStatus] = useState<JobStatus>('Not Applied');
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        setStatus(getJobStatus(job.id));
    }, [job.id]);

    const handleSave = (e: MouseEvent) => {
        e.stopPropagation();
        const newState = !isSaved;
        setIsSaved(newState);

        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        if (newState) {
            if (!savedJobs.includes(job.id)) {
                savedJobs.push(job.id);
            }
        } else {
            const index = savedJobs.indexOf(job.id);
            if (index > -1) {
                savedJobs.splice(index, 1);
            }
        }
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));

        if (onSaveToggle) onSaveToggle(job.id, newState);
    };

    const handleStatusUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const newStatus = e.target.value as JobStatus;
        setStatus(newStatus);
        updateJobStatus(job, newStatus);
        setToastMessage(`Status updated: ${newStatus}`);
        if (onStatusChange) onStatusChange(job.id, newStatus);
    };

    return (
        <>
            <Card style={{
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
            }}
                className="job-card-hover"
                onClick={() => setShowModal(true)}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                        <div style={{ fontSize: '12px', color: 'rgba(17, 17, 17, 0.5)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {job.company}
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
                            {matchScore !== undefined && (
                                <Badge variant={getScoreBadgeVariant(matchScore)}>
                                    {matchScore}% Match
                                </Badge>
                            )}
                            <Badge variant={job.source === 'LinkedIn' ? 'default' : 'warning'}>{job.source}</Badge>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '17px', marginBottom: '8px', lineHeight: 1.3 }}>{job.title}</h3>

                    <div style={{ fontSize: '13px', color: 'rgba(17, 17, 17, 0.6)', marginBottom: 'var(--space-2)' }}>
                        {job.location} • {job.mode} • {job.experience} Exp
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-color)', marginBottom: 'var(--space-2)' }}>
                        {job.salaryRange}
                    </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(17, 17, 17, 0.4)' }}>
                            Posted {job.postedDaysAgo === 0 ? 'today' : `${job.postedDaysAgo} days ago`}
                        </div>
                        <select
                            value={status}
                            onChange={handleStatusUpdate}
                            onClick={e => e.stopPropagation()}
                            style={{
                                fontSize: '11px',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: '#FFFFFF',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                        <Button style={{ flex: 1, padding: '6px 8px', fontSize: '12px' }} onClick={() => setShowModal(true)}>
                            View
                        </Button>
                        <Button
                            variant="secondary"
                            style={{
                                padding: '6px 8px',
                                fontSize: '12px',
                                border: isSaved ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                                color: isSaved ? 'var(--accent-color)' : 'var(--text-primary)',
                                backgroundColor: isSaved ? 'rgba(211, 47, 47, 0.05)' : 'transparent'
                            }}
                            onClick={handleSave}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </Button>
                        <Button variant="secondary" style={{ padding: '6px 8px', fontSize: '12px' }} onClick={() => window.open(job.applyUrl, '_blank')}>
                            Apply
                        </Button>
                    </div>
                </div>
            </Card>

            {showModal && <JobModal job={job} onClose={() => setShowModal(false)} />}
            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
        </>
    );
};

export default JobCard;
