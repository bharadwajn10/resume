import {
  Theme,
  ResumeMode,
  DATA_SCIENCE_THEME,
  AEROSPACE_THEME,
} from '../types/theme';

export class ThemeManager {
  /**
   * Get the theme configuration for a given resume mode
   * @param mode - The resume mode ('datascience' or 'aerospace')
   * @returns The theme object for the specified mode
   */
  getTheme(mode: ResumeMode): Theme {
    switch (mode) {
      case 'datascience':
        return DATA_SCIENCE_THEME;
      case 'aerospace':
        return AEROSPACE_THEME;
      default:
        // Fallback to data science theme for invalid modes
        console.warn(`Invalid mode: ${mode}, defaulting to datascience theme`);
        return DATA_SCIENCE_THEME;
    }
  }

  /**
   * Apply a theme to the document by setting CSS custom properties
   * @param theme - The theme object to apply
   * @throws Error if theme application fails
   */
  applyTheme(theme: Theme): void {
    try {
      const root = document.documentElement;

      // Check if CSS custom properties are supported
      if (CSS.supports('color', 'var(--primary)')) {
        // Apply color variables
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-background', theme.colors.background);
        root.style.setProperty('--color-text', theme.colors.text);
        root.style.setProperty('--color-accent', theme.colors.accent);

        // Apply typography variables
        root.style.setProperty('--font-heading', theme.typography.headingFont);
        root.style.setProperty('--font-body', theme.typography.bodyFont);

        // Apply background image if provided
        if (theme.backgroundImage) {
          root.style.setProperty(
            '--background-image',
            theme.backgroundImage
          );
        }
      } else {
        // Fallback for browsers that don't support CSS custom properties
        this.applyThemeFallback(theme);
      }
    } catch (error) {
      console.error('Failed to apply theme:', error);
      throw new Error(
        `Theme application failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Fallback method for applying themes in browsers without CSS custom property support
   * @param theme - The theme object to apply
   */
  private applyThemeFallback(theme: Theme): void {
    // For older browsers, we would apply inline styles or predefined CSS classes
    // This is a simplified fallback implementation
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.name.toLowerCase().replace(/\s+/g, '-'));
  }

  /**
   * Apply theme based on resume mode
   * @param mode - The resume mode to apply theme for
   */
  applyThemeForMode(mode: ResumeMode): void {
    const theme = this.getTheme(mode);
    this.applyTheme(theme);
  }
}

// Export a singleton instance
export const themeManager = new ThemeManager();
