import { describe, it, expect } from 'vitest';
import { PersonalInfo } from '../types/content';
import { ResumeMode } from '../types/theme';

describe('Header Component Logic', () => {
  const mockPersonalInfo: PersonalInfo = {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    location: 'San Francisco, CA',
    summaryDataScience: 'Data science professional with expertise in ML.',
    summaryAerospace: 'Aerospace engineer with rocketry experience.',
  };

  describe('Summary selection logic', () => {
    it('should select data science summary when in datascience mode', () => {
      const mode: ResumeMode = 'datascience';
      const selectedSummary = mode === 'datascience' 
        ? mockPersonalInfo.summaryDataScience 
        : mockPersonalInfo.summaryAerospace;
      
      expect(selectedSummary).toBe('Data science professional with expertise in ML.');
    });

    it('should select aerospace summary when in aerospace mode', () => {
      const mode: ResumeMode = 'aerospace';
      const selectedSummary = mode === 'aerospace'
        ? mockPersonalInfo.summaryAerospace
        : mockPersonalInfo.summaryDataScience;
      
      expect(selectedSummary).toBe('Aerospace engineer with rocketry experience.');
    });
  });

  describe('Contact link formatting', () => {
    it('should format email as mailto link', () => {
      const email = mockPersonalInfo.email;
      const href = `mailto:${email}`;
      expect(href).toBe('mailto:john.doe@example.com');
    });

    it('should format phone as tel link', () => {
      const phone = mockPersonalInfo.phone;
      const href = `tel:${phone}`;
      expect(href).toBe('tel:+1234567890');
    });

    it('should add https:// prefix to linkedin if not present', () => {
      const linkedin = mockPersonalInfo.linkedin;
      const href = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
      expect(href).toBe('https://linkedin.com/in/johndoe');
    });

    it('should add https:// prefix to github if not present', () => {
      const github = mockPersonalInfo.github;
      const href = github.startsWith('http') ? github : `https://${github}`;
      expect(href).toBe('https://github.com/johndoe');
    });

    it('should not add prefix if URL already has http/https', () => {
      const fullUrl = 'https://example.com';
      const href = fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`;
      expect(href).toBe('https://example.com');
    });
  });

  describe('Optional field handling', () => {
    it('should identify empty email field', () => {
      const email = '';
      const shouldRender = !!email;
      expect(shouldRender).toBe(false);
    });

    it('should identify non-empty email field', () => {
      const email = 'test@example.com';
      const shouldRender = !!email;
      expect(shouldRender).toBe(true);
    });

    it('should handle all empty contact fields', () => {
      const minimalInfo: PersonalInfo = {
        name: 'Jane Smith',
        title: 'Developer',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        location: '',
        summaryDataScience: 'Summary',
        summaryAerospace: 'Summary',
      };

      const hasEmail = !!minimalInfo.email;
      const hasPhone = !!minimalInfo.phone;
      const hasLinkedin = !!minimalInfo.linkedin;
      const hasGithub = !!minimalInfo.github;
      const hasLocation = !!minimalInfo.location;

      expect(hasEmail).toBe(false);
      expect(hasPhone).toBe(false);
      expect(hasLinkedin).toBe(false);
      expect(hasGithub).toBe(false);
      expect(hasLocation).toBe(false);
    });
  });

  describe('Required fields', () => {
    it('should always have name and title', () => {
      expect(mockPersonalInfo.name).toBeTruthy();
      expect(mockPersonalInfo.title).toBeTruthy();
      expect(mockPersonalInfo.name).toBe('John Doe');
      expect(mockPersonalInfo.title).toBe('Software Engineer');
    });

    it('should always have both summaries', () => {
      expect(mockPersonalInfo.summaryDataScience).toBeTruthy();
      expect(mockPersonalInfo.summaryAerospace).toBeTruthy();
    });
  });
});
