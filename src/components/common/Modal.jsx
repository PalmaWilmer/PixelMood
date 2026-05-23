import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content fade-in">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="close-btn" aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justifyContent: center;
          z-index: 100;
          padding: 20px;
        }
        
        .modal-content {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .close-btn {
          color: var(--text-secondary);
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
        }
        
        .close-btn:hover {
          color: var(--text-primary);
          background: var(--mood-none);
        }
        
        .modal-body {
          padding: 24px;
        }
      `}</style>
    </div>
  );
};
