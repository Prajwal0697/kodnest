import type { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles/variables.css';
import './styles/main.css';

const Kodnest2Page: FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Project 2</h1>
      <p style={{ marginBottom: '16px' }}>
        Assets and sources from kodnest2 are available under src/features/kodnest2.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/project1">Project 1</Link>
      </div>
      <div style={{ marginTop: '24px', padding: '16px', border: '1px solid var(--border-color, #eee)', borderRadius: 6 }}>
        <div style={{ fontSize: 14, marginBottom: 8 }}>Sample styles loaded from kodnest2</div>
        <button className="btn">Sample Button</button>
      </div>
    </div>
  );
};

export default Kodnest2Page;

