import type { JobStatus, StatusUpdate } from '../types/status';
import type { Job } from '../types/job';

export const getJobStatus = (jobId: string): JobStatus => {
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    return statuses[jobId] || 'Not Applied';
};

export const updateJobStatus = (job: Job, status: JobStatus): void => {
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    statuses[job.id] = status;
    localStorage.setItem('jobTrackerStatus', JSON.stringify(statuses));

    // Update history
    const history: StatusUpdate[] = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
    const newUpdate: StatusUpdate = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        status,
        timestamp: Date.now()
    };

    // Add to history and keep last 20
    const updatedHistory = [newUpdate, ...history].slice(0, 20);
    localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(updatedHistory));
};

export const getStatusBadgeVariant = (status: JobStatus): 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (status) {
        case 'Applied': return 'info';
        case 'Selected': return 'success';
        case 'Rejected': return 'danger';
        default: return 'neutral';
    }
};
