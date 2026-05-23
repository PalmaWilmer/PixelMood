import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Mail } from 'lucide-react';

export const LoginScreen = () => {
  const { signInWithGitHub, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        alert('Revisa tu correo para confirmar tu cuenta.');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setError(null);
    try {
      if (provider === 'github') await signInWithGitHub();
      if (provider === 'google') await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-card fade-in">
        <div className="login-header">
          <div className="logo-placeholder"></div>
          <h1>PixelMood</h1>
          <p>Un diario minimalista de micro-reflexión diaria.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!isEmailMode ? (
          <div className="auth-buttons">
            <Button onClick={() => handleOAuth('github')} style={{ width: '100%', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                <path d="M10 20l-3-1-2-4"></path>
              </svg>
              Continuar con GitHub
            </Button>
            <Button onClick={() => handleOAuth('google')} variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </Button>
            <div className="divider">o</div>
            <Button onClick={() => setIsEmailMode(true)} variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Mail size={20} /> Continuar con Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="email-form">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <Button type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={loading}>
              {loading ? 'Cargando...' : (isSignUp ? 'Crear cuenta' : 'Iniciar sesión')}
            </Button>
            <div className="toggle-mode">
              <span>{isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</span>
              <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-btn">
                {isSignUp ? 'Inicia sesión' : 'Regístrate'}
              </button>
            </div>
            <button type="button" onClick={() => setIsEmailMode(false)} className="text-btn back-btn">
              Volver a opciones
            </button>
          </form>
        )}
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(circle at 50% -20%, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          text-align: center;
        }

        .login-header h1 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .login-header p {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .divider {
          margin: 16px 0;
          color: var(--text-secondary);
          font-size: 0.85rem;
          position: relative;
        }

        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: var(--border-color);
        }

        .divider::before { left: 0; }
        .divider::after { right: 0; }

        .email-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .input-field {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s ease;
        }

        .input-field:focus {
          border-color: var(--text-primary);
        }

        .toggle-mode {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .text-btn {
          color: var(--text-primary);
          font-weight: 500;
        }

        .text-btn:hover {
          text-decoration: underline;
        }

        .back-btn {
          margin-top: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .error-message {
          color: var(--mood-bad);
          background: rgba(219, 154, 135, 0.1);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};
