import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Download, Image } from 'lucide-react';

export const ExportBadge = ({ isOpen, onClose, userId }) => {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    setDone(false);
    try {
      // Importación dinámica de html2canvas para no bloquear la carga inicial
      const html2canvas = (await import('html2canvas')).default;

      // Buscamos el contenedor de la grilla de píxeles
      const gridEl = document.querySelector('.pixel-grid-wrapper');
      if (!gridEl) {
        alert('No se encontró la grilla de píxeles. Asegúrate de tener al menos un día registrado.');
        setExporting(false);
        return;
      }

      const canvas = await html2canvas(gridEl, {
        backgroundColor: '#C664E8',
        scale: 2,           // alta resolución
        useCORS: true,
        logging: false,
      });

      // Descargar como JPG
      const link = document.createElement('a');
      link.download = `pixelmood-${new Date().getFullYear()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();

      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      console.error('Error al exportar:', err);
      alert('Hubo un error al generar la imagen: ' + err.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar mi año">
      <div className="export-content">
        <div className="export-illustration">
          <Image size={56} strokeWidth={1.5} />
        </div>

        <p className="export-desc">
          Descarga una imagen <strong>JPG de alta resolución</strong> con tu cuadrícula de estado de ánimo del año.
          Perfecta para guardar o compartir en redes sociales. 📸
        </p>

        <Button
          onClick={handleExport}
          disabled={exporting}
          style={{ width: '100%', justifyContent: 'center', gap: '10px' }}
        >
          {exporting ? (
            <>Generando imagen...</>
          ) : done ? (
            <>✅ ¡Imagen descargada!</>
          ) : (
            <><Download size={18} /> Descargar JPG</>
          )}
        </Button>

        <p className="export-hint">
          La imagen se guardará como <code>pixelmood-{new Date().getFullYear()}.jpg</code>
        </p>
      </div>

      <style>{`
        .export-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
        }

        .export-illustration {
          width: 90px;
          height: 90px;
          background: rgba(110, 224, 235, 0.15);
          border: 2px solid rgba(110, 224, 235, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6EE0EB;
        }

        .export-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
          max-width: 340px;
        }

        .export-desc strong {
          color: var(--text-primary);
        }

        .export-hint {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: -8px;
        }

        .export-hint code {
          background: var(--mood-none);
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>
    </Modal>
  );
};
