import React, { useState } from 'react';

export const PixelDay = ({ date, entry, isToday, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'rad': return 'var(--mood-rad)';
      case 'happy': return 'var(--mood-happy)';
      case 'meh': return 'var(--mood-meh)';
      case 'sad': return 'var(--mood-sad)';
      case 'bad': return 'var(--mood-bad)';
      default: return 'var(--mood-none)';
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (entry && onHover) {
      const rect = e.target.getBoundingClientRect();
      onHover(entry, rect, date);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) onHover(null, null, null);
  };

  return (
    <div 
      className={`pixel-day ${isToday ? 'today' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ backgroundColor: getMoodColor(entry?.mood) }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .pixel-day {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          cursor: pointer;
        }

        .pixel-day.hovered {
          transform: scale(1.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 10;
          position: relative;
        }

        .pixel-day.today {
          border: 2px solid var(--text-primary);
        }
      `}</style>
    </div>
  );
};
