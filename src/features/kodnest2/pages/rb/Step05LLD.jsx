import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step05LLD = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Create a Low-Level Design (LLD) for the AI Resume Builder.

Zoom in on:
1. Database Schema Details (Tables, Columns, Relationships)
2. API Endpoints definition (POST /generate-resume, POST /analyze-job)
3. Component Hierarchy (React Component Tree)
4. State Management Strategy (Context API / Zustand / TanStack Query)

Output a technical specification document.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Low Level Design (LLD)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        The devil is in the details. Define the data structures and API contracts.
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Specifications:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Database Schema</li>
                            <li>API Interfaces</li>
                            <li>Component Tree</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step05LLD;
