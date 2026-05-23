import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEntries, upsertEntry } from '../../services/api';
import { PixelGrid } from './PixelGrid';
import { DailyEntryForm } from './DailyEntryForm';
import { NotesHistory } from './NotesHistory';
import { ExportBadge } from '../export/ExportBadge';
import { LogOut, Share2 } from 'lucide-react';
import { Button } from '../common/Button';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      try {
        const data = await getEntries(user.id);
        setEntries(data);
      } catch (err) {
        console.error('Error fetching entries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [user]);

  const handleSaveEntry = async (entryData) => {
    try {
      const saved = await upsertEntry({ ...entryData, user_id: user.id });
      setEntries(prev => {
        const filtered = prev.filter(e => e.date !== saved.date);
        return [...filtered, saved];
      });
    } catch (err) {
      console.error('Error saving entry:', err);
      alert('Hubo un error al guardar tu reflexión: ' + err.message + '\n\nAsegúrate de haber creado la tabla "entries" en tu base de datos Supabase ejecutando el script proporcionado.');
    }
  };

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayEntry = entries.find(e => e.date === todayStr);

  if (loading) return <div className="loading-state">Cargando tu diario...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>PixelMood</h1>
        </div>
        <div className="header-right">
          <Button variant="secondary" onClick={() => setShowExport(true)}>
            <Share2 size={16} /> Mi año
          </Button>
          <button className="logout-btn" onClick={signOut} title="Cerrar sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="grid-section fade-in">
          <h2>Tu año en píxeles</h2>
          <PixelGrid entries={entries} />
        </div>

        <div className="form-section">
          <DailyEntryForm onSave={handleSaveEntry} initialEntry={todayEntry} />
        </div>

        <div className="notes-section fade-in">
          <NotesHistory entries={entries} />
        </div>
      </main>

      <ExportBadge 
        isOpen={showExport} 
        onClose={() => setShowExport(false)} 
        userId={user.id} 
      />

      <style>{`
        .dashboard-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 32px 20px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logout-btn {
          color: rgba(255,255,255,0.7);
          transition: color 0.2s ease;
        }

        .logout-btn:hover {
          color: #fff;
        }

        .grid-section h2 {
          font-size: 1.25rem;
          margin-bottom: 16px;
          color: rgba(255,255,255,0.8);
        }

        .form-section {
          margin-bottom: 32px;
        }

        .notes-section {
          margin-top: 8px;
          margin-bottom: 48px;
        }

        .loading-state {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 1.25rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
