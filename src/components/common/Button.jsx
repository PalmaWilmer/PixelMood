import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = {
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent-button)',
      color: '#1A1A1A',
      boxShadow: '0 4px 14px rgba(110, 224, 235, 0.35)',
      fontWeight: '600',
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
      style={{ ...baseStyles, ...getVariantStyles() }}
      className={`${className} hover-scale`}
      {...props}
    >
      <style>{`
        .hover-scale:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .hover-scale:active {
          transform: translateY(0);
        }
      `}</style>
      {children}
    </button>
  );
};
