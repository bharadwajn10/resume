import type { Project } from '../types/content';
import './Projects.css';

interface ProjectsProps {
  projects: Project[];
}

/**
 * Projects section component
 * Renders filtered project list based on active mode
 * Implements Requirements 5.3, 5.4, 5.5
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="projects-section content-section">
      <h2 className="section-title">Projects</h2>
      
      {projects.length === 0 ? (
        <p className="no-projects">No projects to display.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              
              <div className="project-technologies">
                <strong>Technologies:</strong> {project.technologies}
              </div>
              
              <div className="project-description">
                <strong>Description:</strong>
                {/* Format multi-paragraph descriptions properly */}
                {project.description.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
              
              {project.modelComponents && project.modelComponents.length > 0 && (
                <div className="project-model-components">
                  <strong>Model Components:</strong>
                  <ol>
                    {project.modelComponents.map((component, cIndex) => (
                      <li key={cIndex}>{component}</li>
                    ))}
                  </ol>
                </div>
              )}
              
              <div className="project-outcomes">
                <strong>Outcomes:</strong>
                <ul>
                  {project.outcomes.map((outcome, oIndex) => (
                    <li key={oIndex}>{outcome}</li>
                  ))}
                </ul>
              </div>
              
              {project.recognition && (
                <div className="project-recognition">
                  <strong>Recognition:</strong> {project.recognition}
                </div>
              )}
              
              {project.status && (
                <div className="project-status">
                  <strong>Status:</strong> {project.status}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
