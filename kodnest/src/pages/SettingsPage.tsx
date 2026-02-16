import { useState, useEffect } from 'react';
import type { FC } from 'react';
import ContextHeader from '../components/layout/ContextHeader';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import type { Preferences } from '../types/preferences';

const SettingsPage: FC = () => {
    const [prefs, setPrefs] = useState<Preferences>({
        roleKeywords: [],
        preferredLocations: [],
        preferredMode: ['Remote', 'Hybrid', 'Onsite'],
        experienceLevel: '0-1',
        skills: [],
        minMatchScore: 40
    });

    const [keywordsInput, setKeywordsInput] = useState('');
    const [skillsInput, setSkillsInput] = useState('');
    const [locationsInput, setLocationsInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            const parsed = JSON.parse(saved) as Preferences;
            setPrefs(parsed);
            setKeywordsInput(parsed.roleKeywords.join(', '));
            setSkillsInput(parsed.skills.join(', '));
            setLocationsInput(parsed.preferredLocations.join(', '));
        }
    }, []);

    const handleSave = () => {
        const updatedPrefs: Preferences = {
            ...prefs,
            roleKeywords: keywordsInput.split(',').map(s => s.trim()).filter(s => !!s),
            skills: skillsInput.split(',').map(s => s.trim()).filter(s => !!s),
            preferredLocations: locationsInput.split(',').map(s => s.trim()).filter(s => !!s),
        };
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(updatedPrefs));
        alert('Preferences saved successfully.');
    };

    const toggleMode = (mode: 'Remote' | 'Hybrid' | 'Onsite') => {
        setPrefs(prev => ({
            ...prev,
            preferredMode: prev.preferredMode.includes(mode)
                ? prev.preferredMode.filter(m => m !== mode)
                : [...prev.preferredMode, mode]
        }));
    };

    return (
        <div>
            <ContextHeader
                title="Preferences"
                subtitle="Fine-tune your build parameters for maximum precision."
            />
            <div className="container" style={{ padding: 'var(--space-4) var(--space-3)' }}>
                <Card style={{ maxWidth: 'var(--max-content-width)' }}>
                    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                        <Input
                            label="Role Keywords (e.g. Frontend, SDE, React)"
                            value={keywordsInput}
                            onChange={(e) => setKeywordsInput(e.target.value)}
                            placeholder="Comma-separated keywords"
                        />

                        <Input
                            label="Preferred Locations"
                            value={locationsInput}
                            onChange={(e) => setLocationsInput(e.target.value)}
                            placeholder="e.g. Bengaluru, Remote, Pune"
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                                <label style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'rgba(17, 17, 17, 0.6)',
                                    textTransform: 'uppercase'
                                }}>Preferred Mode</label>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                    {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                        <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode as any)}
                                                onChange={() => toggleMode(mode as any)}
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                                <label style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'rgba(17, 17, 17, 0.6)',
                                    textTransform: 'uppercase'
                                }}>Experience Level</label>
                                <select
                                    value={prefs.experienceLevel}
                                    onChange={(e) => setPrefs(prev => ({ ...prev, experienceLevel: e.target.value as any }))}
                                    style={{
                                        padding: '12px 16px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '4px',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                        fontSize: '14px'
                                    }}>
                                    <option value="Fresher">Fresher</option>
                                    <option value="0-1">0-1 Years</option>
                                    <option value="1-3">1-3 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                </select>
                            </div>
                        </div>

                        <Input
                            label="Your Skills (e.g. React, Node, SQL)"
                            value={skillsInput}
                            onChange={(e) => setSkillsInput(e.target.value)}
                            placeholder="Comma-separated skills"
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            <label style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'rgba(17, 17, 17, 0.6)',
                                textTransform: 'uppercase',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                Minimum Match Score Threshold
                                <span style={{ color: 'var(--accent-color)' }}>{prefs.minMatchScore}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={prefs.minMatchScore}
                                onChange={(e) => setPrefs(prev => ({ ...prev, minMatchScore: parseInt(e.target.value) }))}
                                style={{ width: '100%', height: '4px', marginTop: '12px' }}
                            />
                        </div>

                        <div style={{ marginTop: 'var(--space-2)' }}>
                            <Button onClick={handleSave}>Save Preferences</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;
