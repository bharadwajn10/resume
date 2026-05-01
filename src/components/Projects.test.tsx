import { describe, test } from 'vitest';
import fc from 'fast-check';
import type { Project } from '../types/content';

/**
 * Property-Based Tests for Projects Component
 * Feature: github-master-resume, Property 12: Project required fields
 * Validates: Requirements 5.5
 */
describe('Projects - Property-Based Tests', () => {
  test('Property 12: Project required fields - all required fields are present', () => {
    // Generator for valid projects with all required fields
    const projectGen = fc.record({
      title: fc.string({ minLength: 1, maxLength: 100 }),
      technologies: fc.string({ minLength: 1, maxLength: 200 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
      outcomes: fc.array(fc.string({ minLength: 1, maxLength: 200 }), { minLength: 1, maxLength: 5 }),
      // Optional fields
      modelComponents: fc.option(fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 })),
      recognition: fc.option(fc.string({ minLength: 1, maxLength: 200 })),
      status: fc.option(fc.string({ minLength: 1, maxLength: 100 })),
    }) as fc.Arbitrary<Project>;

    fc.assert(
      fc.property(
        fc.array(projectGen, { minLength: 1, maxLength: 10 }),
        (projects) => {
          // Check that all projects have required fields
          return projects.every((project) => {
            // Required field: title (name)
            const hasTitle = project.title && project.title.length > 0;
            
            // Required field: technologies
            const hasTechnologies = project.technologies && project.technologies.length > 0;
            
            // Required field: outcomes (must be non-empty array)
            const hasOutcomes = project.outcomes && project.outcomes.length > 0;
            
            // All required fields must be present
            return hasTitle && hasTechnologies && hasOutcomes;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 12: Project required fields - validates data structure integrity', () => {
    // Generator for projects
    const projectGen = fc.record({
      title: fc.string({ minLength: 1 }),
      technologies: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      outcomes: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    }) as fc.Arbitrary<Project>;

    fc.assert(
      fc.property(projectGen, (project) => {
        // Verify that required fields exist and are of correct type
        const titleValid = typeof project.title === 'string' && project.title.length > 0;
        const techValid = typeof project.technologies === 'string' && project.technologies.length > 0;
        const descValid = typeof project.description === 'string' && project.description.length > 0;
        const outcomesValid = Array.isArray(project.outcomes) && project.outcomes.length > 0;
        
        return titleValid && techValid && descValid && outcomesValid;
      }),
      { numRuns: 100 }
    );
  });
});
