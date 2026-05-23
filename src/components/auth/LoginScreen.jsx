import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const LoginScreen = () => {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        alert('Revisa tu correo para confirmar tu cuenta. Si la confirmación por correo está desactivada en Supabase, intenta iniciar sesión directamente.');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-card fade-in">
        <div className="login-header">
          <h1>PixelMood</h1>
          <p>Un diario minimalista de micro-reflexión diaria.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="email-form">
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
          <Button type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} disabled={loading}>
            {loading ? 'Cargando...' : (isSignUp ? 'Crear cuenta' : 'Iniciar sesión')}
          </Button>
          
          <div className="toggle-mode">
            <span>{isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</span>
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-btn">
              {isSignUp ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </div>
        </form>
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

        .email-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }

        .input-field {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-field:focus {
          border-color: var(--text-primary);
          box-shadow: 0 0 0 2px var(--mood-none);
        }

        .toggle-mode {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .text-btn {
          color: var(--text-primary);
          font-weight: 600;
        }

        .text-btn:hover {
          text-decoration: underline;
        }

        .error-message {
          color: var(--mood-bad);
          background: rgba(219, 154, 135, 0.1);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.85rem;
          border: 1px solid var(--mood-bad);
        }
      `}</style>
    </div>
  );
};
