import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step08Ship = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Prepare the application for Production Deployment.

Steps:
1. Environment Variable Configuration (Production API Keys)
2. Build Optimization (Code Splitting, Minification)
3. Database Migration strategy
4. Domain Configuration & SSL
5. CI/CD Pipeline Setup (GitHub Actions)

Generate a Deployment Checklist.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Ship It!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        The final stretch. Getting the app live for users.
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Pre-flight Checks:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Remove console.logs</li>
                            <li>Check .env variables</li>
                            <li>Verify database backup config</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step08Ship;
