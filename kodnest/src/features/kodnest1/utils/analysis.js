/**
 * JD Analysis Engine (Heuristic)
 * No external APIs or scraping.
 * Hardened version with strict schema and edge case handling.
 */

const SKILL_CATEGORIES = {
    coreCS: ["DSA", "Data Structures", "Algorithms", "Operating Systems", "OS", "DBMS", "Database Management", "Computer Networks", "Networking", "OOP", "Object Oriented"],
    languages: ["Java", "Python", "C++", "JavaScript", "TypeScript", "C#", "Ruby", "Golang", "PHP", "Swift"],
    web: ["React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask", "HTML", "CSS", "Frontend", "Backend", "Fullstack"],
    data: ["SQL", "PostgreSQL", "MongoDB", "Data Science", "Machine Learning", "ML", "Artificial Intelligence", "AI", "Data Analysis", "Tableau", "PowerBI"],
    cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform", "Cloud"],
    testing: ["Selenium", "Jest", "TDD", "Unit Testing", "Automation Testing", "Cypress"]
};

const QUESTION_BANK = {
    "React": ["Explain Virtual DOM.", "What are hooks?", "Context API vs Redux."],
    "Node.js": ["What is Event Loop?", "Explain middleware.", "Node.js vs Deno."],
    "SQL": ["Joins vs Subqueries.", "Normalisation forms.", "Indexing basics."],
    "DSA": ["Explain Time Complexity.", "Array vs Linked List.", "How does Hashmap work?"],
    "Java": ["JVM Architecture.", "Interface vs Abstract Class.", "Multithreading basics."],
    "JavaScript": ["Closures.", "Prototypal Inheritance.", "Async/Await vs Promises."],
    "System Design": ["Vertical vs Horizontal Scaling.", "Load Balancers.", "Caching Strategies."]
};

const ENTERPRISE_LIST = ["Amazon", "Google", "Microsoft", "Meta", "Apple", "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "IBM", "Oracle", "Cisco"];

const getCompanyIntel = (company) => {
    if (!company) return null;
    const isEnterprise = ENTERPRISE_LIST.some(e => company.toLowerCase().includes(e.toLowerCase()));
    return {
        name: company,
        industry: "Technology Services",
        size: isEnterprise ? "Enterprise (2000+)" : "Startup (<200)",
        type: isEnterprise ? "Enterprise" : "Startup",
        hiringFocus: isEnterprise
            ? "Structured DSA + core fundamentals. High emphasis on scalability and architectural patterns."
            : "Practical problem solving + tech stack depth. Focus on speed of delivery and ownership."
    };
};

const getRoundMapping = (intel, skills) => {
    const allSkills = Object.values(skills).flat().map(s => s.toLowerCase());
    const hasDSA = allSkills.some(s => s.includes('dsa') || s.includes('algorithm') || s.includes('structure'));
    const isEnterprise = intel?.type === "Enterprise";

    if (isEnterprise) {
        return [
            { roundTitle: "Round 1: Online Assessment", focusAreas: ["DSA", "Aptitude"], whyItMatters: "Filters candidates based on basic problem-solving and speed." },
            { roundTitle: "Round 2: Technical Interview 1", focusAreas: ["DSA", "Core Fundamentals"], whyItMatters: "In-depth check of theoretical knowledge and algorithmic thinking." },
            { roundTitle: "Round 3: Technical Interview 2", focusAreas: ["Projects", "System Design"], whyItMatters: "Evaluates how you apply knowledge to real-world scenarios." },
            { roundTitle: "Round 4: HR / Managerial", focusAreas: ["Behavioral", "Culture Fit"], whyItMatters: "Final check on leadership principles and compatibility." }
        ];
    } else {
        return [
            { roundTitle: "Round 1: Practical Coding", focusAreas: ["Feature Implementation", "Clean Code"], whyItMatters: "Tests the ability to write clean, working code in a short time." },
            { roundTitle: "Round 2: Technical Discussion", focusAreas: ["Stack Depth", "System Logic"], whyItMatters: "Focuses on your understanding of the tools you use and your reasoning." },
            { roundTitle: "Round 3: Founder / Culture Fit", focusAreas: ["Vision", "Ownership", "Adaptability"], whyItMatters: "Ensures you can thrive in a fast-paced environment and take initiative." }
        ];
    }
};

export const analyzeJD = (company, role, jdText) => {
    const jdLower = jdText.toLowerCase();

    // Skill Extraction
    const extractedSkills = {
        coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: []
    };
    let totalDetectedCategories = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
        const detected = keywords.filter(kw => jdLower.includes(kw.toLowerCase()));
        if (detected.length > 0) {
            extractedSkills[category] = detected;
            totalDetectedCategories++;
        }
    });

    // Default behavior if no skills detected
    const anyDetected = Object.values(extractedSkills).some(arr => arr.length > 0);
    if (!anyDetected) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // Score Calculation
    let baseScore = 35;
    baseScore += Math.min(totalDetectedCategories * 5, 30);
    if (company && company.trim().length > 0) baseScore += 10;
    if (role && role.trim().length > 0) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    const intel = getCompanyIntel(company);
    const roundMapping = getRoundMapping(intel, extractedSkills);

    // Plan 7 Days
    const plan7Days = [
        { day: "Day 1-2", focus: "Foundations & Core CS", tasks: ["Review OOPs, OS, and Basic DSA patterns.", "Set up dev environment."] },
        { day: "Day 3-4", focus: "Tech Stack Deep Dive", tasks: [`Brush up on ${Object.values(extractedSkills).flat().slice(0, 3).join(', ')}.`, "Build a mini prototype."] },
        { day: "Day 5-6", focus: "Mock Interviews", tasks: ["Practice project explanations.", "Take 2 mock technical interviews."] },
        { day: "Day 7", focus: "Final Polish", tasks: ["HR questions and behavioral prep.", "Company research and final review."] }
    ];

    // Checklist
    const checklist = roundMapping.map(r => ({
        roundTitle: r.roundTitle,
        items: [...r.focusAreas, "Previous Experience", "Soft Skills"]
    }));

    // Questions Generation
    let questions = [];
    const detectedKeywords = Object.values(extractedSkills).flat();
    detectedKeywords.forEach(kw => {
        if (QUESTION_BANK[kw]) questions.push(...QUESTION_BANK[kw]);
    });

    if (questions.length < 10) {
        questions.push("Explain your most challenging project.", "How do you handle technical debt?", "What is your development process?");
    }
    questions = Array.from(new Set(questions)).slice(0, 10);

    return {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        finalScore: baseScore,
        skillConfidenceMap: {},
        companyIntel: intel // Keep for UI even if not in strict required list
    };
};
