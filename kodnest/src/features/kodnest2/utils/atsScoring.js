
const ACTION_VERBS = [
    'built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated',
    'managed', 'orchestrated', 'engineered', 'formulated', 'spearheaded', 'conceptualized', 'initiated',
    'revamped', 'modernized', 'accelerated', 'streamlined', 'delivered', 'executed', 'launched', 'pioneered',
    'transformed', 'championed', 'directed', 'supervised', 'coordinated', 'established'
];

export const calculateScore = (data) => {
    if (!data) return { score: 0, color: '#f87171', label: 'Needs Work', improvements: [] };

    let score = 0;
    let improvements = [];

    // 1. Name (+10)
    if (data.personalInfo.fullName) score += 10;
    else improvements.push("Add your full name (+10)");

    // 2. Email (+10)
    if (data.personalInfo.email) score += 10;
    else improvements.push("Add a professional email (+10)");

    // 3. Summary Length > 50 chars (+10)
    if (data.summary && data.summary.length > 50) score += 10;
    else improvements.push("Expand your summary (50+ characters) (+10)");

    // 4. Action Verbs in Summary (+10)
    const summaryLower = data.summary.toLowerCase();
    const hasActionVerb = ACTION_VERBS.some(verb => summaryLower.includes(verb));
    if (hasActionVerb) score += 10;
    else improvements.push("Use strong action verbs in summary (e.g., 'Built', 'Led') (+10)");

    // 5. Experience >= 1 with bullets (+15)
    // Checking if there is at least one experience entry with a description
    const hasExperience = data.experience.some(exp => exp.company && exp.description);
    if (hasExperience) score += 15;
    else improvements.push("Add at least one work experience entry (+15)");

    // 6. Education >= 1 (+10)
    if (data.education.length > 0 && data.education[0].school) score += 10;
    else improvements.push("Add your education details (+10)");

    // 7. Skills >= 5 (+10)
    const totalSkills = (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) + (data.skills?.tools?.length || 0);
    if (totalSkills >= 5) score += 10;
    else improvements.push(`Add more skills (current: ${totalSkills}, target: 5+) (+10)`);

    // 8. Projects >= 1 (+10)
    if (data.projects.length >= 1) score += 10;
    else improvements.push("Add at least one project (+10)");

    // 9. Phone (+5)
    if (data.personalInfo.phone) score += 5;
    else improvements.push("Add phone number (+5)");

    // 10. LinkedIn (+5)
    if (data.personalInfo.linkedin) score += 5;
    else improvements.push("Add LinkedIn profile (+5)");

    // 11. GitHub (+5)
    if (data.personalInfo.github) score += 5;
    else improvements.push("Add GitHub profile (+5)");

    // Max Score Lock
    score = Math.min(100, score);

    // Determine Color & Label
    let color = '#f87171'; // Red
    let label = 'Needs Work';

    if (score > 70) {
        color = '#4ade80'; // Green
        label = 'Strong Resume';
    } else if (score > 40) {
        color = '#facc15'; // Amber
        label = 'Getting There';
    }

    return { score, color, label, improvements };
};
