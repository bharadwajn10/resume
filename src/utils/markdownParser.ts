import type {
  PersonalInfo,
  Education,
  WorkExperience,
  Position,
  Project,
  SkillCategory,
} from '../types/content';

/**
 * Extract key-value pairs from markdown using **Key:** Value format
 */
function extractKeyValue(text: string, key: string): string {
  const regex = new RegExp(`\\*\\*${key}:\\*\\*\\s*(.*)(?=\\n|$)`, 'i');
  const match = text.match(regex);
  const value = match ? match[1].trim() : '';
  // Return empty string if value is just whitespace or contains markdown formatting
  return value && !value.startsWith('**') ? value : '';
}

/**
 * Extract list items from markdown (lines starting with -, *, or numbers)
 */
function extractListItems(text: string): string[] {
  const lines = text.split('\n');
  const items: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Handle unordered lists (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      items.push(trimmed.substring(2).trim());
    }
    // Handle ordered lists (1. 2. etc.)
    else if (/^\d+\.\s/.test(trimmed)) {
      const item = trimmed.replace(/^\d+\.\s+/, '').trim();
      items.push(item);
    }
  }
  
  return items;
}

/**
 * Parse personal information from personal.md
 */
export function parsePersonalInfo(markdown: string): PersonalInfo {
  const name = extractKeyValue(markdown, 'Name');
  const title = extractKeyValue(markdown, 'Title');
  const email = extractKeyValue(markdown, 'Email');
  const phone = extractKeyValue(markdown, 'Phone');
  const linkedin = extractKeyValue(markdown, 'LinkedIn');
  const github = extractKeyValue(markdown, 'GitHub');
  const location = extractKeyValue(markdown, 'Location');

  // Extract summaries
  const dsSummaryMatch = markdown.match(/## Summary - Data Science\s+([\s\S]+?)(?=##|$)/);
  const aeroSummaryMatch = markdown.match(/## Summary - Aerospace\s+([\s\S]+?)(?=##|$)/);

  const summaryDataScience = dsSummaryMatch ? dsSummaryMatch[1].trim() : '';
  const summaryAerospace = aeroSummaryMatch ? aeroSummaryMatch[1].trim() : '';

  return {
    name,
    title,
    email,
    phone,
    linkedin,
    github,
    location,
    summaryDataScience,
    summaryAerospace,
  };
}

/**
 * Parse education entries from education.md
 */
export function parseEducation(markdown: string): Education[] {
  const entries: Education[] = [];
  
  // Split by horizontal rules (---) to separate entries
  const sections = markdown.split(/\n---\n/);
  
  for (const section of sections) {
    // Skip if section doesn't contain a degree (## heading)
    const degreeMatch = section.match(/##\s+(.+?)(?=\n|$)/);
    if (!degreeMatch) continue;
    
    const degree = degreeMatch[1].trim();
    const institution = extractKeyValue(section, 'Institution');
    const location = extractKeyValue(section, 'Location');
    const duration = extractKeyValue(section, 'Duration');
    const gpa = extractKeyValue(section, 'GPA');
    const grade = extractKeyValue(section, 'Grade');
    
    // Extract achievements
    const achievementsMatch = section.match(/\*\*Achievements:\*\*\s+([\s\S]+?)(?=\n\n|$)/);
    const achievements = achievementsMatch ? extractListItems(achievementsMatch[1]) : [];
    
    entries.push({
      degree,
      institution,
      location,
      duration,
      ...(gpa && { gpa }),
      ...(grade && { grade }),
      achievements,
    });
  }
  
  return entries;
}

/**
 * Parse work experience entries from experience.md
 */
export function parseExperience(markdown: string): WorkExperience[] {
  const entries: WorkExperience[] = [];
  
  // Split by horizontal rules (---) to separate entries
  const sections = markdown.split(/\n---\n/);
  
  for (const section of sections) {
    // Skip if section doesn't contain a position (## heading)
    const positionMatch = section.match(/##\s+(.+?)(?=\n|$)/);
    if (!positionMatch) continue;
    
    const position = positionMatch[1].trim();
    const company = extractKeyValue(section, 'Company');
    const institution = extractKeyValue(section, 'Institution');
    const location = extractKeyValue(section, 'Location');
    const duration = extractKeyValue(section, 'Duration');
    
    // Extract responsibilities
    const responsibilitiesMatch = section.match(/\*\*Responsibilities:\*\*\s+([\s\S]+?)(?=\*\*Achievements:\*\*|\n\n|$)/);
    const responsibilities = responsibilitiesMatch ? extractListItems(responsibilitiesMatch[1]) : [];
    
    // Extract achievements (optional)
    const achievementsMatch = section.match(/\*\*Achievements:\*\*\s+([\s\S]+?)(?=\n\n|$)/);
    const achievements = achievementsMatch ? extractListItems(achievementsMatch[1]) : [];
    
    entries.push({
      position,
      ...(company && { company }),
      ...(institution && { institution }),
      location,
      duration,
      responsibilities,
      ...(achievements.length > 0 && { achievements }),
    });
  }
  
  return entries;
}

/**
 * Parse positions of responsibility from positions.md
 */
export function parsePositions(markdown: string): Position[] {
  const entries: Position[] = [];
  
  // Split by horizontal rules (---) to separate entries
  const sections = markdown.split(/\n---\n/);
  
  for (const section of sections) {
    // Skip if section doesn't contain a role (## heading)
    const roleMatch = section.match(/##\s+(.+?)(?=\n|$)/);
    if (!roleMatch) continue;
    
    const role = roleMatch[1].trim();
    const organization = extractKeyValue(section, 'Organization');
    const duration = extractKeyValue(section, 'Duration');
    
    // Extract responsibilities
    const responsibilitiesMatch = section.match(/\*\*Responsibilities:\*\*\s+([\s\S]+?)(?=\n\n|$)/);
    const responsibilities = responsibilitiesMatch ? extractListItems(responsibilitiesMatch[1]) : [];
    
    entries.push({
      role,
      organization,
      duration,
      responsibilities,
    });
  }
  
  return entries;
}

/**
 * Parse project entries from projects-ds.md or projects-aero.md
 */
export function parseProjects(markdown: string): Project[] {
  const entries: Project[] = [];
  
  // Split by horizontal rules (---) to separate entries
  const sections = markdown.split(/\n---\n/);
  
  for (const section of sections) {
    // Skip if section doesn't contain a title (## heading)
    const titleMatch = section.match(/##\s+(.+?)(?=\n|$)/);
    if (!titleMatch) continue;
    
    const title = titleMatch[1].trim();
    const technologies = extractKeyValue(section, 'Technologies');
    
    // Extract description
    const descriptionMatch = section.match(/\*\*Description:\*\*\s+([\s\S]+?)(?=\*\*Model Components:\*\*|\*\*Outcomes:\*\*|\n\n|$)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    
    // Extract model components (optional)
    const modelComponentsMatch = section.match(/\*\*Model Components:\*\*\s+([\s\S]+?)(?=\*\*Outcomes:\*\*|\n\n|$)/);
    const modelComponents = modelComponentsMatch ? extractListItems(modelComponentsMatch[1]) : [];
    
    // Extract outcomes
    const outcomesMatch = section.match(/\*\*Outcomes:\*\*\s+([\s\S]+?)(?=\*\*Recognition:\*\*|\*\*Status:\*\*|\n\n|$)/);
    const outcomes = outcomesMatch ? extractListItems(outcomesMatch[1]) : [];
    
    // Extract recognition (optional)
    const recognition = extractKeyValue(section, 'Recognition');
    
    // Extract status (optional)
    const status = extractKeyValue(section, 'Status');
    
    entries.push({
      title,
      technologies,
      description,
      ...(modelComponents.length > 0 && { modelComponents }),
      outcomes,
      ...(recognition && { recognition }),
      ...(status && { status }),
    });
  }
  
  return entries;
}

/**
 * Parse skills by category from skills.md
 */
export function parseSkills(markdown: string): SkillCategory[] {
  const categories: SkillCategory[] = [];
  
  // Match all ## headings as categories
  const categoryRegex = /##\s+(.+?)\n([\s\S]+?)(?=##|$)/g;
  let match;
  
  while ((match = categoryRegex.exec(markdown)) !== null) {
    const category = match[1].trim();
    const content = match[2].trim();
    
    // Extract skill subcategories (e.g., **Programming Languages:** Python, R)
    const skills: Record<string, string> = {};
    const skillLines = content.split('\n');
    
    for (const line of skillLines) {
      const skillMatch = line.match(/\*\*(.+?):\*\*\s*(.+)/);
      if (skillMatch) {
        const skillName = skillMatch[1].trim();
        const skillValue = skillMatch[2].trim();
        skills[skillName] = skillValue;
      }
    }
    
    // Also handle list items for categories without subcategories
    const listItems = extractListItems(content);
    if (listItems.length > 0 && Object.keys(skills).length === 0) {
      skills['items'] = listItems.join(', ');
    }
    
    categories.push({
      category,
      skills,
    });
  }
  
  return categories;
}
