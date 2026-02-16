import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step03Architecture = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Design the System Architecture for the AI Resume Builder.

Tech Stack:
- Frontend: React + Vite (or Next.js)
- Backend: Supabase (Auth, Database, Storage)
- AI: OpenAI API (GPT-4o)
- Styling: Tailwind CSS + Shadcn UI

Define:
- Data flow between Frontend, Backend, and AI
- Database schema (Users, Resumes, Jobs, OptimizationReports)
- Authentication flow
- Security considerations

Output a System Architecture Diagram description (Mermaid.js compatible).`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>System Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        Define the blueprint. How do the pieces fit together?
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Key Components:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Frontend (UI/UX)</li>
                            <li>Backend (API/Database)</li>
                            <li>AI Service Integration</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step03Architecture;
