import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const Step02Market = ({ setPromptText }) => {
    useEffect(() => {
        setPromptText(`Conduct a market research analysis for the AI Resume Builder.

Competitors:
1. Resume.io
2. Zety
3. Teal based resume builders
4. LinkedIn Resume Builder

Analyze:
- Feature gaps in existing tools
- Pricing models
- User reviews and common complaints
- Opportunities for differentiation (e.g., deep ATS analysis, specific niche targeting)

Output a Market Research Report.`);
    }, [setPromptText]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Market Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                        Understand the landscape. Who are we competing against? Where is the white space?
                    </p>
                    <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', marginBottom: '24px' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Competitor Checklist:</h4>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Analyze top 3 competitors</li>
                            <li>Identify their pricing models</li>
                            <li>Read 1-star reviews to find pain points</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Step02Market;
