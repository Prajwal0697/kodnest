import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTestPassed, setIsTestPassed] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const saved = localStorage.getItem('jobTrackerTestChecklist');
            if (saved) {
                const checklist = JSON.parse(saved);
                const count = Object.values(checklist).filter(v => v).length;
                setIsTestPassed(count === 10);
            } else {
                setIsTestPassed(false);
            }
        };

        checkStatus();
        // Re-check on every navigation to capture checklist updates
        const interval = setInterval(checkStatus, 1000);
        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Project 1', path: '/project1' },
        { name: 'Project 2', path: '/project2' },
        { name: 'My Saved', path: '/saved' },
        { name: 'Daily Digest', path: '/digest' },
        { name: 'Preferences', path: '/settings' },
        { name: 'Verification', path: '/jt/07-test' },
        { name: 'Ship IT', path: '/jt/08-ship', locked: !isTestPassed },
    ];

    const linkStyle = (isActive: boolean, locked: boolean = false) => ({
        textDecoration: 'none',
        color: locked ? 'rgba(17, 17, 17, 0.3)' : (isActive ? 'var(--accent-color)' : 'var(--text-primary)'),
        fontSize: '14px',
        fontWeight: isActive ? 700 : 500,
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'all 200ms ease',
        backgroundColor: isActive ? 'rgba(211, 47, 47, 0.05)' : 'transparent',
        pointerEvents: locked ? 'none' as const : 'auto' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    });

    return (
        <nav style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 var(--space-3)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{
                height: '64px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <NavLink to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--accent-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '18px' }}>K</div>
                    <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>KODNEST <span style={{ color: 'var(--accent-color)' }}>PREMIUM</span></span>
                </NavLink>

                {/* Desktop Nav */}
                <div style={{ display: 'none' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            style={({ isActive }) => linkStyle(isActive, link.locked)}
                        >
                            {link.name}
                            {link.locked && <span style={{ fontSize: '10px' }}>🔒</span>}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile menu button */}
                <button onClick={() => setIsOpen(!isOpen)} style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                }} className="mobile-menu-btn">
                    <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)', marginBottom: '5px' }}></div>
                    <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)', marginBottom: '5px' }}></div>
                    <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)' }}></div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '64px',
                    left: 0,
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid var(--border-color)',
                    padding: '16px',
                    zIndex: 999
                }}>
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => !link.locked && setIsOpen(false)}
                            style={({ isActive }) => ({
                                ...linkStyle(isActive, link.locked),
                                display: 'block',
                                marginBottom: '8px'
                            })}
                        >
                            {link.name}
                            {link.locked && <span style={{ fontSize: '10px', marginLeft: '8px' }}>🔒 Locked</span>}
                        </NavLink>
                    ))}
                </div>
            )}

            <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; align-items: center; gap: 4px; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navigation;
