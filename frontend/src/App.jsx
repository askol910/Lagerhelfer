import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Laden...</p>
      </div>
    );
  }

  if (!user) {
    return showRegister ? (
      <Register onNavigateToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onNavigateToRegister={() => setShowRegister(true)} />
    );
  }

  return <Dashboard user={user} />;
}

export default App;
