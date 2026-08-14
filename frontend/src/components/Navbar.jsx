import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logoDot}>●</span> QUANTUM LOGIC
      </div>
      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Terminate Session</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#0b0f19',
    borderBottom: '1px solid #1e293b',
  },
  brand: {
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoDot: {
    color: '#38bdf8',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  registerLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    padding: '6px 14px',
    borderRadius: '6px',
  },
  logoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Navbar;
