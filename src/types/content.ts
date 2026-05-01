export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  summaryDataScience: string;
  summaryAerospace: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  grade?: string;
  achievements: string[];
}

export interface WorkExperience {
  position: string;
  company?: string;
  institution?: string;
  location: string;
  duration: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Position {
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
}

export interface Project {
  title: string;
  technologies: string;
  description: string;
  modelComponents?: string[];
  outcomes: string[];
  recognition?: string;
  status?: string;
}

export interface SkillCategory {
  category: string;
  skills: Record<string, string>;
}

export interface ResumeContent {
  personal: PersonalInfo;
  education: Education[];
  experience: WorkExperience[];
  positions: Position[];
  projectsDS: Project[];
  projectsAero: Project[];
  skills: SkillCategory[];
}
