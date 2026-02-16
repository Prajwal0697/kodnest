import type { FC, CSSProperties } from 'react';
import Card from './Card';
import Input from './Input';

interface FilterBarProps {
    onFilterChange: (filters: any) => void;
    showMatchToggle?: boolean;
}

const FilterBar: FC<FilterBarProps> = ({ onFilterChange, showMatchToggle = false }) => {
    const handleChange = (name: string, value: any) => {
        onFilterChange((prev: any) => ({ ...prev, [name]: value }));
    };

    const selectStyle: CSSProperties = {
        padding: '8px 12px',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        fontSize: '14px',
        width: '100%'
    };

    return (
        <Card style={{ marginBottom: 'var(--space-3)', padding: 'var(--space-2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-2)', alignItems: 'center' }}>
                <Input
                    placeholder="Search roles or companies..."
                    onChange={e => handleChange('search', e.target.value)}
                    style={{ marginBottom: 0 }}
                />

                <select style={selectStyle} onChange={e => handleChange('location', e.target.value)}>
                    <option value="">All Locations</option>
                    <option>Bengaluru</option>
                    <option>Pune</option>
                    <option>Hyderabad</option>
                    <option>Chennai</option>
                    <option>Noida</option>
                    <option>Gurugram</option>
                    <option>Mumbai</option>
                    <option>Remote</option>
                </select>

                <select style={selectStyle} onChange={e => handleChange('mode', e.target.value)}>
                    <option value="">All Modes</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Onsite</option>
                </select>

                <select style={selectStyle} onChange={e => handleChange('experience', e.target.value)}>
                    <option value="">All Experience</option>
                    <option>Fresher</option>
                    <option>0-1</option>
                    <option>1-3</option>
                    <option>3-5</option>
                </select>

                <select style={selectStyle} onChange={e => handleChange('source', e.target.value)}>
                    <option value="">All Sources</option>
                    <option>LinkedIn</option>
                    <option>Naukri</option>
                    <option>Indeed</option>
                </select>

                <select style={selectStyle} onChange={e => handleChange('status', e.target.value)}>
                    <option value="">All Status</option>
                    <option>Not Applied</option>
                    <option>Applied</option>
                    <option>Rejected</option>
                    <option>Selected</option>
                </select>

                <select style={selectStyle} onChange={e => handleChange('sort', e.target.value)}>
                    <option value="latest">Sort: Latest</option>
                    <option value="score">Sort: Match Score</option>
                    <option value="salary">Sort: Salary</option>
                    <option value="oldest">Sort: Oldest</option>
                </select>
            </div>

            {showMatchToggle && (
                <div style={{
                    marginTop: 'var(--space-2)',
                    paddingTop: 'var(--space-2)',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: 'var(--text-primary)'
                    }}>
                        <input
                            type="checkbox"
                            onChange={e => handleChange('onlyMatches', e.target.checked)}
                            style={{ width: '16px', height: '16px' }}
                        />
                        Show only jobs above my threshold
                    </label>
                </div>
            )}
        </Card>
    );
};

export default FilterBar;
