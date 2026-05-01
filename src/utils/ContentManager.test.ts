import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { ContentManager } from './ContentManager';
import type { ResumeContent, Project } from '../types/content';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch as any;

// Mock alert
globalThis.alert = vi.fn();

describe('ContentManager', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('loadContent successfully loads and parses all files', async () => {
    // Mock successful responses for all files
    mockFetch.mockImplementation((path: string) => {
      const responses: Record<string, string> = {
        '/content/personal.md': `# Personal Information
**Name:** Test User
**Title:** Developer
**Email:** test@example.com
**Phone:** 123
**LinkedIn:** linkedin.com/test
**GitHub:** github.com/test
**Location:** Test City

## Summary - Data Science
DS Summary

## Summary - Aerospace
Aero Summary`,
        '/content/education.md': `# Education

## Test Degree
**Institution:** Test University
**Location:** Test City
**Duration:** 2020-2024
**GPA:** 4.0/4.0`,
        '/content/experience.md': `# Work Experience

## Test Position
**Company:** Test Company
**Location:** Test City
**Duration:** 2023-Present

**Responsibilities:**
- Test responsibility`,
        '/content/positions.md': `# Positions

## Test Role
**Organization:** Test Org
**Duration:** 2023

**Responsibilities:**
- Test task`,
        '/content/projects-ds.md': `# Projects

## Test DS Project
**Technologies:** Python
**Description:** Test description
**Outcomes:**
- Test outcome`,
        '/content/projects-aero.md': `# Projects

## Test Aero Project
**Technologies:** C++
**Description:** Test description
**Outcomes:**
- Test outcome`,
        '/content/skills.md': `# Skills

## Test Category
**Skill:** Value`,
      };

      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve(responses[path] || ''),
      });
    });

    const content = await ContentManager.loadContent();

    expect(content.personal.name).toBe('Test User');
    expect(content.education).toHaveLength(1);
    expect(content.experience).toHaveLength(1);
    expect(content.positions).toHaveLength(1);
    expect(content.projectsDS).toHaveLength(1);
    expect(content.projectsAero).toHaveLength(1);
    expect(content.skills).toHaveLength(1);
  });

  test('loadContent returns fallback content on file load failure', async () => {
    // Mock failed response
    mockFetch.mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const content = await ContentManager.loadContent();

    expect(content.personal.name).toBe('Resume Loading Error');
    expect(content.education).toEqual([]);
    expect(globalThis.alert).toHaveBeenCalled();
  });

  test('loadContent handles network errors gracefully', async () => {
    // Mock network error
    mockFetch.mockRejectedValue(new Error('Network error'));

    const content = await ContentManager.loadContent();

    expect(content.personal.name).toBe('Resume Loading Error');
    expect(content.personal.summaryDataScience).toContain('could not be loaded');
  });

  test('loadContentWithRetry retries on failure', async () => {
    let callCount = 0;
    
    mockFetch.mockImplementation(() => {
      callCount++;
      if (callCount < 3) {
        return Promise.reject(new Error('Network error'));
      }
      // Succeed on third attempt
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve(`# Personal Information
**Name:** Success
**Title:** Test
**Email:** test@test.com
**Phone:** 123
**LinkedIn:** test
**GitHub:** test
**Location:** Test`),
      });
    });

    const content = await ContentManager.loadContentWithRetry(3);

    expect(callCount).toBeGreaterThanOrEqual(3);
    // Should eventually succeed or return fallback
    expect(content.personal).toBeDefined();
  });

  test('loadContentWithRetry returns fallback after max retries', async () => {
    // Always fail
    mockFetch.mockRejectedValue(new Error('Persistent error'));

    const content = await ContentManager.loadContentWithRetry(2);

    expect(content.personal.name).toBe('Resume Loading Error');
  });
});

/**
 * Property-Based Tests
 * Feature: github-master-resume, Property 11: Project filtering correctness
 * Validates: Requirements 5.1, 5.2
 */
describe('ContentManager - Property-Based Tests', () => {
  test('Property 11: Project filtering correctness - datascience mode returns only DS projects', () => {
    // Generator for projects
    const projectGen = fc.record({
      title: fc.string({ minLength: 1 }),
      technologies: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      outcomes: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    }) as fc.Arbitrary<Project>;

    // Generator for resume content with random projects
    const contentGen = fc.record({
      personal: fc.constant({
        name: 'Test',
        title: 'Test',
        email: 'test@test.com',
        phone: '123',
        linkedin: 'test',
        github: 'test',
        location: 'Test',
        summaryDataScience: 'Test',
        summaryAerospace: 'Test',
      }),
      education: fc.constant([]),
      experience: fc.constant([]),
      positions: fc.constant([]),
      projectsDS: fc.array(projectGen, { minLength: 0, maxLength: 10 }),
      projectsAero: fc.array(projectGen, { minLength: 0, maxLength: 10 }),
      skills: fc.constant([]),
    }) as fc.Arbitrary<ResumeContent>;

    fc.assert(
      fc.property(contentGen, (content) => {
        const filtered = ContentManager.filterProjects(content, 'datascience');
        // All filtered projects should be from projectsDS
        return JSON.stringify(filtered) === JSON.stringify(content.projectsDS);
      }),
      { numRuns: 100 }
    );
  });

  test('Property 11: Project filtering correctness - aerospace mode returns only Aero projects', () => {
    // Generator for projects
    const projectGen = fc.record({
      title: fc.string({ minLength: 1 }),
      technologies: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      outcomes: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    }) as fc.Arbitrary<Project>;

    // Generator for resume content with random projects
    const contentGen = fc.record({
      personal: fc.constant({
        name: 'Test',
        title: 'Test',
        email: 'test@test.com',
        phone: '123',
        linkedin: 'test',
        github: 'test',
        location: 'Test',
        summaryDataScience: 'Test',
        summaryAerospace: 'Test',
      }),
      education: fc.constant([]),
      experience: fc.constant([]),
      positions: fc.constant([]),
      projectsDS: fc.array(projectGen, { minLength: 0, maxLength: 10 }),
      projectsAero: fc.array(projectGen, { minLength: 0, maxLength: 10 }),
      skills: fc.constant([]),
    }) as fc.Arbitrary<ResumeContent>;

    fc.assert(
      fc.property(contentGen, (content) => {
        const filtered = ContentManager.filterProjects(content, 'aerospace');
        // All filtered projects should be from projectsAero
        return JSON.stringify(filtered) === JSON.stringify(content.projectsAero);
      }),
      { numRuns: 100 }
    );
  });
});
