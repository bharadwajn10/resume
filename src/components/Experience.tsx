import { WorkExperience } from '../types/content';
import './Experience.css';

interface ExperienceProps {
  experience: WorkExperience[];
}

/**
 * Work Experience section component
 * Renders experience entries with chronological sorting (most recent first)
 * Implements Requirements 4.2, 4.4
 */
export function Experience({ experience }: ExperienceProps) {
  // Sort experience entries chronologically (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    // Extract year from duration string (e.g., "June 2023 - August 2023")
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
    <section className="experience-section content-section">
      <h2 className="section-title">Work Experience</h2>
      <div className="experience-list">
        {sortedExperience.map((exp, index) => (
          <article key={index} className="experience-entry">
            <div className="experience-header">
              <div className="experience-title-group">
                <h3 className="experience-position">{exp.position}</h3>
                <p className="experience-company">
                  {exp.company || exp.institution}
                </p>
              </div>
              <span className="experience-duration">{exp.duration}</span>
            </div>
            <p className="experience-location">{exp.location}</p>
            
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="experience-responsibilities">
                <h4 className="responsibilities-title">Responsibilities:</h4>
                <ul className="responsibilities-list">
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="experience-achievements">
                <h4 className="achievements-title">Achievements:</h4>
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
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
