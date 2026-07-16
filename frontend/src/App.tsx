import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthForm } from './features/auth/components/AuthForm';
import { DashboardView } from './features/beans/components/DashboardView';
import './App.css';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loader">
        <span className="spinner-large"></span>
        <p>Initializing BeanLog...</p>
      </div>
    );
  }

  return user ? <DashboardView /> : <AuthForm />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
