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
      backgroundColor: 'var(--text-primary)',
      color: 'var(--bg-primary)',
      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
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
