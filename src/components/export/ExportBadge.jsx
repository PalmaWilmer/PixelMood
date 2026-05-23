import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Copy, Check } from 'lucide-react';

export const ExportBadge = ({ isOpen, onClose, userId }) => {
  const [copied, setCopied] = useState(false);
  
  // En un entorno de producción real, el Supabase Project URL debería provenir de una variable de entorno public
  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pixelmood-svg?user_id=${userId}`;
  
  const markdownCode = `[![My PixelMood](${functionUrl})](https://pixelmood.app)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar a GitHub">
      <div className="export-content">
        <p className="export-desc">
          Copia este código Markdown y pégalo en el <code>README.md</code> de tu perfil de GitHub para mostrar tu cuadrícula de estado de ánimo en tiempo real.
        </p>

        <div className="code-block">
          <code>{markdownCode}</code>
          <button className="copy-btn" onClick={handleCopy} title="Copiar al portapapeles">
            {copied ? <Check size={18} color="var(--mood-happy)" /> : <Copy size={18} />}
          </button>
        </div>

        <div className="preview-section">
          <h3>Vista previa (Mockup)</h3>
          <div className="preview-box">
             {/* Representación visual sencilla para el usuario de que ahí va un SVG */}
             <div className="mock-svg">
                <span className="mock-text">Tu SVG dinámico se renderizará aquí</span>
             </div>
          </div>
        </div>

        <div className="supabase-note">
          <strong>Nota para Supabase Edge Function:</strong>
          <p>Debes desplegar una Edge Function que genere el SVG consumiendo la tabla <code>entries</code> para el <code>user_id</code> especificado.</p>
        </div>
      </div>

      <style>{`
        .export-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .export-desc code {
          background: var(--mood-none);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .code-block {
          background: var(--bg-secondary);
          padding: 16px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
        }

        .code-block code {
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--text-primary);
          word-break: break-all;
          margin-right: 16px;
        }

        .copy-btn {
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .copy-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
        }

        .preview-section h3 {
          font-size: 1rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .preview-box {
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--mood-none);
        }

        .mock-svg {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-style: italic;
        }

        .supabase-note {
          margin-top: 24px;
          padding: 16px;
          background: rgba(212, 175, 55, 0.1);
          border-left: 4px solid var(--accent-gold);
          border-radius: 0 8px 8px 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .supabase-note strong {
          color: var(--accent-gold);
          display: block;
          margin-bottom: 4px;
        }
      `}</style>
    </Modal>
  );
};
