import { Position } from '../types/content';
import './Positions.css';

interface PositionsProps {
  positions: Position[];
}

/**
 * Positions of Responsibility section component
 * Renders position entries with chronological sorting (most recent first)
 * Implements Requirements 4.3, 4.4
 */
export function Positions({ positions }: PositionsProps) {
  // Sort position entries chronologically (most recent first)
  const sortedPositions = [...positions].sort((a, b) => {
    // Extract year from duration string (e.g., "August 2022 - May 2024")
    const getEndYear = (duration: string): number => {
      const parts = duration.split('-');
      if (parts.length >= 2) {
        const endPart = parts[parts.length - 1].trim();
        const yearMatch = endPart.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
      }
      return 0;
    };

    const yearA = getEndYear(a.duration);
    const yearB = getEndYear(b.duration);
    return yearB - yearA; // Descending order (most recent first)
  });

  return (
    <section className="positions-section content-section">
      <h2 className="section-title">Positions of Responsibility</h2>
      <div className="positions-list">
        {sortedPositions.map((position, index) => (
          <article key={index} className="position-entry">
            <div className="position-header">
              <div className="position-title-group">
                <h3 className="position-role">{position.role}</h3>
                <p className="position-organization">{position.organization}</p>
              </div>
              <span className="position-duration">{position.duration}</span>
            </div>
            
            {position.responsibilities && position.responsibilities.length > 0 && (
              <div className="position-responsibilities">
                <h4 className="responsibilities-title">Responsibilities:</h4>
                <ul className="responsibilities-list">
                  {position.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
