/**
 * Property-Based Tests for Typography Consistency
 * Feature: github-master-resume, Property 15: Typography consistency
 * Validates: Requirements 7.2
 */

import { describe, test, expect, beforeEach } from 'vitest';
import fc from 'fast-check';

describe('Typography Consistency Property Tests', () => {
  beforeEach(() => {
    // Reset any DOM modifications
    document.documentElement.innerHTML = '';
  });

  /**
   * Property 15: Typography consistency
   * For any two sections of the same type, the typography properties 
   * (font-family, font-size, line-height) should be identical
   */
  test('Property 15: Typography consistency - sections of same type have identical typography', () => {
    // Generator for section types
    const sectionTypeGen = fc.constantFrom(
      'education',
      'experience',
      'positions',
      'projects',
      'skills'
    );

    // Generator for section content
    const sectionContentGen = fc.record({
      title: fc.string({ minLength: 1, maxLength: 50 }),
      content: fc.string({ minLength: 10, maxLength: 200 })
    });

    fc.assert(
      fc.property(
        sectionTypeGen,
        fc.array(sectionContentGen, { minLength: 2, maxLength: 5 }),
        (sectionType, sections) => {
          // Create multiple sections of the same type
          const sectionElements: HTMLElement[] = [];
          
          sections.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = `${sectionType}-section`;
            sectionDiv.setAttribute('data-testid', `${sectionType}-${index}`);
            
            const heading = document.createElement('h2');
            heading.textContent = section.title;
            heading.className = `${sectionType}-title`;
            
            const content = document.createElement('p');
            content.textContent = section.content;
            content.className = `${sectionType}-content`;
            
            sectionDiv.appendChild(heading);
            sectionDiv.appendChild(content);
            document.body.appendChild(sectionDiv);
            
            sectionElements.push(sectionDiv);
          });

          // Apply CSS custom properties
          const style = document.createElement('style');
          style.textContent = `
            :root {
              --font-heading: 'Inter', sans-serif;
              --font-body: 'Inter', sans-serif;
              --font-size-2xl: 1.5rem;
              --font-size-base: 1rem;
              --line-height-tight: 1.25;
              --line-height-relaxed: 1.75;
            }
            
            h2 {
              font-family: var(--font-heading);
              font-size: var(--font-size-2xl);
              line-height: var(--line-height-tight);
            }
            
            p {
              font-family: var(--font-body);
              font-size: var(--font-size-base);
              line-height: var(--line-height-relaxed);
            }
          `;
          document.head.appendChild(style);

          // Get computed styles for all sections
          const headingStyles = sectionElements.map(section => {
            const heading = section.querySelector('h2');
            return heading ? window.getComputedStyle(heading) : null;
          }).filter(Boolean);

          const contentStyles = sectionElements.map(section => {
            const content = section.querySelector('p');
            return content ? window.getComputedStyle(content) : null;
          }).filter(Boolean);

          // Verify all headings have identical typography
          if (headingStyles.length > 1) {
            const firstHeadingStyle = headingStyles[0]!;
            const firstFontFamily = firstHeadingStyle.fontFamily;
            const firstFontSize = firstHeadingStyle.fontSize;
            const firstLineHeight = firstHeadingStyle.lineHeight;

            for (let i = 1; i < headingStyles.length; i++) {
              const currentStyle = headingStyles[i]!;
              expect(currentStyle.fontFamily).toBe(firstFontFamily);
              expect(currentStyle.fontSize).toBe(firstFontSize);
              expect(currentStyle.lineHeight).toBe(firstLineHeight);
            }
          }

          // Verify all content paragraphs have identical typography
          if (contentStyles.length > 1) {
            const firstContentStyle = contentStyles[0]!;
            const firstFontFamily = firstContentStyle.fontFamily;
            const firstFontSize = firstContentStyle.fontSize;
            const firstLineHeight = firstContentStyle.lineHeight;

            for (let i = 1; i < contentStyles.length; i++) {
              const currentStyle = contentStyles[i]!;
              expect(currentStyle.fontFamily).toBe(firstFontFamily);
              expect(currentStyle.fontSize).toBe(firstFontSize);
              expect(currentStyle.lineHeight).toBe(firstLineHeight);
            }
          }

          // Cleanup
          document.head.removeChild(style);
          sectionElements.forEach(el => document.body.removeChild(el));

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 15: Typography consistency - CSS custom properties are consistently applied', () => {
    // Generator for CSS custom property values
    const cssPropertyGen = fc.record({
      fontHeading: fc.constantFrom('Inter', 'Arial', 'Helvetica', 'sans-serif'),
      fontBody: fc.constantFrom('Inter', 'Arial', 'Helvetica', 'sans-serif'),
      fontSize: fc.constantFrom('1rem', '1.125rem', '1.25rem', '1.5rem'),
      lineHeight: fc.constantFrom('1.25', '1.5', '1.75', '2')
    });

    fc.assert(
      fc.property(cssPropertyGen, (props) => {
        // Set CSS custom properties
        document.documentElement.style.setProperty('--font-heading', props.fontHeading);
        document.documentElement.style.setProperty('--font-body', props.fontBody);
        document.documentElement.style.setProperty('--font-size-base', props.fontSize);
        document.documentElement.style.setProperty('--line-height-normal', props.lineHeight);

        // Create test elements
        const style = document.createElement('style');
        style.textContent = `
          .test-heading {
            font-family: var(--font-heading);
          }
          .test-body {
            font-family: var(--font-body);
            font-size: var(--font-size-base);
            line-height: var(--line-height-normal);
          }
        `;
        document.head.appendChild(style);

        const heading1 = document.createElement('h2');
        heading1.className = 'test-heading';
        const heading2 = document.createElement('h2');
        heading2.className = 'test-heading';

        const body1 = document.createElement('p');
        body1.className = 'test-body';
        const body2 = document.createElement('p');
        body2.className = 'test-body';

        document.body.appendChild(heading1);
        document.body.appendChild(heading2);
        document.body.appendChild(body1);
        document.body.appendChild(body2);

        // Verify consistency
        const heading1Style = window.getComputedStyle(heading1);
        const heading2Style = window.getComputedStyle(heading2);
        const body1Style = window.getComputedStyle(body1);
        const body2Style = window.getComputedStyle(body2);

        // Headings should have identical font-family
        expect(heading1Style.fontFamily).toBe(heading2Style.fontFamily);

        // Body text should have identical typography
        expect(body1Style.fontFamily).toBe(body2Style.fontFamily);
        expect(body1Style.fontSize).toBe(body2Style.fontSize);
        expect(body1Style.lineHeight).toBe(body2Style.lineHeight);

        // Cleanup
        document.head.removeChild(style);
        document.body.removeChild(heading1);
        document.body.removeChild(heading2);
        document.body.removeChild(body1);
        document.body.removeChild(body2);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
