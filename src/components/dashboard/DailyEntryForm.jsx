import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '../common/Button';

export const DailyEntryForm = ({ onSave, initialEntry }) => {
  const [mood, setMood] = useState(initialEntry?.mood || '');
  const [note, setNote] = useState(initialEntry?.note || '');
  const [loading, setLoading] = useState(false);
  const maxChars = 280;

  useEffect(() => {
    if (initialEntry) {
      setMood(initialEntry.mood);
      setNote(initialEntry.note);
    }
  }, [initialEntry]);

  const moods = [
    { value: 'rad', emoji: '🤩', label: 'Excelente', color: 'var(--mood-rad)' },
    { value: 'happy', emoji: '😊', label: 'Feliz', color: 'var(--mood-happy)' },
    { value: 'meh', emoji: '😐', label: 'Neutral', color: 'var(--mood-meh)' },
    { value: 'sad', emoji: '😔', label: 'Triste', color: 'var(--mood-sad)' },
    { value: 'bad', emoji: '😫', label: 'Muy Triste', color: 'var(--mood-bad)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !note.trim()) return;
    
    setLoading(true);
    try {
      await onSave({
        date: format(new Date(), 'yyyy-MM-dd'),
        mood,
        note: note.trim()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daily-form-container glass-panel fade-in">
      <h3>¿Cómo estuvo tu día hoy?</h3>
      <p className="date-display">{format(new Date(), 'dd MMM, yyyy')}</p>

      <form onSubmit={handleSubmit}>
        <div className="mood-selector">
          {moods.map(m => (
            <button
              key={m.value}
              type="button"
              className={`mood-btn ${mood === m.value ? 'selected' : ''}`}
              onClick={() => setMood(m.value)}
              title={m.label}
              style={{ '--mood-color': m.color }}
            >
              <span className="emoji">{m.emoji}</span>
            </button>
          ))}
        </div>

        <div className="note-container">
          <textarea
            placeholder="Escribe una frase que resuma tu día..."
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, maxChars))}
            rows={3}
            className="note-input"
          />
          <div className="char-counter">
            {note.length}/{maxChars}
          </div>
        </div>

        <Button type="submit" style={{ width: '100%', marginTop: '16px' }} disabled={loading || !mood || !note.trim()}>
          {loading ? 'Guardando...' : 'Guardar Reflexión'}
        </Button>
      </form>

      <style>{`
        .daily-form-container {
          padding: 32px;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }

        .daily-form-container h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .date-display {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        .mood-selector {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .mood-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          background: var(--bg-primary);
          border: 2px solid transparent;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .mood-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .mood-btn.selected {
          background: var(--mood-color);
          border-color: var(--text-primary);
          transform: scale(1.1);
        }

        .note-container {
          position: relative;
        }

        .note-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          color: var(--text-primary);
          font-size: 1rem;
          resize: none;
          transition: border-color 0.2s ease;
        }

        .note-input:focus {
          outline: none;
          border-color: var(--text-primary);
        }

        .char-counter {
          position: absolute;
          bottom: 12px;
          right: 12px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
