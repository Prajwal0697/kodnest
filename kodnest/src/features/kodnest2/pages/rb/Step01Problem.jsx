import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step01Problem = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`I need to build an AI Resume Builder application.
        
Please help me define the core problem statement and user needs.

The application should:
1. Allow users to input their career details
2. Analyze job descriptions
3. Generate tailored resumes based on the job description
4. Provide ATS optimization scores

Please generate a comprehensive Problem Statement and User Persona document.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Define the Problem</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        The first step in building a great product is clearly defining the problem you are solving.
                        For this AI Resume Builder, we need to understand the pain points of job seekers.
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Key Questions:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Why do current resume builders fail?</li>
                            <li>What is the biggest frustration with ATS systems?</li>
                            <li>Who is our target user?</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step01Problem;
