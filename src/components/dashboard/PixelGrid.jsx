import React, { useMemo, useState } from 'react';
import { startOfYear, endOfYear, eachDayOfInterval, format, getMonth, isSameDay } from 'date-fns';
import { PixelDay } from './PixelDay';

export const PixelGrid = ({ entries }) => {
  const [tooltipInfo, setTooltipInfo] = useState(null);

  const today = new Date();
  
  const daysInYear = useMemo(() => {
    const start = startOfYear(today);
    const end = endOfYear(today);
    return eachDayOfInterval({ start, end });
  }, [today]);

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  // Group days by month
  const daysByMonth = useMemo(() => {
    const grouped = Array(12).fill([]).map(() => []);
    daysInYear.forEach(day => {
      const monthIndex = getMonth(day);
      grouped[monthIndex].push(day);
    });
    return grouped;
  }, [daysInYear]);

  const getEntryForDay = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return entries.find(e => e.date === dateStr);
  };

  const handlePixelHover = (entry, rect, date) => {
    if (!entry && !date) {
      setTooltipInfo(null);
      return;
    }
    
    setTooltipInfo({
      entry,
      date,
      x: rect ? rect.left + rect.width / 2 : 0,
      y: rect ? rect.top : 0
    });
  };

  return (
    <div className="pixel-grid-wrapper">
      <div className="pixel-grid-container">
        {daysByMonth.map((monthDays, index) => (
          <div key={index} className="month-column">
            <span className="month-label">{months[index]}</span>
            <div className="days-grid">
              {monthDays.map((day, i) => (
                <PixelDay 
                  key={i} 
                  date={day}
                  isToday={isSameDay(day, today)}
                  entry={getEntryForDay(day)}
                  onHover={handlePixelHover}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {tooltipInfo && (
        <div 
          className="pixel-tooltip fade-in"
          style={{ 
            left: `${tooltipInfo.x}px`, 
            top: `${tooltipInfo.y}px`,
            opacity: 1
          }}
        >
          <div className="tooltip-date">{format(tooltipInfo.date, 'dd MMM yyyy')}</div>
          {tooltipInfo.entry ? (
            <div className="tooltip-note">"{tooltipInfo.entry.note}"</div>
          ) : (
            <div className="tooltip-empty">Sin registro</div>
          )}
        </div>
      )}

      <style>{`
        .pixel-grid-wrapper {
          position: relative;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .month-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: calc((14px * 5) + (4px * 4)); /* approx width of month */
        }

        .month-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .days-grid {
          display: grid;
          grid-template-rows: repeat(7, 1fr);
          grid-auto-flow: column;
          gap: 4px;
        }

        .tooltip-date {
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .tooltip-note {
          font-style: italic;
        }
        
        .tooltip-empty {
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
