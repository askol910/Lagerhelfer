import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Auth.css';

const Register = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      // User will be automatically redirected by auth state change
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Diese E-Mail-Adresse wird bereits verwendet';
      case 'auth/invalid-email':
        return 'Ungültige E-Mail-Adresse';
      case 'auth/operation-not-allowed':
        return 'Registrierung ist derzeit nicht möglich';
      case 'auth/weak-password':
        return 'Passwort ist zu schwach';
      default:
        return 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Lagerhelfer</h1>
        <h2>Registrieren</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ihr Name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ihre@email.de"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mindestens 6 Zeichen"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Passwort bestätigen</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Passwort wiederholen"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registrierung...' : 'Registrieren'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Bereits ein Konto?{' '}
            <button
              onClick={onNavigateToLogin}
              className="link-button"
              type="button"
            >
              Anmelden
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
