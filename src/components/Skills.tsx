import type { SkillCategory } from '../types/content';
import type { ResumeMode } from '../types/theme';
import './Skills.css';

interface SkillsProps {
  skills: SkillCategory[];
  mode: ResumeMode;
}

/**
 * Skills section component with mode-specific filtering
 * Displays relevant skill categories based on active mode
 * Implements Requirements 5.1, 5.2
 */
export function Skills({ skills, mode }: SkillsProps) {
  /**
   * Filter skills based on active mode
   * - Data Science mode: show "Data Science & Machine Learning" + shared skills
   * - Aerospace mode: show "Aerospace & Engineering" + shared skills
   * - Shared skills: "General Technical Skills" and "Soft Skills" always shown
   */
  const filteredSkills = skills.filter((skillCategory) => {
    const category = skillCategory.category.toLowerCase();
    
    // Always show general and soft skills
    if (category.includes('general') || category.includes('soft')) {
      return true;
    }
    
    // Show Data Science skills in datascience mode
    if (mode === 'datascience' && 
        (category.includes('data science') || category.includes('machine learning'))) {
      return true;
    }
    
    // Show Aerospace skills in aerospace mode
    if (mode === 'aerospace' && 
        (category.includes('aerospace') || category.includes('engineering'))) {
      return true;
    }
    
    return false;
  });

  return (
    <section className="skills-section content-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-list">
        {filteredSkills.map((skillCategory, index) => (
          <article key={index} className="skill-category">
            <h3 className="skill-category-title">{skillCategory.category}</h3>
            <div className="skill-items">
              {Object.entries(skillCategory.skills).map(([skillName, skillValue], skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  {skillName !== 'items' ? (
                    <>
                      <strong className="skill-name">{skillName}:</strong>
                      <span className="skill-value"> {skillValue}</span>
                    </>
                  ) : (
                    <span className="skill-value">{skillValue}</span>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
