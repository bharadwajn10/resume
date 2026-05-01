import { describe, test, expect } from 'vitest';
import {
  parsePersonalInfo,
  parseEducation,
  parseExperience,
  parsePositions,
  parseProjects,
  parseSkills,
} from './markdownParser';

describe('parsePersonalInfo', () => {
  test('parses well-formed personal information', () => {
    const markdown = `# Personal Information

**Name:** John Doe
**Title:** Software Engineer
**Email:** john@example.com
**Phone:** +1234567890
**LinkedIn:** linkedin.com/in/johndoe
**GitHub:** github.com/johndoe
**Location:** San Francisco, CA

## Summary - Data Science
Expert in machine learning and data analysis.

## Summary - Aerospace
Passionate about rocket propulsion systems.`;

    const result = parsePersonalInfo(markdown);

    expect(result.name).toBe('John Doe');
    expect(result.title).toBe('Software Engineer');
    expect(result.email).toBe('john@example.com');
    expect(result.phone).toBe('+1234567890');
    expect(result.linkedin).toBe('linkedin.com/in/johndoe');
    expect(result.github).toBe('github.com/johndoe');
    expect(result.location).toBe('San Francisco, CA');
    expect(result.summaryDataScience).toBe('Expert in machine learning and data analysis.');
    expect(result.summaryAerospace).toBe('Passionate about rocket propulsion systems.');
  });

  test('handles missing optional fields', () => {
    const markdown = `# Personal Information

**Name:** Jane Smith
**Title:** Data Scientist
**Email:** jane@example.com
**Phone:** 
**LinkedIn:** 
**GitHub:** 
**Location:** New York, NY`;

    const result = parsePersonalInfo(markdown);

    expect(result.name).toBe('Jane Smith');
    expect(result.email).toBe('jane@example.com');
    expect(result.phone).toBe('');
    expect(result.linkedin).toBe('');
    expect(result.github).toBe('');
  });

  test('handles malformed markdown gracefully', () => {
    const markdown = `Some random text without proper formatting`;

    const result = parsePersonalInfo(markdown);

    expect(result.name).toBe('');
    expect(result.email).toBe('');
    expect(result.summaryDataScience).toBe('');
  });
});


describe('parseEducation', () => {
  test('parses well-formed education entries', () => {
    const markdown = `# Education

## Bachelor of Science in Computer Science
**Institution:** MIT
**Location:** Cambridge, MA
**Duration:** 2020 - 2024
**GPA:** 3.9/4.0

**Achievements:**
- Dean's List
- Research Award

---

## High School Diploma
**Institution:** Central High
**Location:** Boston, MA
**Duration:** 2016 - 2020
**Grade:** 95%`;

    const result = parseEducation(markdown);

    expect(result).toHaveLength(2);
    expect(result[0].degree).toBe('Bachelor of Science in Computer Science');
    expect(result[0].institution).toBe('MIT');
    expect(result[0].gpa).toBe('3.9/4.0');
    expect(result[0].achievements).toEqual(['Dean\'s List', 'Research Award']);
    expect(result[1].degree).toBe('High School Diploma');
    expect(result[1].grade).toBe('95%');
  });

  test('handles entries without achievements', () => {
    const markdown = `# Education

## Master of Science
**Institution:** Stanford
**Location:** Palo Alto, CA
**Duration:** 2024 - 2026
**GPA:** 4.0/4.0`;

    const result = parseEducation(markdown);

    expect(result).toHaveLength(1);
    expect(result[0].achievements).toEqual([]);
  });

  test('handles malformed education markdown', () => {
    const markdown = `# Education

Some text without proper structure`;

    const result = parseEducation(markdown);

    expect(result).toHaveLength(0);
  });
});


describe('parseExperience', () => {
  test('parses well-formed work experience', () => {
    const markdown = `# Work Experience

## Software Engineer
**Company:** Google
**Location:** Mountain View, CA
**Duration:** 2023 - Present

**Responsibilities:**
- Developed scalable systems
- Led team of 5 engineers

**Achievements:**
- Improved performance by 50%

---

## Research Assistant
**Institution:** MIT Lab
**Location:** Cambridge, MA
**Duration:** 2022 - 2023

**Responsibilities:**
- Conducted experiments
- Published papers`;

    const result = parseExperience(markdown);

    expect(result).toHaveLength(2);
    expect(result[0].position).toBe('Software Engineer');
    expect(result[0].company).toBe('Google');
    expect(result[0].responsibilities).toEqual(['Developed scalable systems', 'Led team of 5 engineers']);
    expect(result[0].achievements).toEqual(['Improved performance by 50%']);
    expect(result[1].institution).toBe('MIT Lab');
    expect(result[1].achievements).toBeUndefined();
  });

  test('handles missing achievements', () => {
    const markdown = `# Work Experience

## Intern
**Company:** Startup Inc
**Location:** SF, CA
**Duration:** Summer 2022

**Responsibilities:**
- Built features`;

    const result = parseExperience(markdown);

    expect(result).toHaveLength(1);
    expect(result[0].achievements).toBeUndefined();
  });
});


describe('parsePositions', () => {
  test('parses well-formed positions', () => {
    const markdown = `# Positions of Responsibility

## President - Robotics Club
**Organization:** University Robotics Club
**Duration:** 2022 - 2024

**Responsibilities:**
- Led team of 30 members
- Organized events

---

## Team Lead
**Organization:** Science Congress
**Duration:** 2023

**Responsibilities:**
- Coordinated project`;

    const result = parsePositions(markdown);

    expect(result).toHaveLength(2);
    expect(result[0].role).toBe('President - Robotics Club');
    expect(result[0].organization).toBe('University Robotics Club');
    expect(result[0].responsibilities).toEqual(['Led team of 30 members', 'Organized events']);
    expect(result[1].role).toBe('Team Lead');
  });

  test('handles malformed positions markdown', () => {
    const markdown = `# Positions

Random text`;

    const result = parsePositions(markdown);

    expect(result).toHaveLength(0);
  });
});


describe('parseProjects', () => {
  test('parses well-formed projects with all fields', () => {
    const markdown = `# Projects

## AI System
**Technologies:** Python, TensorFlow, ML

**Description:**
An advanced AI system for predictions.

**Model Components:**
1. Recognition Model
2. Analysis Model

**Outcomes:**
- Achieved 95% accuracy
- Published paper

**Recognition:**
Won Best Project Award

**Status:**
In production

---

## Simple Project
**Technologies:** JavaScript, React

**Description:**
A web application.

**Outcomes:**
- Deployed successfully`;

    const result = parseProjects(markdown);

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('AI System');
    expect(result[0].technologies).toBe('Python, TensorFlow, ML');
    expect(result[0].description).toContain('An advanced AI system');
    expect(result[0].modelComponents).toEqual(['Recognition Model', 'Analysis Model']);
    expect(result[0].outcomes).toEqual(['Achieved 95% accuracy', 'Published paper']);
    expect(result[0].recognition).toBe('Won Best Project Award');
    expect(result[0].status).toBe('In production');
    expect(result[1].modelComponents).toBeUndefined();
  });

  test('handles projects without optional fields', () => {
    const markdown = `# Projects

## Basic Project
**Technologies:** HTML, CSS

**Description:**
Simple website.

**Outcomes:**
- Completed`;

    const result = parseProjects(markdown);

    expect(result).toHaveLength(1);
    expect(result[0].recognition).toBeUndefined();
    expect(result[0].status).toBeUndefined();
  });
});


describe('parseSkills', () => {
  test('parses well-formed skills with subcategories', () => {
    const markdown = `# Skills

## Programming
**Languages:** Python, JavaScript, TypeScript
**Frameworks:** React, Node.js

## Tools
**Version Control:** Git, GitHub
**IDEs:** VS Code, IntelliJ

## Soft Skills
- Communication
- Leadership
- Problem Solving`;

    const result = parseSkills(markdown);

    expect(result).toHaveLength(3);
    expect(result[0].category).toBe('Programming');
    expect(result[0].skills['Languages']).toBe('Python, JavaScript, TypeScript');
    expect(result[0].skills['Frameworks']).toBe('React, Node.js');
    expect(result[1].category).toBe('Tools');
    expect(result[2].category).toBe('Soft Skills');
    expect(result[2].skills['items']).toContain('Communication');
  });

  test('handles empty skills markdown', () => {
    const markdown = `# Skills`;

    const result = parseSkills(markdown);

    expect(result).toHaveLength(0);
  });

  test('handles malformed skills markdown', () => {
    const markdown = `Random text without structure`;

    const result = parseSkills(markdown);

    expect(result).toHaveLength(0);
  });
});
