import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle2, AlertCircle, TrendingUp, LayoutTemplate, Lightbulb, AlertTriangle, Plus, Trash2, ChevronDown, ChevronUp, X, Sparkles, Globe, Github } from 'lucide-react';
import ResumePreview from '../components/ResumePreview';
import { calculateScore } from '../utils/atsScoring';

const STORAGE_KEY = 'resumeBuilderData';

// --- CONSTANTS ---
const COLORS = {
    teal: 'hsl(168, 60%, 40%)',
    navy: 'hsl(220, 60%, 35%)',
    burgundy: 'hsl(345, 60%, 35%)',
    forest: 'hsl(150, 50%, 30%)',
    charcoal: 'hsl(0, 0%, 25%)'
};

const TEMPLATES = [
    { id: 'classic', name: 'Classic', description: 'Traditional & elegant' },
    { id: 'modern', name: 'Modern', description: 'Bold two-column layout' },
    { id: 'minimal', name: 'Minimal', description: 'Clean & whitespace-heavy' }
];

const SAMPLE_RESUME = {
    template: 'classic',
    color: COLORS.teal,
    personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan'
    },
    summary: 'Senior Software Engineer with 6+ years of experience building scalable web applications. Proficient in React, Node.js, and Cloud Infrastructure. Passionate about clean code and user experience.',
    education: [
        { id: 1, school: 'University of Technology', degree: 'B.S. Computer Science', year: '2018' }
    ],
    experience: [
        { id: 1, company: 'TechCorp Inc.', title: 'Senior Developer', duration: '2020 - Present', description: 'Led a team of 5 developers to rebuild the core platform using Next.js, improving performance by 40%.' },
        { id: 2, company: 'WebSolutions', title: 'Full Stack Developer', duration: '2018 - 2020', description: 'Developed and maintained multiple client e-commerce sites.' }
    ],
    projects: [
        { id: 1, name: 'AI Resume Builder', description: 'Built an automated resume generation tool using OpenAI GPT-4.', techStack: ['React', 'Node.js', 'OpenAI'], liveUrl: 'https://example.com', githubUrl: 'https://github.com' },
        { id: 2, name: 'E-commerce Dashboard', description: 'Created a real-time analytics dashboard for tracking sales and user engagement.', techStack: ['Vue.js', 'Firebase'], liveUrl: '', githubUrl: '' }
    ],
    skills: {
        technical: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
        soft: ['Leadership', 'Mentoring'],
        tools: ['Git', 'Jira']
    }
};

const INITIAL_STATE = {
    template: 'classic',
    color: COLORS.teal,
    personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: { technical: [], soft: [], tools: [] }
};

const ACTION_VERBS = [
    'built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated',
    'managed', 'orchestrated', 'engineered', 'formulated', 'spearheaded', 'conceptualized', 'initiated',
    'revamped', 'modernized', 'accelerated', 'streamlined'
];

// Helper: Tag Input Component
const TagInput = ({ tags = [], onAdd, onRemove, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            onAdd(input.trim());
            setInput('');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {tags.map((tag, idx) => (
                    <span key={idx} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        backgroundColor: '#e5e7eb', fontSize: '12px', padding: '2px 8px', borderRadius: '12px'
                    }}>
                        {tag}
                        <button onClick={() => onRemove(tag)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "Type and press Enter..."}
                style={{ width: '100%', fontSize: '13px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
        </div>
    );
};

const Builder = () => {
    // 1. Initialize State from LocalStorage
    const [resumeData, setResumeData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // MIGRATION: Handle old string skills
                if (typeof parsed.skills === 'string') {
                    parsed.skills = {
                        technical: parsed.skills.split(',').map(s => s.trim()).filter(Boolean),
                        soft: [],
                        tools: []
                    };
                }
                // MIGRATION: Ensure projects have arrays/fields
                if (parsed.projects) {
                    parsed.projects = parsed.projects.map(p => ({
                        ...p,
                        techStack: p.techStack || [],
                        liveUrl: p.liveUrl || '',
                        githubUrl: p.githubUrl || ''
                    }));
                }
                // MIGRATION: Ensure color exists
                if (!parsed.color) parsed.color = COLORS.teal;
                return { ...INITIAL_STATE, ...parsed };
            }
            return INITIAL_STATE;
        } catch (e) {
            console.error('Failed to load resume data', e);
            return INITIAL_STATE;
        }
    });

    const [score, setScore] = useState(0);
    const [improvements, setImprovements] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [expandedProject, setExpandedProject] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // 2. Autosave Effect
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        const { score, improvements } = calculateScore(resumeData);
        setScore(score);
        setImprovements(improvements.slice(0, 3)); // Keep top 3 for Builder view
    }, [resumeData]);

    const handleLoadSample = () => {
        if (window.confirm("This will overwrite your current data. Continue?")) {
            setResumeData(SAMPLE_RESUME);
        }
    };

    const handleDownloadPDF = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleInputChange = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSimpleChange = (field, value) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    const setTemplate = (template) => {
        setResumeData(prev => ({ ...prev, template }));
    };

    const setColor = (color) => {
        setResumeData(prev => ({ ...prev, color }));
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), ...item }]
        }));
    };

    const addEducation = () => addItem('education', { school: '', degree: '', year: '' });
    const addExperience = () => addItem('experience', { company: '', title: '', duration: '', description: '' });
    const addProject = () => {
        addItem('projects', { name: 'New Project', description: '', techStack: [], liveUrl: '', githubUrl: '' });
        setExpandedProject(resumeData.projects.length); // Expand the new project
    };


    // Skills Handlers
    const addSkill = (category, skill) => {
        if (!skill) return;
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: [...(prev.skills[category] || []), skill]
            }
        }));
    };

    const removeSkill = (category, skill) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: prev.skills[category].filter(s => s !== skill)
            }
        }));
    };

    const suggestSkills = () => {
        setLoadingSuggestions(true);
        setTimeout(() => {
            setResumeData(prev => ({
                ...prev,
                skills: {
                    technical: [...new Set([...prev.skills.technical, 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'])],
                    soft: [...new Set([...prev.skills.soft, 'Team Leadership', 'Problem Solving'])],
                    tools: [...new Set([...prev.skills.tools, 'Git', 'Docker', 'AWS'])]
                }
            }));
            setLoadingSuggestions(false);
        }, 1000);
    };


    // Bullet Guidance Logic
    const getBulletGuidance = (text) => {
        if (!text) return null;
        const suggestions = [];
        const words = text.trim().split(/\s+/);
        const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '');

        if (firstWord && !ACTION_VERBS.includes(firstWord) && !ACTION_VERBS.some(v => v.startsWith(firstWord))) {
            suggestions.push("Start with a strong action verb (e.g., 'Built', 'Led').");
        }

        const metricRegex = /\d+%|\d+k|\d+x|\$\d+|\d+/i;
        if (!metricRegex.test(text)) {
            suggestions.push("Add measurable impact (numbers).");
        }

        return suggestions.length > 0 ? suggestions : null;
    };

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

            {/* TOAST NOTIFICATION */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <CheckCircle2 size={20} color="#4ade80" />
                    <span>PDF export ready! Check your downloads.</span>
                </div>
            )}

            {/* LEFT PANEL - FORMS */}
            <div style={{
                flex: '0 0 50%',
                padding: '32px',
                overflowY: 'auto',
                borderRight: '1px solid #E0E0E0',
                backgroundColor: '#FAFAFA'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontFamily: 'Playfair Display, serif', margin: 0 }}>Editor</h2>
                    <button onClick={handleLoadSample} className="button-secondary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                        Load Sample Data
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Personal Info */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Personal Information</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <input placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={e => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                                <input placeholder="Email" value={resumeData.personalInfo.email} onChange={e => handleInputChange('personalInfo', 'email', e.target.value)} />
                                <input placeholder="Phone" value={resumeData.personalInfo.phone} onChange={e => handleInputChange('personalInfo', 'phone', e.target.value)} />
                                <input placeholder="Location" value={resumeData.personalInfo.location} onChange={e => handleInputChange('personalInfo', 'location', e.target.value)} />
                                <input placeholder="LinkedIn" value={resumeData.personalInfo.linkedin} onChange={e => handleInputChange('personalInfo', 'linkedin', e.target.value)} />
                                <input placeholder="GitHub" value={resumeData.personalInfo.github} onChange={e => handleInputChange('personalInfo', 'github', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Professional Summary</h3>
                                <span style={{ fontSize: '12px', color: '#666' }}>{resumeData.summary.trim().split(/\s+/).filter(w => w).length} words</span>
                            </div>
                            <textarea
                                placeholder="Write a compelling summary (40-120 words)..."
                                value={resumeData.summary}
                                onChange={e => handleSimpleChange('summary', e.target.value)}
                                style={{ height: '120px' }}
                            />
                        </CardContent>
                    </Card>

                    {/* Experience */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Experience</h3>
                            {resumeData.experience.map((exp, idx) => {
                                const guidance = getBulletGuidance(exp.description);
                                return (
                                    <div key={idx} style={{ padding: '12px', borderLeft: '3px solid #E0E0E0', marginBottom: '12px', backgroundColor: 'white' }}>
                                        <div style={{ display: 'grid', gap: '8px' }}>
                                            <input value={exp.company} onChange={(e) => {
                                                const newExp = [...resumeData.experience];
                                                newExp[idx].company = e.target.value;
                                                setResumeData({ ...resumeData, experience: newExp });
                                            }} placeholder="Company" style={{ fontWeight: 600 }} />
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <input value={exp.title} onChange={(e) => {
                                                    const newExp = [...resumeData.experience];
                                                    newExp[idx].title = e.target.value;
                                                    setResumeData({ ...resumeData, experience: newExp });
                                                }} placeholder="Job Title" />
                                                <input value={exp.duration} onChange={(e) => {
                                                    const newExp = [...resumeData.experience];
                                                    newExp[idx].duration = e.target.value;
                                                    setResumeData({ ...resumeData, experience: newExp });
                                                }} placeholder="Duration" />
                                            </div>
                                            <div>
                                                <textarea value={exp.description} onChange={(e) => {
                                                    const newExp = [...resumeData.experience];
                                                    newExp[idx].description = e.target.value;
                                                    setResumeData({ ...resumeData, experience: newExp });
                                                }} placeholder="Description (Bullet points recommended)" style={{ minHeight: '80px', width: '100%', marginBottom: guidance ? '4px' : '0' }} />
                                                {guidance && (
                                                    <div style={{ fontSize: '12px', color: '#f59e0b', display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: '#fffbeb', padding: '6px', borderRadius: '4px' }}>
                                                        <Lightbulb size={12} />
                                                        <span>{guidance.join(' ')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={() => {
                                            const newExp = resumeData.experience.filter((_, i) => i !== idx);
                                            setResumeData({ ...resumeData, experience: newExp });
                                        }} style={{ fontSize: '11px', color: 'red', marginTop: '8px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Remove</button>
                                    </div>
                                );
                            })}
                            <button onClick={addExperience} className="button-secondary" style={{ marginTop: '16px', width: '100%', borderStyle: 'dashed' }}>
                                + Add Experience
                            </button>
                        </CardContent>
                    </Card>

                    {/* Projects (Enhanced) */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Projects</h3>
                            {resumeData.projects.map((proj, idx) => {
                                const guidance = getBulletGuidance(proj.description);
                                const isExpanded = expandedProject === idx;

                                return (
                                    <div key={idx} style={{ border: '1px solid #E0E0E0', borderRadius: '6px', marginBottom: '12px', backgroundColor: 'white', overflow: 'hidden' }}>
                                        {/* Header */}
                                        <div
                                            onClick={() => setExpandedProject(isExpanded ? null : idx)}
                                            style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: isExpanded ? '#f9fafb' : 'white' }}
                                        >
                                            <span style={{ fontWeight: 600, fontSize: '14px' }}>{proj.name || 'New Project'}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <button onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newProj = resumeData.projects.filter((_, i) => i !== idx);
                                                    setResumeData({ ...resumeData, projects: newProj });
                                                }} style={{ border: 'none', background: 'transparent', color: '#ef4444', padding: '4px', cursor: 'pointer', display: 'flex' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                                {isExpanded ? <ChevronUp size={16} color="#666" /> : <ChevronDown size={16} color="#666" />}
                                            </div>
                                        </div>

                                        {/* Body */}
                                        {isExpanded && (
                                            <div style={{ padding: '16px', borderTop: '1px solid #E0E0E0' }}>
                                                <div style={{ display: 'grid', gap: '12px' }}>
                                                    <input value={proj.name} onChange={(e) => {
                                                        const newProj = [...resumeData.projects];
                                                        newProj[idx].name = e.target.value;
                                                        setResumeData({ ...resumeData, projects: newProj });
                                                    }} placeholder="Project Name" style={{ fontWeight: 600 }} />

                                                    <div>
                                                        <textarea value={proj.description} maxLength={200} onChange={(e) => {
                                                            const newProj = [...resumeData.projects];
                                                            newProj[idx].description = e.target.value;
                                                            setResumeData({ ...resumeData, projects: newProj });
                                                        }} placeholder="Description (Max 200 chars)" style={{ minHeight: '60px', width: '100%', marginBottom: guidance ? '4px' : '0' }} />
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: proj.description.length >= 200 ? 'red' : '#999' }}>{proj.description.length}/200</div>
                                                        {guidance && (
                                                            <div style={{ fontSize: '12px', color: '#f59e0b', display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: '#fffbeb', padding: '6px', borderRadius: '4px' }}>
                                                                <Lightbulb size={12} />
                                                                <span>{guidance.join(' ')}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Tech Stack</label>
                                                        <TagInput
                                                            tags={proj.techStack || []}
                                                            onAdd={(tag) => {
                                                                const newProj = [...resumeData.projects];
                                                                newProj[idx].techStack = [...(newProj[idx].techStack || []), tag];
                                                                setResumeData({ ...resumeData, projects: newProj });
                                                            }}
                                                            onRemove={(tag) => {
                                                                const newProj = [...resumeData.projects];
                                                                newProj[idx].techStack = newProj[idx].techStack.filter(t => t !== tag);
                                                                setResumeData({ ...resumeData, projects: newProj });
                                                            }}
                                                            placeholder="Add tech (e.g. React)..."
                                                        />
                                                    </div>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                        <div style={{ position: 'relative' }}>
                                                            <Globe size={14} style={{ position: 'absolute', top: '10px', left: '10px', color: '#999' }} />
                                                            <input value={proj.liveUrl} onChange={(e) => {
                                                                const newProj = [...resumeData.projects];
                                                                newProj[idx].liveUrl = e.target.value;
                                                                setResumeData({ ...resumeData, projects: newProj });
                                                            }} placeholder="Live URL" style={{ paddingLeft: '30px' }} />
                                                        </div>
                                                        <div style={{ position: 'relative' }}>
                                                            <Github size={14} style={{ position: 'absolute', top: '10px', left: '10px', color: '#999' }} />
                                                            <input value={proj.githubUrl} onChange={(e) => {
                                                                const newProj = [...resumeData.projects];
                                                                newProj[idx].githubUrl = e.target.value;
                                                                setResumeData({ ...resumeData, projects: newProj });
                                                            }} placeholder="GitHub URL" style={{ paddingLeft: '30px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <button onClick={addProject} className="button-secondary" style={{ marginTop: '8px', width: '100%', borderStyle: 'dashed' }}>
                                <Plus size={14} style={{ marginRight: '6px' }} /> Add Project
                            </button>
                        </CardContent>
                    </Card>

                    {/* Skills (Advanced) */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Skills</h3>
                                <button onClick={suggestSkills} className="button-secondary" disabled={loadingSuggestions} style={{ fontSize: '11px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Sparkles size={12} /> {loadingSuggestions ? 'Loading...' : 'Suggest Skills'}
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* Technical */}
                                <div>
                                    <label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', display: 'block', color: '#4b5563' }}>
                                        Technical Skills ({resumeData.skills.technical?.length || 0})
                                    </label>
                                    <TagInput
                                        tags={resumeData.skills.technical || []}
                                        onAdd={(tag) => addSkill('technical', tag)}
                                        onRemove={(tag) => removeSkill('technical', tag)}
                                        placeholder="Add skill (e.g. React)..."
                                    />
                                </div>

                                {/* Tools */}
                                {improvements.map((imp, idx) => (
                                    <li key={idx} style={{ fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#e5e5e5' }}>
                                        <AlertTriangle size={16} color="#facc15" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        {imp}
                                    </li>
                                ))}
                                <div>
                                    <label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', display: 'block', color: '#4b5563' }}>
                                        Tools & Technologies ({resumeData.skills.tools?.length || 0})
                                    </label>
                                    <TagInput
                                        tags={resumeData.skills.tools || []}
                                        onAdd={(tag) => addSkill('tools', tag)}
                                        onRemove={(tag) => removeSkill('tools', tag)}
                                        placeholder="Add tool (e.g. Docker)..."
                                    />
                                </div>

                                {/* Soft */}
                                <div>
                                    <label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', display: 'block', color: '#4b5563' }}>
                                        Soft Skills ({resumeData.skills.soft?.length || 0})
                                    </label>
                                    <TagInput
                                        tags={resumeData.skills.soft || []}
                                        onAdd={(tag) => addSkill('soft', tag)}
                                        onRemove={(tag) => removeSkill('soft', tag)}
                                        placeholder="Add soft skill..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                        <CardContent style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Education</h3>
                            {resumeData.education.map((edu, idx) => (
                                <div key={idx} style={{ padding: '12px', borderLeft: '3px solid #E0E0E0', marginBottom: '12px', backgroundColor: 'white' }}>
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        <input value={edu.school} onChange={(e) => {
                                            const newEd = [...resumeData.education];
                                            newEd[idx].school = e.target.value;
                                            setResumeData({ ...resumeData, education: newEd });
                                        }} placeholder="School" style={{ fontWeight: 600 }} />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <input value={edu.degree} onChange={(e) => {
                                                const newEd = [...resumeData.education];
                                                newEd[idx].degree = e.target.value;
                                                setResumeData({ ...resumeData, education: newEd });
                                            }} placeholder="Degree" />
                                            <input value={edu.year} onChange={(e) => {
                                                const newEd = [...resumeData.education];
                                                newEd[idx].year = e.target.value;
                                                setResumeData({ ...resumeData, education: newEd });
                                            }} placeholder="Year" />
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        const newEd = resumeData.education.filter((_, i) => i !== idx);
                                        setResumeData({ ...resumeData, education: newEd });
                                    }} style={{ fontSize: '11px', color: 'red', marginTop: '8px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Remove</button>
                                </div>
                            ))}
                            <button onClick={addEducation} className="button-secondary" style={{ marginTop: '16px', width: '100%', borderStyle: 'dashed' }}>
                                + Add Education
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* RIGHT PANEL - LIVE PREVIEW & ATS SCORE */}
            <div style={{
                flex: '0 0 50%',
                backgroundColor: '#525252',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                gap: '24px'
            }}>
                {/* Visual Picker & Color Theme */}
                <div style={{ width: '210mm', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Template Picker */}
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        {TEMPLATES.map(t => (
                            <div
                                key={t.id}
                                onClick={() => setTemplate(t.id)}
                                style={{
                                    width: '120px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    cursor: 'pointer',
                                    border: resumeData.template === t.id ? '2px solid #2563eb' : '2px solid transparent',
                                    opacity: resumeData.template === t.id ? 1 : 0.8,
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {resumeData.template === t.id && (
                                    <div style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', padding: '2px' }}>
                                        <CheckCircle2 size={16} />
                                    </div>
                                )}
                                <div style={{ width: '100%', height: '80px', backgroundColor: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <LayoutTemplate size={24} color="#9ca3af" />
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>{t.name}</div>
                            </div>
                        ))}
                    </div>

                    {/* Color Picker */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        {Object.entries(COLORS).map(([name, code]) => (
                            <button
                                key={name}
                                onClick={() => setColor(code)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: code,
                                    border: resumeData.color === code ? '3px solid white' : '3px solid transparent',
                                    boxShadow: resumeData.color === code ? '0 0 0 2px #2563eb' : 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                title={name}
                            />
                        ))}
                    </div>
                </div>

                {/* Resume Preview */}
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                    <ResumePreview data={resumeData} template={resumeData.template} color={resumeData.color} />
                </div>

                {/* Download Toast Trigger */}
                <button onClick={handleDownloadPDF} className="button-primary" style={{ marginTop: '16px' }}>
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default Builder;
