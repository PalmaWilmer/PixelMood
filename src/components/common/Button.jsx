import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', style = {}, ...props }) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '9999px', // Ovalado (pill shape)
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--button-bg)',
      color: 'var(--button-text)',
      boxShadow: 'var(--button-shadow)',
    },
    secondary: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.35)',
      backdropFilter: 'blur(8px)',
    },
    danger: {
      backgroundColor: 'var(--mood-bad)',
      color: '#fff',
    }
  };

  const getVariantStyles = () => variants[variant] || variants.primary;

  return (
    <button
      style={{ ...baseStyles, ...getVariantStyles(), ...style }}
      className={`${className} hover-scale`}
      {...props}
    >
      <style>{`
        .hover-scale {
          cursor: pointer;
        }
        .hover-scale:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }
        .hover-scale:active:not(:disabled) {
          transform: translateY(0);
        }
        .hover-scale:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          filter: grayscale(0.5);
        }
      `}</style>
      {children}
    </button>
  );
};
