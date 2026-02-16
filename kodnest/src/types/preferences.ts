export interface Preferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredMode: ('Remote' | 'Hybrid' | 'Onsite')[];
    experienceLevel: 'Fresher' | '0-1' | '1-3' | '3-5';
    skills: string[];
    minMatchScore: number;
}
