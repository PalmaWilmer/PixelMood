import React, { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const MOOD_DATA = {
  rad:   { emoji: '🤩', label: 'Excelente', color: 'var(--mood-rad)' },
  happy: { emoji: '😊', label: 'Feliz',     color: 'var(--mood-happy)' },
  meh:   { emoji: '😐', label: 'Neutral',   color: 'var(--mood-meh)' },
  sad:   { emoji: '😔', label: 'Triste',    color: 'var(--mood-sad)' },
  bad:   { emoji: '😫', label: 'Muy Triste',color: 'var(--mood-bad)' },
};

const MOOD_FILTERS = ['todos', 'rad', 'happy', 'meh', 'sad', 'bad'];

export const NotesHistory = ({ entries }) => {
  const [filter, setFilter] = useState('todos');

  const sorted = useMemo(() => {
    const filtered = filter === 'todos'
      ? entries
      : entries.filter(e => e.mood === filter);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [entries, filter]);

  if (!entries || entries.length === 0) {
    return (
      <div className="notes-empty glass-panel fade-in">
        <span className="notes-empty-icon">📓</span>
        <p>Aún no tienes reflexiones guardadas.</p>
        <p className="notes-empty-sub">¡Completa tu primera reflexión del día arriba!</p>

        <style>{`
          .notes-empty {
            padding: 48px 32px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .notes-empty-icon { font-size: 2.5rem; }
          .notes-empty p { color: rgba(255,255,255,0.8); font-size: 1rem; }
          .notes-empty-sub { font-size: 0.85rem !important; color: rgba(255,255,255,0.55) !important; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="notes-history-container glass-panel fade-in">
      <div className="notes-header">
        <h2>📓 Mis reflexiones</h2>
        <span className="notes-count">{sorted.length} {sorted.length === 1 ? 'nota' : 'notas'}</span>
      </div>

      {/* Filtro por mood */}
      <div className="mood-filter-bar">
        {MOOD_FILTERS.map(f => {
          const m = MOOD_DATA[f];
          const isActive = filter === f;
          return (
            <button
              key={f}
              className={`filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              style={isActive && m ? { backgroundColor: m.color, borderColor: m.color, color: '#1A1A1A' } : {}}
            >
              {m ? `${m.emoji} ${m.label}` : '✨ Todos'}
            </button>
          );
        })}
      </div>

      {/* Lista de notas */}
      {sorted.length === 0 ? (
        <div className="notes-no-match">
          <p>No hay reflexiones con ese estado de ánimo aún.</p>
        </div>
      ) : (
        <div className="notes-list">
          {sorted.map((entry, i) => {
            const moodInfo = MOOD_DATA[entry.mood] || {};
            const dateObj = parseISO(entry.date);
            return (
              <div
                key={entry.id || entry.date}
                className="note-card fade-in"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div
                  className="note-mood-dot"
                  style={{ backgroundColor: moodInfo.color }}
                  title={moodInfo.label}
                >
                  <span>{moodInfo.emoji}</span>
                </div>
                <div className="note-body">
                  <div className="note-meta">
                    <span className="note-date">
                      {format(dateObj, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                    </span>
                    <span
                      className="note-mood-badge"
                      style={{ backgroundColor: moodInfo.color, color: '#1A1A1A' }}
                    >
                      {moodInfo.label}
                    </span>
                  </div>
                  <p className="note-text">"{entry.note}"</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .notes-history-container {
          padding: 28px 32px;
          max-width: 700px;
          margin: 0 auto;
        }

        .notes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .notes-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }

        .notes-count {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.1);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .mood-filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .filter-chip {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }

        .filter-chip.active {
          font-weight: 700;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .note-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 18px 20px;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .note-card:hover {
          background: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }

        .note-mood-dot {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .note-body {
          flex: 1;
          min-width: 0;
        }

        .note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .note-date {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          text-transform: capitalize;
        }

        .note-mood-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .note-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          font-style: italic;
          word-break: break-word;
        }

        .notes-no-match {
          text-align: center;
          padding: 32px;
          color: rgba(255,255,255,0.55);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};
