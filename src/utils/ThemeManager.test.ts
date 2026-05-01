import { describe, test, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { ThemeManager } from './ThemeManager';
import { ResumeMode, DATA_SCIENCE_THEME, AEROSPACE_THEME } from '../types/theme';
import { getContrastRatio } from './colorContrast';

describe('ThemeManager', () => {
  let themeManager: ThemeManager;

  beforeEach(() => {
    themeManager = new ThemeManager();
  });

  /**
   * Feature: github-master-resume, Property 6: Theme application correctness
   * Validates: Requirements 3.1, 3.2
   *
   * Property: For any active resume mode, the applied theme should match the mode
   * (Data Science theme for datascience mode, Aerospace theme for aerospace mode)
   */
  test('Property 6: Theme application correctness', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<ResumeMode>('datascience', 'aerospace'),
        (mode) => {
          const theme = themeManager.getTheme(mode);

          // Verify that the correct theme is returned for each mode
          if (mode === 'datascience') {
            return (
              theme.name === DATA_SCIENCE_THEME.name &&
              theme.colors.primary === DATA_SCIENCE_THEME.colors.primary &&
              theme.colors.secondary === DATA_SCIENCE_THEME.colors.secondary &&
              theme.colors.background === DATA_SCIENCE_THEME.colors.background &&
              theme.colors.text === DATA_SCIENCE_THEME.colors.text &&
              theme.colors.accent === DATA_SCIENCE_THEME.colors.accent
            );
          } else {
            // mode === 'aerospace'
            return (
              theme.name === AEROSPACE_THEME.name &&
              theme.colors.primary === AEROSPACE_THEME.colors.primary &&
              theme.colors.secondary === AEROSPACE_THEME.colors.secondary &&
              theme.colors.background === AEROSPACE_THEME.colors.background &&
              theme.colors.text === AEROSPACE_THEME.colors.text &&
              theme.colors.accent === AEROSPACE_THEME.colors.accent
            );
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Unit test to verify theme retrieval
  test('getTheme returns Data Science theme for datascience mode', () => {
    const theme = themeManager.getTheme('datascience');
    expect(theme).toEqual(DATA_SCIENCE_THEME);
  });

  test('getTheme returns Aerospace theme for aerospace mode', () => {
    const theme = themeManager.getTheme('aerospace');
    expect(theme).toEqual(AEROSPACE_THEME);
  });

  /**
   * Feature: github-master-resume, Property 7: Color contrast accessibility
   * Validates: Requirements 3.5, 8.4
   *
   * Property: For any theme color combination used for text and background,
   * the contrast ratio should meet or exceed WCAG 2.1 Level AA standards
   * (4.5:1 for normal text, 3:1 for large text)
   */
  test('Property 7: Color contrast accessibility', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<ResumeMode>('datascience', 'aerospace'),
        fc.boolean(), // isLargeText
        (mode, isLargeText) => {
          const theme = themeManager.getTheme(mode);
          const requiredRatio = isLargeText ? 3.0 : 4.5;

          // Test text color against background
          const textBackgroundRatio = getContrastRatio(
            theme.colors.text,
            theme.colors.background
          );

          // Test primary color against background (for headings/important text)
          const primaryBackgroundRatio = getContrastRatio(
            theme.colors.primary,
            theme.colors.background
          );

          // Both combinations should meet the required contrast ratio
          return (
            textBackgroundRatio >= requiredRatio &&
            primaryBackgroundRatio >= requiredRatio
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
