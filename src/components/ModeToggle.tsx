import { ResumeMode } from '../types/theme';
import './ModeToggle.css';

interface ModeToggleProps {
  currentMode: ResumeMode;
  onModeChange: (mode: ResumeMode) => void;
}

export function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  const handleToggle = () => {
    const newMode: ResumeMode = currentMode === 'datascience' ? 'aerospace' : 'datascience';
    onModeChange(newMode);
  };

  const isAerospace = currentMode === 'aerospace';

  return (
    <div className="mode-toggle-container">
      <button
        type="button"
        className={`mode-toggle ${currentMode}`}
        onClick={handleToggle}
        aria-label={`Switch to ${isAerospace ? 'Data Science' : 'Aerospace'} mode. Currently in ${isAerospace ? 'Aerospace' : 'Data Science'} mode`}
        aria-pressed={isAerospace}
      >
        <span className="toggle-track">
          <span className="toggle-option datascience" data-active={currentMode === 'datascience'}>
            Data Science
          </span>
          <span className="toggle-option aerospace" data-active={currentMode === 'aerospace'}>
            Aerospace
          </span>
          <span className={`toggle-slider ${currentMode}`} />
        </span>
      </button>
    </div>
  );
}
