/**
 * Integration tests for mode switching flow
 * Tests the complete toggle → theme → filter → UI update pipeline
 * Requirements: 2.1, 2.5, 3.1, 3.2
 */
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import type { ResumeContent } from '../types/content';

// Mock ContentManager to avoid real fetch calls
// Note: vi.mock is hoisted, so we cannot reference top-level variables inside the factory.
vi.mock('../utils/ContentManager', () => ({
  ContentManager: {
    loadContentWithRetry: vi.fn().mockResolvedValue({
      personal: {
        name: 'Test User',
        title: 'Engineer',
        email: 'test@example.com',
        phone: '123',
        linkedin: 'linkedin.com/test',
        github: 'github.com/test',
        location: 'Test City',
        summaryDataScience: 'Data science summary.',
        summaryAerospace: 'Aerospace summary.',
      },
      education: [],
      experience: [],
      positions: [],
      projectsDS: [
        {
          title: 'DS Project',
          technologies: 'Python',
          description: 'A data science project.',
          outcomes: ['Outcome 1'],
        },
      ],
      projectsAero: [
        {
          title: 'Aero Project',
          technologies: 'C++',
          description: 'An aerospace project.',
          outcomes: ['Outcome A'],
        },
      ],
      skills: [],
    }),
    filterProjects: (content: ResumeContent, mode: 'datascience' | 'aerospace') =>
      mode === 'datascience' ? content.projectsDS : content.projectsAero,
  },
}));

// Mock ThemeManager to avoid DOM side-effects
vi.mock('../utils/ThemeManager', () => ({
  ThemeManager: class {
    getTheme() { return {}; }
    applyTheme() {}
    applyThemeForMode() {}
  },
  themeManager: { applyThemeForMode: vi.fn() },
}));

describe('Mode switching integration', () => {
  beforeEach(() => {
    // Reset URL to default
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('App renders in datascience mode by default', async () => {
    await act(async () => {
      render(<App />);
    });

    // DS project should be visible, Aero project should not
    expect(screen.getByText('DS Project')).toBeTruthy();
    expect(screen.queryByText('Aero Project')).toBeNull();
  });

  test('Toggle switches from datascience to aerospace mode', async () => {
    await act(async () => {
      render(<App />);
    });

    // Initially DS project is shown
    expect(screen.getByText('DS Project')).toBeTruthy();

    // Click the toggle button
    const toggleButton = screen.getByRole('button', { name: /switch to aerospace/i });
    await act(async () => {
      fireEvent.click(toggleButton);
    });

    // Now Aero project should be shown, DS project hidden
    expect(screen.getByText('Aero Project')).toBeTruthy();
    expect(screen.queryByText('DS Project')).toBeNull();
  });

  test('Toggle updates URL state on mode change', async () => {
    await act(async () => {
      render(<App />);
    });

    const toggleButton = screen.getByRole('button', { name: /switch to aerospace/i });
    await act(async () => {
      fireEvent.click(toggleButton);
    });

    // URL should reflect the new mode
    const params = new URLSearchParams(window.location.search);
    expect(params.get('mode')).toBe('aerospace');
  });

  test('Toggle switches back from aerospace to datascience', async () => {
    await act(async () => {
      render(<App />);
    });

    const toggleToAero = screen.getByRole('button', { name: /switch to aerospace/i });
    await act(async () => {
      fireEvent.click(toggleToAero);
    });

    // Now in aerospace mode — toggle back
    const toggleToDS = screen.getByRole('button', { name: /switch to data science/i });
    await act(async () => {
      fireEvent.click(toggleToDS);
    });

    expect(screen.getByText('DS Project')).toBeTruthy();
    expect(screen.queryByText('Aero Project')).toBeNull();
  });

  test('App reads mode from URL on initial load', async () => {
    // Set URL to aerospace mode before rendering
    window.history.replaceState({}, '', '/?mode=aerospace');

    await act(async () => {
      render(<App />);
    });

    // Aero project should be shown immediately
    expect(screen.getByText('Aero Project')).toBeTruthy();
    expect(screen.queryByText('DS Project')).toBeNull();
  });

  test('Summary text updates when mode changes', async () => {
    await act(async () => {
      render(<App />);
    });

    // DS summary should be visible initially
    expect(screen.getByText('Data science summary.')).toBeTruthy();

    const toggleButton = screen.getByRole('button', { name: /switch to aerospace/i });
    await act(async () => {
      fireEvent.click(toggleButton);
    });

    // Aerospace summary should now be visible
    expect(screen.getByText('Aerospace summary.')).toBeTruthy();
  });
});
