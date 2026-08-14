import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bypassing network call for immediate dashboard access
    localStorage.setItem('token', 'quantum-operator-session');
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>QUANTUM LOGIC VERIFICATION</div>
        <h2 style={styles.title}>System Access Request</h2>
        <p style={styles.subtitle}>Create your credentials to access the Quantum Logic verification dashboard.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Operator ID / Username</label>
            <input
              type="text"
              name="username"
              placeholder="quantum_admin"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Endpoint</label>
            <input
              type="email"
              name="email"
              placeholder="operator@quantum.io"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Access Key (Password)</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Initialize Registration
          </button>
        </form>

        <p style={styles.footerText}>
          Already verified? <Link to="/login" style={styles.link}>Log in to Terminal</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at top, #111827, #030712)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#f9fafb',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#0f172a',
    borderRadius: '16px',
    border: '1px solid #1e293b',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    padding: '32px',
    boxSizing: 'border-box',
  },
  badge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    padding: '6px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#f8fafc',
  },
  subtitle: {
    margin: '0 0 24px 0',
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '8px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
  },
  footerText: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Register;
