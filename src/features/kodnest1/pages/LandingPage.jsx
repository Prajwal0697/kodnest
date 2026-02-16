import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                <h2 style={{ color: '#5C4AC7', fontSize: '28px', fontWeight: 700 }}>Placement Prep</h2>
                <button className="button-secondary" style={{ padding: '8px 24px', borderColor: '#5C4AC7', color: '#5C4AC7' }}>Login</button>
            </header>

            <section className="hero" style={{ textAlign: 'center', padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '4.5rem', marginBottom: '24px', lineHeight: 1.1, color: '#5C4AC7', fontFamily: 'Playfair Display, serif' }}>Ace Your Placement</h1>
                <p style={{ fontSize: '1.3rem', color: '#555', marginBottom: '48px' }}>
                    Practice, assess, and prepare for your dream job
                </p>
                <Link
                    to="/project1/dashboard"
                    className="button-primary"
                    style={{ padding: '16px 48px', fontSize: '18px', textDecoration: 'none', display: 'inline-block', backgroundColor: '#5C4AC7' }}
                >
                    Get Started
                </Link>
            </section>

            <section className="features" style={{ padding: '80px 24px', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '36px', marginBottom: '16px' }}>💻</div>
                        <h3 style={{ marginBottom: '8px' }}>Practice Problems</h3>
                        <p style={{ color: '#666' }}>Solve thousands of coding and aptitude problems.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '36px', marginBottom: '16px' }}>📹</div>
                        <h3 style={{ marginBottom: '8px' }}>Mock Interviews</h3>
                        <p style={{ color: '#666' }}>Practice with real-time AI mock interview simulations.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '36px', marginBottom: '16px' }}>📊</div>
                        <h3 style={{ marginBottom: '8px' }}>Track Progress</h3>
                        <p style={{ color: '#666' }}>Detailed analytics to track your preparation journey.</p>
                    </div>
                </div>
            </section>

            <footer style={{ textAlign: 'center', padding: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)', marginTop: 'var(--spacing-xxl)' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                    &copy; {new Date().getFullYear()} Placement Prep. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
