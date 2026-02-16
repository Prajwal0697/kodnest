import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import ContextHeader from '../components/layout/ContextHeader';
import JobCard from '../components/ui/JobCard';
import EmptyState from '../components/ui/EmptyState';
import { jobs } from '../data/jobs';
import { calculateMatchScore } from '../utils/matchEngine';
import type { Preferences } from '../types/preferences';

const SavedPage: FC = () => {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [preferences, setPreferences] = useState<Preferences | null>(null);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedIds(ids);

        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const savedJobsWithScores = useMemo(() => {
        return jobs
            .filter(job => savedIds.includes(job.id))
            .map(job => ({
                ...job,
                matchScore: preferences ? calculateMatchScore(job, preferences) : 0
            }));
    }, [savedIds, preferences]);

    const handleSaveToggle = (jobId: string, isSaved: boolean) => {
        if (!isSaved) {
            setSavedIds(prev => prev.filter(id => id !== jobId));
        }
    };

    return (
        <div>
            <ContextHeader
                title="Saved Items"
                subtitle="Your collection of high-interest job opportunities."
            />
            <div className="container" style={{ padding: 'var(--space-4) var(--space-3)' }}>
                {savedJobsWithScores.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: 'var(--space-3)',
                        marginTop: 'var(--space-4)'
                    }}>
                        {savedJobsWithScores.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSavedInitially={true}
                                onSaveToggle={handleSaveToggle}
                                matchScore={preferences ? job.matchScore : undefined}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message="Your vault is empty."
                        subtext="When you find an opportunity you'd like to revisit, it will appear here."
                    />
                )}
            </div>
        </div>
    );
};

export default SavedPage;
