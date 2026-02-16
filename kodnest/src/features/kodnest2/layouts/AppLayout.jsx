import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            <nav style={{
                height: '64px',
                borderBottom: '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 100
            }}>
                <div style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'Playfair Display, serif' }}>
                    AI Resume Builder
                </div>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <NavLink to="/builder" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? 'var(--color-primary)' : '#666666',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '14px'
                    })}>
                        Builder
                    </NavLink>
                    <NavLink to="/preview" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? 'var(--color-primary)' : '#666666',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '14px'
                    })}>
                        Preview
                    </NavLink>
                    <NavLink to="/rb/proof" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? 'var(--color-primary)' : '#666666',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '14px'
                    })}>
                        Proof
                    </NavLink>
                </div>
                {/* Visual balance spacer */}
                <div style={{ width: '140px', display: 'flex', justifyContent: 'flex-end' }}>
                    <a href="/rb/01-problem" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>
                        Build Track ↗
                    </a>
                </div>
            </nav>
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
