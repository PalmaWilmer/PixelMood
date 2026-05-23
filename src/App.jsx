import React from 'react';
import { useAuth } from './context/AuthContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // O un spinner
  }

  return (
    <>
      {user ? <Dashboard /> : <LoginScreen />}
    </>
  );
}

export default App;
