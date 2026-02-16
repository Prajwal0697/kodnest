import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step04HLD = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Create a High-Level Design (HLD) for the AI Resume Builder.

Focus on:
1. User Onboarding Flow
2. Resume Creation Workflow (Input -> AI Processing -> Preview)
3. Job Analysis Workflow (Paste JD -> AI Analysis -> Gap Report)
4. Export Workflow (PDF Generation)

Provide sequence diagrams or flowcharts description.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>High Level Design (HLD)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        Visualize the user journey and major system interactions.
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Flows to Define:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Auth & Onboarding</li>
                            <li>Resume Building Process</li>
                            <li>Job Description Analysis</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step04HLD;
