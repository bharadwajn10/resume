import { ResumeMode } from '../types/theme';
import { PersonalInfo } from '../types/content';
import { ModeToggle } from './ModeToggle';
import './Header.css';

interface HeaderProps {
  personal: PersonalInfo;
  currentMode: ResumeMode;
  onModeChange: (mode: ResumeMode) => void;
}

/**
 * Header component displays personal information, contact details, and mode toggle
 * Implements Requirements 1.2
 */
export function Header({ personal, currentMode, onModeChange }: HeaderProps) {
  return (
    <header className="resume-header">
      <div className="header-container">
        <div className="header-top">
          <div className="personal-info">
            <h1 className="name">{personal.name}</h1>
            <p className="title">{personal.title}</p>
          </div>
          <ModeToggle currentMode={currentMode} onModeChange={onModeChange} />
        </div>

        <div className="contact-info">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="contact-link">
              <span className="contact-icon" aria-hidden="true">✉</span>
              {personal.email}
            </a>
          )}
          {personal.phone && (
            <a href={`tel:${personal.phone}`} className="contact-link">
              <span className="contact-icon" aria-hidden="true">📞</span>
              {personal.phone}
            </a>
          )}
          {personal.linkedin && (
            <a 
              href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-icon" aria-hidden="true">💼</span>
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a 
              href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-icon" aria-hidden="true">🔗</span>
              GitHub
            </a>
          )}
          {personal.location && (
            <span className="contact-item">
              <span className="contact-icon" aria-hidden="true">📍</span>
              {personal.location}
            </span>
          )}
        </div>

        <div className="summary-section">
          <p className="summary-text">
            {currentMode === 'datascience' 
              ? personal.summaryDataScience 
              : personal.summaryAerospace}
          </p>
        </div>
      </div>
    </header>
  );
}
