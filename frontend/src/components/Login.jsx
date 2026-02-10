import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Auth.css';

const Login = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User will be automatically redirected by auth state change
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Ungültige E-Mail-Adresse';
      case 'auth/user-disabled':
        return 'Dieser Benutzer wurde deaktiviert';
      case 'auth/user-not-found':
        return 'Benutzer nicht gefunden';
      case 'auth/wrong-password':
        return 'Falsches Passwort';
      default:
        return 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.';
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Lagerhelfer</h1>
        <h2>Anmelden</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
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
              placeholder="Passwort"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Anmeldung...' : 'Anmelden'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Noch kein Konto?{' '}
            <button
              onClick={onNavigateToRegister}
              className="link-button"
              type="button"
            >
              Registrieren
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
