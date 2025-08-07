import React from 'react';
import { useLocation } from 'react-router-dom';

const EmailSent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const title = '📬 Almost there!';
  const message =
    role === 'vendor'
      ? 'Thanks for signing up as a vendor. Please verify your email to continue onboarding your business.'
      : 'Thanks for joining! Please verify your email to activate your account.';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{title}</h2>
        <p>{message}</p>
        <p style={styles.note}>Check your spam folder if you don’t see the email in your inbox.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    padding: '1rem',
  },
  card: {
    padding: '2.5rem',
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  note: {
    fontSize: '0.9rem',
    color: '#777',
    marginTop: '1.5rem',
  },
};

export default EmailSent;
