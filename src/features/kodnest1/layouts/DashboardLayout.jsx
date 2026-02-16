import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardList, BookOpen, User, Menu, Clock } from 'lucide-react';

const DashboardLayout = () => {
    const base = '/project1';
    const navItems = [
        { name: 'Dashboard', path: `${base}/dashboard`, icon: LayoutDashboard },
        { name: 'Practice', path: `${base}/dashboard/practice`, icon: Code },
        { name: 'History', path: `${base}/dashboard/history`, icon: Clock },
        { name: 'Assessments', path: `${base}/dashboard/assessments`, icon: ClipboardList },
        { name: 'Resources', path: `${base}/dashboard/resources`, icon: BookOpen },
        { name: 'Profile', path: `${base}/dashboard/profile`, icon: User },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 10
            }}>
                <div style={{
                    padding: 'var(--spacing-lg)',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '8px'
                    }}></div>
                    <span style={{ fontWeight: 700, fontSize: '20px', color: 'var(--color-primary)' }}>Placement Prep</span>
                </div>

                <nav style={{ flex: 1, padding: 'var(--spacing-md) 0', backgroundColor: 'var(--color-surface)' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                padding: '12px var(--spacing-lg)',
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                backgroundColor: isActive ? 'rgba(92, 74, 199, 0.1)' : 'transparent',
                                borderLeft: `3px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                                fontWeight: isActive ? 600 : 400,
                                transition: 'all 0.2s ease'
                            })}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
                {/* Header */}
                <header style={{
                    height: '64px',
                    backgroundColor: 'var(--color-surface)',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 var(--spacing-xl)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 5
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <Menu className="mobile-only" size={24} style={{ display: 'none' }} />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Placement Prep</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#E0E0E0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)'
                        }}>
                            JD
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main style={{ padding: 'var(--spacing-xl)', flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
