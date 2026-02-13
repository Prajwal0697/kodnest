import type { Job } from '../types/job';

const baseJobs: Partial<Job>[] = [
    { title: 'SDE Intern', company: 'Amazon', location: 'Bengaluru', salaryRange: '₹40k–₹80k/month Internship', skills: ['Java', 'AWS', 'DSA'], description: 'Work on logistics tech.' },
    { title: 'Graduate Engineer Trainee', company: 'TCS', location: 'Pune', salaryRange: '3–5 LPA', skills: ['Python', 'SQL'], description: 'Join the Digital wing.' },
    { title: 'React Developer', company: 'Razorpay', location: 'Remote', salaryRange: '12–18 LPA', skills: ['React', 'TypeScript'], description: 'Core checkout experience.' },
    { title: 'Junior Backend Developer', company: 'Flipkart', location: 'Bengaluru', salaryRange: '8–12 LPA', skills: ['Java', 'Spring'], description: 'Scale e-commerce backend.' },
    { title: 'Data Analyst Intern', company: 'Swiggy', location: 'Bengaluru', salaryRange: '₹25k–₹35k/month Internship', skills: ['Python', 'Tableau'], description: 'Analyze delivery trends.' }
];

const companies = ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'IBM', 'Oracle', 'SAP', 'Dell', 'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED'];
const locations = ['Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Noida', 'Gurugram', 'Mumbai', 'Remote'];
const roles = ['SDE Intern', 'Graduate Engineer Trainee', 'Junior Backend Developer', 'Frontend Intern', 'QA Intern', 'Data Analyst Intern', 'Java Developer', 'Python Developer', 'React Developer'];
const modes = ['Remote', 'Hybrid', 'Onsite'] as const;
const experiences = ['Fresher', '0-1', '1-3', '3-5'] as const;
const sources = ['LinkedIn', 'Naukri', 'Indeed'] as const;

export const jobs: Job[] = Array.from({ length: 60 }).map((_, i) => {
    const base = baseJobs[i % baseJobs.length];
    const role = roles[i % roles.length];
    const company = companies[i % companies.length];
    const location = locations[i % locations.length];
    const mode = modes[i % modes.length];
    const exp = experiences[i % experiences.length];
    const source = sources[i % sources.length];

    return {
        id: (i + 1).toString(),
        title: base?.title || role,
        company: base?.company || company,
        location: base?.location || location,
        mode: (base?.mode as any) || mode,
        experience: exp,
        skills: base?.skills || ['JavaScript', 'React', 'Problem Solving'],
        source: source,
        postedDaysAgo: i % 10,
        salaryRange: base?.salaryRange || (exp === 'Fresher' ? '3–5 LPA' : '8–15 LPA'),
        applyUrl: `https://careers.${(base?.company || company).toLowerCase()}.com/jobs/${i + 1}`,
        description: base?.description || `Join ${base?.company || company} as a ${role}. We are looking for talented ${exp} individuals to contribute to our premium tech stack. This role offers high visibility and impact.`
    };
});
