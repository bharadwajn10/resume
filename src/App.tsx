import { useState, useEffect } from 'react';
import { ResumeMode } from './types/theme';
import { ResumeContent } from './types/content';
import { ContentManager } from './utils/ContentManager';
import { themeManager } from './utils/ThemeManager';
import { Header } from './components/Header';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Positions } from './components/Positions';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

function App() {
  // State for current resume mode
  const [mode, setModeState] = useState<ResumeMode>(() => {
    // Initial mode selection logic: check URL first, then default to datascience
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('mode');
    if (urlMode === 'aerospace' || urlMode === 'datascience') {
      return urlMode as ResumeMode;
    }
    // Default to datascience mode
    return 'datascience';
  });

  // State for loaded content data
  const [content, setContent] = useState<ResumeContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Announcement text for screen readers (aria-live region)
  const [modeAnnouncement, setModeAnnouncement] = useState<string>('');

  // Load content on mount
  useEffect(() => {
    const loadResumeContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const loadedContent = await ContentManager.loadContentWithRetry();
        setContent(loadedContent);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load content';
        setError(errorMessage);
        console.error('Error loading content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumeContent();
  }, []);

  // Apply theme when mode changes
  useEffect(() => {
    themeManager.applyThemeForMode(mode);
  }, [mode]);

  // Update SEO meta tags when mode changes - Requirements 8.2
  useEffect(() => {
    const isDS = mode === 'datascience';
    const modeLabel = isDS ? 'Data Science & Machine Learning' : 'Aerospace & Rocketry';
    const description = isDS
      ? 'Professional resume highlighting expertise in Data Science, Machine Learning, and AI-driven systems.'
      : 'Professional resume highlighting expertise in Aerospace Engineering, Rocketry, and IoT systems.';
    const keywords = isDS
      ? 'resume, data science, machine learning, AI, Python, TensorFlow, neural networks'
      : 'resume, aerospace, rocketry, IoT, propulsion, engineering, automation';

    // Update <title>
    document.title = `Master Resume — ${modeLabel}`;

    // Helper to set or create a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', keywords);
    setMeta('meta[property="og:title"]', 'content', `Master Resume — ${modeLabel}`);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', `Master Resume — ${modeLabel}`);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [mode]);

  /**
   * Handle mode switching with theme and content updates
   * Implements Requirements 2.1, 2.2
   */
  const setMode = (newMode: ResumeMode) => {
    // Update state
    setModeState(newMode);
    
    // Announce mode change to screen readers
    const label = newMode === 'datascience' ? 'Data Science / Machine Learning' : 'Aerospace / Rocketry';
    setModeAnnouncement(`Switched to ${label} mode`);

    // Update URL for deep linking
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    window.history.pushState({}, '', url.toString());
    
    // Theme application is handled by useEffect above
    // Content filtering happens automatically through state update
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="app loading-state">
        <main className="loading-container" aria-label="Loading resume">
          <h1>Master Resume</h1>
          <p className="loading-message">Loading resume content...</p>
          <div className="loading-spinner" role="status" aria-label="Loading content"></div>
        </main>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="app error-state">
        <main className="error-container">
          <h1>Master Resume</h1>
          <section className="error-message" role="alert" aria-live="assertive">
            <h2>Unable to Load Content</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              Retry
            </button>
          </section>
        </main>
      </div>
    );
  }

  // Render main content with responsive layout
  return (
    <div className="app">
      {/* Skip link for keyboard users - Requirements 8.4 */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Screen reader live region for mode change announcements - Requirements 8.3 */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {modeAnnouncement}
      </div>

      {content && (
        <>
          <Header 
            personal={content.personal}
            currentMode={mode}
            onModeChange={setMode}
          />
          
          <main id="main-content" className="app-main">
            <div className="resume-container">
              <Education education={content.education} />
              <Experience experience={content.experience} />
              <Positions positions={content.positions} />
              <Projects projects={ContentManager.filterProjects(content, mode)} />
              <Skills skills={content.skills} mode={mode} />
            </div>
          </main>

          <footer className="app-footer">
            <p>&copy; 2024 Master Resume. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
