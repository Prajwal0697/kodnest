import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f9faft 100%)'
        }}>
            <h1 style={{
                fontSize: '4rem',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                maxWidth: '800px'
            }}>
                Build a Resume That Gets Read.
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: '#666666',
                maxWidth: '600px',
                marginBottom: '48px',
                lineHeight: 1.6
            }}>
                Create professional, ATS-optimized resumes in minutes with our clean, premium builder. No distractions, just results.
            </p>
            <Link to="/project2/builder" className="button-primary" style={{
                fontSize: '1.125rem',
                padding: '16px 48px',
                borderRadius: '32px',
                textDecoration: 'none',
                backgroundColor: '#1A1A1A', // Premium black button
                color: 'white'
            }}>
                Start Building
            </Link>
        </div>
    );
};

export default Home;
