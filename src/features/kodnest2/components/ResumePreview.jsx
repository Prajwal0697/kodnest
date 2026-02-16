import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ResumePreview = ({ data, template, color = 'hsl(0, 0%, 25%)' }) => {
    if (!data) return null;

    const { personalInfo, summary, experience, projects, education, skills } = data;

    // --- MODERN LAYOUT (Two Column) ---
    if (template === 'modern') {
        return (
            <div style={{
                width: '210mm',
                minHeight: '297mm',
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                color: '#333',
                display: 'flex',
                overflow: 'hidden'
            }}>
                {/* LEFT SIDEBAR */}
                <div style={{
                    width: '32%',
                    backgroundColor: color,
                    color: 'white',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px'
                }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px', marginBottom: '16px', fontWeight: 600 }}>Contact</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                            {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {personalInfo.phone}</div>}
                            {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> {personalInfo.email}</div>}
                            {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {personalInfo.location}</div>}
                            {personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={14} /> LinkedIn</div>}
                            {personalInfo.github && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Github size={14} /> GitHub</div>}
                        </div>
                    </div>

                    {/* Education */}
                    {education.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px', marginBottom: '16px', fontWeight: 600 }}>Education</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{edu.degree}</div>
                                        <div style={{ fontSize: '13px', opacity: 0.9 }}>{edu.school}</div>
                                        <div style={{ fontSize: '12px', opacity: 0.7 }}>{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {skills && (
                        <div>
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px', marginBottom: '16px', fontWeight: 600 }}>Skills</h3>
                            {typeof skills === 'string' ? (
                                <p style={{ fontSize: '13px', lineHeight: '1.6' }}>{skills}</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { label: 'Technical', items: skills.technical },
                                        { label: 'Tools', items: skills.tools },
                                        { label: 'Soft Skins', items: skills.soft }
                                    ].map((group, idx) => (
                                        group.items && group.items.length > 0 && (
                                            <div key={idx}>
                                                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px', textTransform: 'uppercase' }}>{group.label}</div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {group.items.map((skill, s) => (
                                                        <span key={s} style={{ fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '4px' }}>{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* RIGHT CONTENT */}
                <div style={{
                    flex: 1,
                    padding: '40px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Header */}
                    <div>
                        <h1 style={{
                            fontSize: '42px',
                            fontWeight: 800,
                            color: color,
                            lineHeight: 1,
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '-1px'
                        }}>
                            {personalInfo.fullName}
                        </h1>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
                            {summary}
                        </p>
                    </div>

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div>
                            <h3 style={{
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: color,
                                borderBottom: `2px solid ${color}`,
                                paddingBottom: '6px',
                                marginBottom: '16px',
                                fontWeight: 700
                            }}>Experience</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <div style={{ fontSize: '16px', fontWeight: 700 }}>{exp.title}</div>
                                            <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>{exp.duration}</div>
                                        </div>
                                        <div style={{ fontSize: '14px', fontStyle: 'italic', color: color, marginBottom: '6px' }}>{exp.company}</div>
                                        <p style={{ fontSize: '13px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div>
                            <h3 style={{
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: color,
                                borderBottom: `2px solid ${color}`,
                                paddingBottom: '6px',
                                marginBottom: '16px',
                                fontWeight: 700
                            }}>Projects</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                            <div style={{ fontSize: '15px', fontWeight: 700 }}>{proj.name}</div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', textDecoration: 'none', color: color, fontWeight: 600 }}><Globe size={11} /> Live</a>}
                                                {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', textDecoration: 'none', color: '#666', fontWeight: 600 }}><Github size={11} /> Code</a>}
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '6px' }}>{proj.description}</p>
                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {proj.techStack.map((tech, t) => (
                                                    <span key={t} style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#555', fontWeight: 600 }}>{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- CLASSIC & MINIMAL LAYOUTS ---
    return (
        <div style={{
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            color: '#333',
            lineHeight: '1.5',
            padding: template === 'minimal' ? '40px 60px' : '48px',
            boxSizing: 'border-box'
        }}>

            {/* HEADER */}
            <div style={{
                textAlign: 'center',
                marginBottom: template === 'minimal' ? '40px' : '24px',
                borderBottom: template === 'classic' ? `1px solid ${color}` : 'none',
                paddingBottom: template === 'classic' ? '24px' : '0'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontFamily: template === 'classic' ? 'Playfair Display, serif' : 'Inter, sans-serif',
                    fontWeight: 700,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: color
                }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <div style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    color: '#555'
                }}>
                    {[
                        personalInfo.location,
                        personalInfo.email,
                        personalInfo.phone,
                        'LinkedIn', // Simplified for preview
                        'GitHub'    // Simplified for preview
                    ].filter(Boolean).map((item, idx) => (
                        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {idx > 0 && <span style={{ color: '#ccc' }}>|</span>}
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* SECTIONS */}
            {['Summary', 'Experience', 'Projects', 'Education', 'Skills'].map(section => {
                const content = (() => {
                    if (section === 'Summary') return summary;
                    if (section === 'Experience') return experience.length;
                    if (section === 'Projects') return projects.length;
                    if (section === 'Education') return education.length;
                    if (section === 'Skills') return skills;
                })();

                if (!content) return null;

                return (
                    <div key={section} style={{ marginBottom: template === 'minimal' ? '32px' : '28px' }}>
                        {/* Section Title */}
                        <h3 style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            borderBottom: template === 'classic' ? '1px solid #eee' : 'none',
                            paddingBottom: '8px',
                            marginBottom: '16px',
                            fontFamily: template === 'classic' ? 'Playfair Display, serif' : 'Inter, sans-serif',
                            letterSpacing: '1px',
                            color: color
                        }}>{section}</h3>

                        {/* Section Content */}
                        {section === 'Summary' && <p style={{ fontSize: '13px' }}>{summary}</p>}

                        {section === 'Experience' && experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '20px', breakInside: 'avoid' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <span style={{ fontWeight: 700, fontSize: '15px' }}>{exp.title}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 500, fontStyle: 'italic', color: '#666' }}>{exp.duration}</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: color }}>{exp.company}</div>
                                <p style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                            </div>
                        ))}

                        {section === 'Projects' && projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '16px', breakInside: 'avoid' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontWeight: 700, fontSize: '14px' }}>{proj.name}</span>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {proj.liveUrl && <span style={{ fontSize: '10px', border: `1px solid ${color}`, color: color, padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>LIVE</span>}
                                            {proj.githubUrl && <span style={{ fontSize: '10px', border: '1px solid #666', color: '#666', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>CODE</span>}
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontSize: '13px', whiteSpace: 'pre-wrap', marginBottom: '6px' }}>{proj.description}</p>
                                {proj.techStack && proj.techStack.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {proj.techStack.map((tech, t) => (
                                            <span key={t} style={{ fontSize: '11px', color: '#555', backgroundColor: '#f5f5f5', padding: '2px 8px', borderRadius: '12px' }}>{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {section === 'Education' && education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '8px', breakInside: 'avoid' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                                    <span>{edu.school}</span>
                                    <span style={{ fontSize: '12px' }}>{edu.year}</span>
                                </div>
                                <div style={{ fontSize: '13px' }}>{edu.degree}</div>
                            </div>
                        ))}

                        {section === 'Skills' && (
                            typeof skills === 'string' ? (
                                <p style={{ fontSize: '13px' }}>{skills}</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['Technical', 'Soft', 'Tools'].map(key => {
                                        const group = skills[key.toLowerCase()];
                                        if (!group || group.length === 0) return null;
                                        return (
                                            <div key={key} style={{ display: 'flex', alignItems: 'baseline' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 700, width: '100px', flexShrink: 0, color: '#555' }}>{key}:</span>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {group.map((s, idx) => (
                                                        <span key={idx} style={{ fontSize: '12px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>{s}{idx < group.length - 1 ? ',' : ''}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ResumePreview;
