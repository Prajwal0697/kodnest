import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step06Build = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`It's time to build!

Generate a complete prompt to build the MVP of the AI Resume Builder using Lovable.

Include:
- Project Setup instructions
- Database connection (Supabase)
- Key features to implement first (Auth + Basic Resume Form)
- UI styling preferences (Clean, Professional, Modern)

This prompt should be ready to paste into Lovable to start the coding process.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Build Phase</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        Let's turn the specs into code.
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Action Items:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Generate the Master Build Prompt</li>
                            <li>Open Lovable</li>
                            <li>Paste the prompt and start generating</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step06Build;
