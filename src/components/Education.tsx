import { Education as EducationType } from '../types/content';
import './Education.css';

interface EducationProps {
  education: EducationType[];
}

/**
 * Education section component
 * Renders education entries with chronological sorting (most recent first)
 * Implements Requirements 4.1, 4.4
 */
export function Education({ education }: EducationProps) {
  // Sort education entries chronologically (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    // Extract year from duration string (e.g., "August 2020 - May 2024" or "2018 - 2020")
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
    <section className="education-section content-section">
      <h2 className="section-title">Education</h2>
      <div className="education-list">
        {sortedEducation.map((edu, index) => (
          <article key={index} className="education-entry">
            <div className="education-header">
              <h3 className="education-degree">{edu.degree}</h3>
              <span className="education-duration">{edu.duration}</span>
            </div>
            <div className="education-details">
              <p className="education-institution">{edu.institution}</p>
              <p className="education-location">{edu.location}</p>
              {edu.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}
              {edu.grade && <p className="education-grade">Grade: {edu.grade}</p>}
            </div>
            {edu.achievements && edu.achievements.length > 0 && (
              <div className="education-achievements">
                <h4 className="achievements-title">Achievements:</h4>
                <ul className="achievements-list">
                  {edu.achievements.map((achievement, achIndex) => (
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
