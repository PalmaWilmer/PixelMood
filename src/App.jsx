import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { Dashboard } from './components/dashboard/Dashboard';
import { Sun, Moon } from 'lucide-react';

function App() {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('pixelmood-theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pixelmood-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  }

  return (
    <>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-btn glass-panel"
        title="Alternar modo claro/oscuro"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {user ? <Dashboard /> : <LoginScreen />}
    </>
  );
}

export default App;
