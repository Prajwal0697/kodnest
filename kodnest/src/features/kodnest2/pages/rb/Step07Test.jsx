import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step07Test = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Write a comprehensive Test Plan for the AI Resume Builder.

Types of Testing:
1. Unit Testing (Components & Functions)
2. Integration Testing (API & Database interactions)
3. End-to-End Testing (User Flows)
4. User Acceptance Testing (UAT)

Scenarios to cover:
- User registration/login
- Uploading a broken PDF resume
- Job description analysis accuracy
- Mobile responsiveness`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Testing Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        Ensure quality before shipping. What could go wrong?
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Test Coverage:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Auth Flow Verification</li>
                            <li>Prompt Injection Vulnerability Check</li>
                            <li>Cross-browser Compatibility</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step07Test;
