const HISTORY_KEY = 'placement_prep_history';
const LATEST_KEY = 'placement_prep_latest';

/**
 * Sanitizes an entry to ensure it matches the strict schema.
 * Replaces missing fields with defaults.
 */
export const sanitizeEntry = (entry) => {
    if (!entry) return null;
    return {
        id: entry.id || Date.now(),
        createdAt: entry.createdAt || new Date().toISOString(),
        updatedAt: entry.updatedAt || entry.createdAt || new Date().toISOString(),
        company: entry.company || "",
        role: entry.role || "",
        jdText: entry.jdText || "",
        extractedSkills: entry.extractedSkills || {
            coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: []
        },
        roundMapping: entry.roundMapping || (entry.rounds || []), // Handle old key
        checklist: entry.checklist || [],
        plan7Days: entry.plan7Days || (entry.plan || []), // Handle old key
        questions: entry.questions || [],
        baseScore: entry.baseScore || entry.readinessScore || 0,
        skillConfidenceMap: entry.skillConfidenceMap || {},
        finalScore: entry.finalScore || entry.readinessScore || 0,
        companyIntel: entry.companyIntel || null
    };
};

export const getHistory = () => {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    try {
        const history = JSON.parse(data);
        return history.map(sanitizeEntry);
    } catch (e) {
        console.error("Corrupted history data", e);
        return [];
    }
};

export const saveToHistory = (entry) => {
    const history = getHistory();
    const sanitized = sanitizeEntry(entry);
    const updated = [sanitized, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    localStorage.setItem(LATEST_KEY, JSON.stringify(sanitized));
};

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(entry => entry.id === Number(id));
    if (index !== -1) {
        const updatedEntry = {
            ...history[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // Ensure finalScore is updated if skillConfidenceMap changed
        if (updates.skillConfidenceMap) {
            let score = updatedEntry.baseScore;
            Object.values(updates.skillConfidenceMap).forEach(state => {
                if (state === 'know') score += 2;
                else if (state === 'practice') score -= 2;
            });
            updatedEntry.finalScore = Math.max(0, Math.min(100, score));
        }

        history[index] = updatedEntry;
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

        const latest = getLatestResult();
        if (latest && latest.id === Number(id)) {
            localStorage.setItem(LATEST_KEY, JSON.stringify(updatedEntry));
        }
    }
};

export const getLatestResult = () => {
    const data = localStorage.getItem(LATEST_KEY);
    if (!data) return null;
    try {
        return sanitizeEntry(JSON.parse(data));
    } catch (e) {
        return null;
    }
};

export const getResultById = (id) => {
    const history = getHistory();
    return history.find(entry => entry.id === Number(id)) || null;
};

export const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(LATEST_KEY);
};
