import type { Job } from '../types/job';
import type { Preferences } from '../types/preferences';

export const calculateMatchScore = (job: Job, preferences: Preferences): number => {
    let score = 0;

    // 1. Role Keywords in Job Title (+25)
    const titleMatch = preferences.roleKeywords.some(keyword =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
    );
    if (titleMatch) score += 25;

    // 2. Role Keywords in Job Description (+15)
    const descMatch = preferences.roleKeywords.some(keyword =>
        job.description.toLowerCase().includes(keyword.toLowerCase())
    );
    if (descMatch) score += 15;

    // 3. Location Match (+15)
    const locationMatch = preferences.preferredLocations.some(loc =>
        job.location.toLowerCase() === loc.toLowerCase()
    );
    if (locationMatch) score += 15;

    // 4. Mode Match (+10)
    if (preferences.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience Level Match (+10)
    if (job.experience === preferences.experienceLevel) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    const skillsOverlap = job.skills.some(skill =>
        preferences.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    if (skillsOverlap) score += 15;

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source Priority (LinkedIn) (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
};

export const getScoreBadgeVariant = (score: number): 'success' | 'warning' | 'neutral' | 'danger' => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    if (score >= 40) return 'neutral';
    return 'danger'; // Using 'danger' for subtle grey placeholder in my Badge system, or I might need to adjust Badge.tsx
};
