import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { ChevronRight } from 'lucide-react';

const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const dashboardStyles = `
  @keyframes progress-animation {
    from { stroke-dashoffset: 283; }
    to { stroke-dashoffset: 79; } /* (1 - 0.72) * 283 */
  }
  .animate-progress {
    animation: progress-animation 1.5s ease-out forwards;
  }
`;

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <style>{dashboardStyles}</style>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>

                {/* Overall Readiness */}
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--spacing-lg)' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                            <svg width="120" height="120" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="45"
                                    fill="none" stroke="#E5E7EB" strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r="45"
                                    fill="none" stroke="var(--color-primary)" strokeWidth="8"
                                    strokeDasharray="283"
                                    strokeDashoffset="283"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    className="animate-progress"
                                />
                            </svg>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '24px', fontWeight: 700 }}>72</span>
                                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>/ 100</span>
                            </div>
                        </div>
                        <p style={{ marginTop: 'var(--spacing-md)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                            Readiness Score
                        </p>
                    </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="var(--color-primary)"
                                    fill="var(--color-primary)"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>

                {/* Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 600 }}>Dynamic Programming</span>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>3/10</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                            </div>
                        </div>
                        <button className="button-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            Continue <ChevronRight size={16} />
                        </button>
                    </CardContent>
                </Card>

                {/* Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Problems Solved</span>
                                <span style={{ fontWeight: 600 }}>12/20</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: i < 4 ? 'var(--color-primary)' : '#E5E7EB',
                                        opacity: i < 4 ? (0.4 + (i * 0.2)) : 1
                                    }}></div>
                                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)' }}>{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Assessments */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {[
                                { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
                                { title: 'System Design Review', time: 'Wed, 2:00 PM' },
                                { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 'var(--spacing-sm)',
                                    borderLeft: '4px solid var(--color-primary)',
                                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                                    borderRadius: '0 4px 4px 0'
                                }}>
                                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{item.title}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
