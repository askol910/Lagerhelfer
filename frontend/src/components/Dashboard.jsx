import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import SupplierSelection from './SupplierSelection';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Lagerhelfer</h1>
        <div className="user-info">
          <span>Willkommen, {user?.displayName || user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Abmelden
          </button>
        </div>
      </header>
      
      <main className="dashboard-main">
        <SupplierSelection />
      </main>
    </div>
  );
};

export default Dashboard;
