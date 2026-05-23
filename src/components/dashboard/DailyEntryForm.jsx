import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '../common/Button';

const MOTIVATIONAL_MESSAGES = {
  rad: [
    '¡Qué día tan increíble! Sigue brillando así. ✨',
    '¡Lo estás dando todo! El mundo es tuyo hoy. 🚀',
    '¡Esa energía es contagiosa! Eres imparable. 🌟',
  ],
  happy: [
    '¡Esos días felices son un regalo! Disfrútalos. 🌈',
    'La felicidad que sientes hoy, guárdala para mañana. 💛',
    '¡Qué buena vibra! Sigue así. 😊',
  ],
  meh: [
    'Los días grises también tienen su belleza. Mañana puede ser diferente. 🌤️',
    'Está bien no estar al 100%. Descansa y recarga energías. 💪',
    'Un día neutro es un día que pasaste. ¡Ya es un logro! 🌿',
  ],
  sad: [
    'Las tormentas no duran para siempre. Mañana amanece. 🌧️→☀️',
    'Está bien sentirse triste. Permítete sentir y luego sigue adelante. 💙',
    'Eres más fuerte de lo que crees. Un día a la vez. 🤍',
  ],
  bad: [
    'Los días difíciles también pasan. Eres valiente por seguir. 🔥',
    'Después de la tormenta más fuerte sale el sol más brillante. ☀️',
    'No te rindas. Mañana es una nueva oportunidad. 💜',
  ],
};

const MOOD_DATA = {
  rad:   { emoji: '🤩', label: 'Excelente', color: 'var(--mood-rad)' },
  happy: { emoji: '😊', label: 'Feliz',     color: 'var(--mood-happy)' },
  meh:   { emoji: '😐', label: 'Neutral',   color: 'var(--mood-meh)' },
  sad:   { emoji: '😔', label: 'Triste',    color: 'var(--mood-sad)' },
  bad:   { emoji: '😫', label: 'Muy Triste',color: 'var(--mood-bad)' },
};

const getRandomMessage = (mood) => {
  const messages = MOTIVATIONAL_MESSAGES[mood] || [];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const DailyEntryForm = ({ onSave, initialEntry }) => {
  const [mood, setMood] = useState(initialEntry?.mood || '');
  const [note, setNote] = useState(initialEntry?.note || '');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(!!initialEntry);
  const [motivationalMsg, setMotivationalMsg] = useState(
    initialEntry ? getRandomMessage(initialEntry.mood) : ''
  );
  const maxChars = 280;

  useEffect(() => {
    if (initialEntry) {
      setMood(initialEntry.mood);
      setNote(initialEntry.note);
      setSaved(true);
      setMotivationalMsg(getRandomMessage(initialEntry.mood));
    }
  }, [initialEntry]);

  const moods = [
    { value: 'rad',   emoji: '🤩', label: 'Excelente',  color: 'var(--mood-rad)' },
    { value: 'happy', emoji: '😊', label: 'Feliz',      color: 'var(--mood-happy)' },
    { value: 'meh',   emoji: '😐', label: 'Neutral',    color: 'var(--mood-meh)' },
    { value: 'sad',   emoji: '😔', label: 'Triste',     color: 'var(--mood-sad)' },
    { value: 'bad',   emoji: '😫', label: 'Muy Triste', color: 'var(--mood-bad)' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !note.trim()) return;

    setLoading(true);
    try {
      await onSave({
        date: format(new Date(), 'yyyy-MM-dd'),
        mood,
        note: note.trim(),
      });
      setMotivationalMsg(getRandomMessage(mood));
      setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  // ── Vista POST-guardado ──────────────────────────────────────────────────
  if (saved && mood) {
    const moodInfo = MOOD_DATA[mood];
    const isPositive = mood === 'rad' || mood === 'happy';

    return (
      <div className="daily-form-container glass-panel fade-in">
        <p className="date-display">{format(new Date(), 'dd MMM, yyyy')}</p>

        <div className="saved-state">
          <div
            className="big-emoji-circle"
            style={{ backgroundColor: moodInfo.color }}
          >
            <span className="big-emoji">{moodInfo.emoji}</span>
          </div>

          <p className="saved-label">{moodInfo.label}</p>

          <div className={`motivational-card ${isPositive ? 'positive' : 'neutral'}`}>
            <p className="motivational-msg">{motivationalMsg}</p>
          </div>

          <p className="come-back-msg">
            🗓️ Vuelve mañana por tu próxima reflexión
          </p>
        </div>

        <style>{`
          .saved-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 8px 0 16px;
          }

          .big-emoji-circle {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes popIn {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }

          .big-emoji {
            font-size: 3rem;
          }

          .saved-label {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
          }

          .motivational-card {
            padding: 16px 20px;
            border-radius: 14px;
            text-align: center;
            max-width: 340px;
          }

          .motivational-card.positive {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.35);
          }

          .motivational-card.neutral {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.25);
          }

          .motivational-msg {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--text-primary);
            font-style: italic;
          }

          .come-back-msg {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-top: 4px;
          }

          .date-display {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 16px;
          }
        `}</style>
      </div>
    );
  }

  // ── Vista FORMULARIO ────────────────────────────────────────────────────
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
          background: rgba(255,255,255,0.2);
          border: 2px solid transparent;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .mood-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .mood-btn.selected {
          background: var(--mood-color);
          border-color: rgba(255,255,255,0.8);
          transform: scale(1.1);
        }

        .note-container {
          position: relative;
        }

        .note-input {
          width: 100%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 16px;
          color: var(--text-primary);
          font-size: 1rem;
          resize: none;
          transition: border-color 0.2s ease;
        }

        .note-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .note-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.2);
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
