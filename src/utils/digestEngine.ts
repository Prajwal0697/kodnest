import type { Job } from '../types/job';
import type { Preferences } from '../types/preferences';
import { calculateMatchScore } from './matchEngine';

export const generateDailyDigest = (jobs: Job[], preferences: Preferences): Job[] => {
    const scoredJobs = jobs.map(job => ({
        ...job,
        matchScore: calculateMatchScore(job, preferences)
    }));

    // Filter by threshold
    const candidates = scoredJobs.filter(job => job.matchScore >= preferences.minMatchScore);

    // Sort: Match Score (DESC), then Posted Age (ASC)
    const sorted = candidates.sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
            return b.matchScore - a.matchScore;
        }
        return a.postedDaysAgo - b.postedDaysAgo;
    });

    return sorted.slice(0, 10);
};

export const getDigestKey = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `jobTrackerDigest_${year}-${month}-${day}`;
};
