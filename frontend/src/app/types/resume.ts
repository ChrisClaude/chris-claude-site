// TypeScript interfaces for resume data structure
export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: {
    label: string;
    destination: string;
  };
  location: string;
  image: string;
  imageAlt: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface Reference {
  fullName: string;
  role: string;
  email: string;
  company: string;
}

export interface Education {
  degree: string;
  institution: string;
  institutionUrl: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Language {
  name: string;
  level: string;
  proficiency: number;
}

export interface NotableProject {
  title: string;
  url: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  displayText: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  references: Reference[];
  technologies: string[];
  skills: string[];
  education: Education[];
  languages: Language[];
  notableProjects: NotableProject[];
  socialLinks: SocialLink[];
}

// Form field types for validation
export interface FormErrors {
  [key: string]: string | string[];
}

export interface ResumeFormData extends ResumeData {
  // Additional form-specific properties can be added here
}
