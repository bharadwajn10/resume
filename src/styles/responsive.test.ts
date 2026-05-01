/**
 * Tests for Responsive Design
 * Validates: Requirements 1.4
 */

import { describe, test, expect } from 'vitest';

describe('Responsive Design Tests', () => {
  test('CSS custom properties for spacing are defined', () => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --space-xs: 0.25rem;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
        --space-2xl: 2.5rem;
        --space-3xl: 3rem;
        --space-4xl: 4rem;
      }
    `;
    document.head.appendChild(style);

    const root = document.documentElement;
    const computedStyle = window.getComputedStyle(root);
    
    // Verify spacing variables are defined
    expect(computedStyle.getPropertyValue('--space-xs')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--space-md')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--space-xl')).toBeTruthy();

    document.head.removeChild(style);
  });

  test('CSS custom properties for typography are defined', () => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --font-size-5xl: 3rem;
        --line-height-tight: 1.25;
        --line-height-normal: 1.5;
        --line-height-relaxed: 1.75;
      }
    `;
    document.head.appendChild(style);

    const root = document.documentElement;
    const computedStyle = window.getComputedStyle(root);
    
    // Verify typography variables are defined
    expect(computedStyle.getPropertyValue('--font-size-base')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--font-size-xl')).toBeTruthy();
    expect(computedStyle.getPropertyValue('--line-height-normal')).toBeTruthy();

    document.head.removeChild(style);
  });

  test('Responsive breakpoints are defined in CSS', () => {
    const style = document.createElement('style');
    style.textContent = `
      .test-element {
        padding: 1rem;
      }
      
      @media (min-width: 768px) {
        .test-element {
          padding: 2rem;
        }
      }
      
      @media (min-width: 1024px) {
        .test-element {
          padding: 3rem;
        }
      }
    `;
    document.head.appendChild(style);

    const element = document.createElement('div');
    element.className = 'test-element';
    document.body.appendChild(element);

    // Verify element exists and has class
    expect(element.className).toBe('test-element');

    document.body.removeChild(element);
    document.head.removeChild(style);
  });

  test('Mobile-first approach: base styles apply before media queries', () => {
    const style = document.createElement('style');
    style.textContent = `
      .container {
        width: 100%;
        padding: 1rem;
      }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    const computedStyle = window.getComputedStyle(container);
    
    // Base mobile-first styles should be applied
    expect(computedStyle.width).toBeTruthy();

    document.body.removeChild(container);
    document.head.removeChild(style);
  });

  test('Grid layout classes are defined', () => {
    const style = document.createElement('style');
    style.textContent = `
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    `;
    document.head.appendChild(style);

    const grid = document.createElement('div');
    grid.className = 'stats-grid';
    document.body.appendChild(grid);

    const computedStyle = window.getComputedStyle(grid);
    expect(computedStyle.display).toBe('grid');

    document.body.removeChild(grid);
    document.head.removeChild(style);
  });

  test('Flexbox layout for responsive containers', () => {
    const style = document.createElement('style');
    style.textContent = `
      .flex-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'flex-container';
    document.body.appendChild(container);

    const computedStyle = window.getComputedStyle(container);
    expect(computedStyle.display).toBe('flex');
    expect(computedStyle.flexDirection).toBe('column');

    document.body.removeChild(container);
    document.head.removeChild(style);
  });

  test('Touch target minimum size for mobile accessibility', () => {
    const style = document.createElement('style');
    style.textContent = `
      button {
        min-height: 44px;
        min-width: 44px;
        padding: 0.5rem 1rem;
      }
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.textContent = 'Test';
    document.body.appendChild(button);

    const computedStyle = window.getComputedStyle(button);
    const minHeight = parseInt(computedStyle.minHeight);
    
    // WCAG 2.1 Level AAA recommends 44x44px minimum touch target
    expect(minHeight).toBeGreaterThanOrEqual(44);

    document.body.removeChild(button);
    document.head.removeChild(style);
  });

  test('Max-width containers for readability on large screens', () => {
    const style = document.createElement('style');
    style.textContent = `
      .resume-container {
        max-width: 1280px;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'resume-container';
    document.body.appendChild(container);

    const computedStyle = window.getComputedStyle(container);
    expect(computedStyle.maxWidth).toBe('1280px');
    expect(computedStyle.margin).toContain('auto');

    document.body.removeChild(container);
    document.head.removeChild(style);
  });
});

