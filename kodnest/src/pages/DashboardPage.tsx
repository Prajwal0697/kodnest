import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import ContextHeader from '../components/layout/ContextHeader';
import FilterBar from '../components/ui/FilterBar';
import JobCard from '../components/ui/JobCard';
import EmptyState from '../components/ui/EmptyState';
import { jobs } from '../data/jobs';
import { calculateMatchScore } from '../utils/matchEngine';
import type { Preferences } from '../types/preferences';
import type { Job } from '../types/job';

const DashboardPage: FC = () => {
    const [preferences, setPreferences] = useState<Preferences | null>(null);
    const [statusMap, setStatusMap] = useState<Record<string, string>>({});
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: '',
        sort: 'latest',
        onlyMatches: false
    });

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPreferences(JSON.parse(saved));
        }

        const storedStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        setStatusMap(storedStatuses);
    }, []);

    const savedJobsIds = useMemo(() => {
        return JSON.parse(localStorage.getItem('savedJobs') || '[]');
    }, []);

    const extractSalary = (salaryStr: string): number => {
        const match = salaryStr.match(/(\d+)/);
        if (!match) return 0;
        let val = parseInt(match[1]);
        if (salaryStr.toLowerCase().includes('k/month')) {
            return (val * 12) / 100;
        }
        return val;
    };

    const jobsWithData = useMemo(() => {
        return jobs.map((job: Job) => ({
            ...job,
            matchScore: preferences ? calculateMatchScore(job, preferences) : 0,
            currentStatus: statusMap[job.id] || 'Not Applied'
        }));
    }, [preferences, statusMap]);

    const filteredJobs = useMemo(() => {
        let result = jobsWithData.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.company.toLowerCase().includes(filters.search.toLowerCase());
            const matchesLocation = !filters.location || job.location === filters.location;
            const matchesMode = !filters.mode || job.mode === filters.mode;
            const matchesExp = !filters.experience || job.experience === filters.experience;
            const matchesSource = !filters.source || job.source === filters.source;
            const matchesStatus = !filters.status || job.currentStatus === filters.status;
            const matchesThreshold = !filters.onlyMatches || (preferences && job.matchScore >= preferences.minMatchScore);

            return matchesSearch && matchesLocation && matchesMode && matchesExp && matchesSource && matchesStatus && matchesThreshold;
        });

        if (filters.sort === 'latest') {
            result = [...result].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (filters.sort === 'oldest') {
            result = [...result].sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        } else if (filters.sort === 'score') {
            result = [...result].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else if (filters.sort === 'salary') {
            result = [...result].sort((a, b) => extractSalary(b.salaryRange) - extractSalary(a.salaryRange));
        }

        return result;
    }, [jobsWithData, filters, preferences]);

    const handleStatusChange = () => {
        const storedStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        setStatusMap(storedStatuses);
    };

    return (
        <div>
            <ContextHeader
                title="Job Pipeline"
                subtitle={preferences ? "Intelligent matching active. Showing optimized results." : "Centralized view for your job discovery."}
            />

            {!preferences && (
                <div style={{
                    backgroundColor: 'rgba(211, 47, 47, 0.05)',
                    padding: '12px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'var(--accent-color)',
                    fontWeight: 600,
                    borderBottom: '1px solid rgba(211, 47, 47, 0.1)'
                }}>
                    Set your preferences to activate intelligent matching.
                </div>
            )}

            <div className="container" style={{ padding: 'var(--space-4) var(--space-3)' }}>
                <FilterBar onFilterChange={setFilters} showMatchToggle={!!preferences} />

                {filteredJobs.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: 'var(--space-3)',
                        marginTop: 'var(--space-4)'
                    }}>
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSavedInitially={savedJobsIds.includes(job.id)}
                                matchScore={preferences ? (job as any).matchScore : undefined}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        message={filters.onlyMatches ? "No roles match your threshold." : "No matches found."}
                        subtext={filters.onlyMatches
                            ? "Try lowering your threshold in Settings or adjusting your filters."
                            : "Try adjusting your filters to find more opportunities."
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
