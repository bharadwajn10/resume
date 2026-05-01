/**
 * Automated accessibility audit using axe-core
 * Requirements: 8.3, 8.4
 */
import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Positions } from '../components/Positions';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { ModeToggle } from '../components/ModeToggle';
import type { Education as EducationType, WorkExperience, Position, Project, SkillCategory } from '../types/content';

expect.extend({});

// ---------------------------------------------------------------------------
// Sample data fixtures
// ---------------------------------------------------------------------------
const sampleEducation: EducationType[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Test University',
    location: 'Test City, TC',
    duration: 'August 2020 - May 2024',
    gpa: '3.9/4.0',
    achievements: ['Dean\'s List', 'Research Award'],
  },
];

const sampleExperience: WorkExperience[] = [
  {
    position: 'Software Engineer',
    company: 'Test Corp',
    location: 'Test City, TC',
    duration: 'June 2023 - Present',
    responsibilities: ['Built features', 'Reviewed code'],
    achievements: ['Improved performance by 20%'],
  },
];

const samplePositions: Position[] = [
  {
    role: 'President - Robotics Club',
    organization: 'University Robotics Club',
    duration: 'August 2022 - May 2024',
    responsibilities: ['Led team of 30 members', 'Organized events'],
  },
];

const sampleProjects: Project[] = [
  {
    title: 'AI System',
    technologies: 'Python, TensorFlow',
    description: 'An advanced AI system.',
    outcomes: ['Achieved 95% accuracy'],
    recognition: 'Best Project Award',
  },
];

const sampleSkills: SkillCategory[] = [
  {
    category: 'Data Science & Machine Learning',
    skills: { 'Languages': 'Python, R', 'Frameworks': 'TensorFlow' },
  },
  {
    category: 'General Technical Skills',
    skills: { 'Version Control': 'Git, GitHub' },
  },
];

// ---------------------------------------------------------------------------
// Accessibility tests
// ---------------------------------------------------------------------------
describe('Accessibility audit - axe-core (Requirements 8.3, 8.4)', () => {
  test('Education component has no accessibility violations', async () => {
    const { container } = render(<Education education={sampleEducation} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Experience component has no accessibility violations', async () => {
    const { container } = render(<Experience experience={sampleExperience} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Positions component has no accessibility violations', async () => {
    const { container } = render(<Positions positions={samplePositions} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Projects component has no accessibility violations', async () => {
    const { container } = render(<Projects projects={sampleProjects} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Projects component with empty list has no accessibility violations', async () => {
    const { container } = render(<Projects projects={[]} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Skills component (datascience mode) has no accessibility violations', async () => {
    const { container } = render(<Skills skills={sampleSkills} mode="datascience" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('Skills component (aerospace mode) has no accessibility violations', async () => {
    const { container } = render(<Skills skills={sampleSkills} mode="aerospace" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('ModeToggle component has no accessibility violations', async () => {
    const onModeChange = vi.fn();
    const { container } = render(
      <ModeToggle currentMode="datascience" onModeChange={onModeChange} />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  test('ModeToggle in aerospace mode has no accessibility violations', async () => {
    const onModeChange = vi.fn();
    const { container } = render(
      <ModeToggle currentMode="aerospace" onModeChange={onModeChange} />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
