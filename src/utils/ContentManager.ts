import type { ResumeContent } from '../types/content';
import {
  parsePersonalInfo,
  parseEducation,
  parseExperience,
  parsePositions,
  parseProjects,
  parseSkills,
} from './markdownParser';

/**
 * ContentManager handles loading and parsing of all markdown content files
 */
export class ContentManager {
  private static readonly CONTENT_FILES = {
    personal: '/content/personal.md',
    education: '/content/education.md',
    experience: '/content/experience.md',
    positions: '/content/positions.md',
    projectsDS: '/content/projects-ds.md',
    projectsAero: '/content/projects-aero.md',
    skills: '/content/skills.md',
  };

  /**
   * Load a single markdown file
   */
  private static async loadFile(path: string): Promise<string> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error loading file ${path}:`, error);
      throw error;
    }
  }

  /**
   * Get fallback content when loading fails
   */
  private static getFallbackContent(): ResumeContent {
    return {
      personal: {
        name: 'Resume Loading Error',
        title: 'Unable to load content',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        location: '',
        summaryDataScience: 'Content could not be loaded. Please refresh the page.',
        summaryAerospace: 'Content could not be loaded. Please refresh the page.',
      },
      education: [],
      experience: [],
      positions: [],
      projectsDS: [],
      projectsAero: [],
      skills: [],
    };
  }

  /**
   * Load all content files and parse them
   */
  public static async loadContent(): Promise<ResumeContent> {
    try {
      // Load all files in parallel
      const [
        personalMd,
        educationMd,
        experienceMd,
        positionsMd,
        projectsDSMd,
        projectsAeroMd,
        skillsMd,
      ] = await Promise.all([
        this.loadFile(this.CONTENT_FILES.personal),
        this.loadFile(this.CONTENT_FILES.education),
        this.loadFile(this.CONTENT_FILES.experience),
        this.loadFile(this.CONTENT_FILES.positions),
        this.loadFile(this.CONTENT_FILES.projectsDS),
        this.loadFile(this.CONTENT_FILES.projectsAero),
        this.loadFile(this.CONTENT_FILES.skills),
      ]);

      // Parse all content
      const content: ResumeContent = {
        personal: parsePersonalInfo(personalMd),
        education: parseEducation(educationMd),
        experience: parseExperience(experienceMd),
        positions: parsePositions(positionsMd),
        projectsDS: parseProjects(projectsDSMd),
        projectsAero: parseProjects(projectsAeroMd),
        skills: parseSkills(skillsMd),
      };

      return content;
    } catch (error) {
      console.error('Failed to load resume content:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Unable to load resume content: ${errorMessage}\n\nPlease refresh the page to try again.`);
      
      // Return fallback content
      return this.getFallbackContent();
    }
  }

  /**
   * Load content with retry mechanism for network failures
   */
  public static async loadContentWithRetry(maxRetries = 3): Promise<ResumeContent> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.loadContent();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`Load attempt ${attempt} failed:`, lastError.message);
        
        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    // All retries failed
    console.error(`Failed to load content after ${maxRetries} attempts`);
    return this.getFallbackContent();
  }

  /**
   * Filter projects based on active mode
   * Returns projects from projects-ds.md for Data Science mode
   * Returns projects from projects-aero.md for Aerospace mode
   * Implements Requirements 5.1, 5.2
   */
  public static filterProjects(
    content: ResumeContent,
    mode: 'datascience' | 'aerospace'
  ): import('../types/content').Project[] {
    if (mode === 'datascience') {
      return content.projectsDS;
    } else {
      return content.projectsAero;
    }
  }
}
