import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header style={{ padding: 'var(--spacing-lg) var(--spacing-xxl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'var(--color-primary)', fontSize: '24px' }}>Placement Prep</h2>
                <button className="button-secondary" style={{ padding: '8px 24px' }}>Login</button>
            </header>

            <section className="hero" style={{ textAlign: 'center', padding: 'var(--spacing-xxl) var(--spacing-lg)', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)', lineHeight: 1.1 }}>Ace Your Placement</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)' }}>
                    Practice, assess, and prepare for your dream job
                </p>
                <Link
                    to="/dashboard"
                    className="button-primary"
                    style={{ padding: '12px 32px', fontSize: '18px', textDecoration: 'none', display: 'inline-block' }}
                >
                    Get Started
                </Link>
            </section>

            <section className="features" style={{ padding: 'var(--spacing-xxl) var(--spacing-lg)', backgroundColor: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '40px', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>💻</div>
                        <h3>Practice Problems</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Solve thousands of coding and aptitude problems.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '40px', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>📹</div>
                        <h3>Mock Interviews</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Practice with real-time AI mock interview simulations.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '40px', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>📊</div>
                        <h3>Track Progress</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Detailed analytics to track your preparation journey.</p>
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
