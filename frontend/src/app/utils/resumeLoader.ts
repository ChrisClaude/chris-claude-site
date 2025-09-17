/**
 * Utility functions for loading and managing resume data
 */

// Import all resume data files dynamically
import resumeData_20_aug_2025 from '../data/resumeData_20_aug_2025.json';
import feiscaCallCenterResumeData from '../data/feiscaCallCenterResumeData.json';
import feiscaCallCenterResumeDataFrench from '../data/feiscaCallCenterResumeDataFrench.json';
import feiscaFrontDeskResumeData from '../data/feiscaFrontDeskResumeData.json';
import feiscaFrontDeskResumeDataFrench from '../data/feiscaFrontDeskResumeDataFrench.json';
import feiscaResumeData from '../data/feiscaResumeData.json';
import feiscaResumeDataFrench from '../data/feiscaResumeDataFrench.json';
import feiscaSocialMediaResumeData from '../data/feiscaSocialMediaResumeData.json';
import feiscaSocialMediaResumeDataFrench from '../data/feiscaSocialMediaResumeDataFrench.json';
import floricaResumeData from '../data/floricaResumeData.json';
import resumeData from '../data/resumeData.json';
import resumeDataFrench from '../data/resumeDataFrench.json';

// TypeScript interfaces for resume metadata
export interface ResumeMetadata {
  id: string;
  fileName: string;
  displayName: string;
  language: 'en' | 'fr';
  personName: string;
  title: string;
  lastModified?: string;
  description?: string;
}

export interface ResumeListItem extends ResumeMetadata {
  data: any; // The actual resume data
}

// Resume data mapping with metadata
const resumeDataMap = {
  resumeData_20_aug_2025: {
    data: resumeData_20_aug_2025,
    metadata: {
      id: 'resumeData_20_aug_2025',
      fileName: 'resumeData_20_aug_2025.json',
      displayName: 'Claude De-Tchambila - .NET Developer (Latest)',
      language: 'en' as const,
      personName: 'Claude De-Tchambila',
      title: '.NET Backend Developer',
      description: 'Latest resume with comprehensive .NET and Azure experience',
    },
  },
  feiscaCallCenterResumeData: {
    data: feiscaCallCenterResumeData,
    metadata: {
      id: 'feiscaCallCenterResumeData',
      fileName: 'feiscaCallCenterResumeData.json',
      displayName: 'Feisca - Call Center Specialist',
      language: 'en' as const,
      personName: 'Feisca',
      title: 'Call Center Specialist',
      description: 'Customer service and call center operations resume',
    },
  },
  feiscaCallCenterResumeDataFrench: {
    data: feiscaCallCenterResumeDataFrench,
    metadata: {
      id: 'feiscaCallCenterResumeDataFrench',
      fileName: 'feiscaCallCenterResumeDataFrench.json',
      displayName: "Feisca - Spécialiste Centre d'Appels",
      language: 'fr' as const,
      personName: 'Feisca',
      title: "Spécialiste Centre d'Appels",
      description: "CV de service client et opérations de centre d'appels",
    },
  },
  feiscaFrontDeskResumeData: {
    data: feiscaFrontDeskResumeData,
    metadata: {
      id: 'feiscaFrontDeskResumeData',
      fileName: 'feiscaFrontDeskResumeData.json',
      displayName: 'Feisca - Front Desk Receptionist',
      language: 'en' as const,
      personName: 'Feisca',
      title: 'Front Desk Receptionist',
      description: 'Hospitality and front desk operations resume',
    },
  },
  feiscaFrontDeskResumeDataFrench: {
    data: feiscaFrontDeskResumeDataFrench,
    metadata: {
      id: 'feiscaFrontDeskResumeDataFrench',
      fileName: 'feiscaFrontDeskResumeDataFrench.json',
      displayName: 'Feisca - Réceptionniste',
      language: 'fr' as const,
      personName: 'Feisca',
      title: 'Réceptionniste',
      description: "CV d'hospitalité et opérations de réception",
    },
  },
  feiscaResumeData: {
    data: feiscaResumeData,
    metadata: {
      id: 'feiscaResumeData',
      fileName: 'feiscaResumeData.json',
      displayName: 'Feisca - General Resume',
      language: 'en' as const,
      personName: 'Feisca',
      title: 'Professional',
      description: 'General professional resume',
    },
  },
  feiscaResumeDataFrench: {
    data: feiscaResumeDataFrench,
    metadata: {
      id: 'feiscaResumeDataFrench',
      fileName: 'feiscaResumeDataFrench.json',
      displayName: 'Feisca - CV Général',
      language: 'fr' as const,
      personName: 'Feisca',
      title: 'Professionnel',
      description: 'CV professionnel général',
    },
  },
  feiscaSocialMediaResumeData: {
    data: feiscaSocialMediaResumeData,
    metadata: {
      id: 'feiscaSocialMediaResumeData',
      fileName: 'feiscaSocialMediaResumeData.json',
      displayName: 'Feisca - Social Media Specialist',
      language: 'en' as const,
      personName: 'Feisca',
      title: 'Social Media Specialist',
      description: 'Digital marketing and social media management resume',
    },
  },
  feiscaSocialMediaResumeDataFrench: {
    data: feiscaSocialMediaResumeDataFrench,
    metadata: {
      id: 'feiscaSocialMediaResumeDataFrench',
      fileName: 'feiscaSocialMediaResumeDataFrench.json',
      displayName: 'Feisca - Spécialiste Médias Sociaux',
      language: 'fr' as const,
      personName: 'Feisca',
      title: 'Spécialiste Médias Sociaux',
      description: 'CV de marketing numérique et gestion des médias sociaux',
    },
  },
  floricaResumeData: {
    data: floricaResumeData,
    metadata: {
      id: 'floricaResumeData',
      fileName: 'floricaResumeData.json',
      displayName: 'Florica - Professional Resume',
      language: 'en' as const,
      personName: 'Florica',
      title: 'Professional',
      description: 'Professional resume for Florica',
    },
  },
  resumeData: {
    data: resumeData,
    metadata: {
      id: 'resumeData',
      fileName: 'resumeData.json',
      displayName: 'Claude De-Tchambila - .NET Developer',
      language: 'en' as const,
      personName: 'Claude De-Tchambila',
      title: '.NET Developer',
      description: "Previous version of Claude's resume",
    },
  },
  resumeDataFrench: {
    data: resumeDataFrench,
    metadata: {
      id: 'resumeDataFrench',
      fileName: 'resumeDataFrench.json',
      displayName: 'Claude De-Tchambila - Développeur .NET',
      language: 'fr' as const,
      personName: 'Claude De-Tchambila',
      title: 'Développeur .NET',
      description: 'Version française du CV de Claude',
    },
  },
};

/**
 * Get all available resumes with their metadata
 */
export const getAllResumes = (): ResumeListItem[] => {
  return Object.values(resumeDataMap).map(item => ({
    ...item.metadata,
    data: item.data,
  }));
};

/**
 * Get a specific resume by ID
 */
export const getResumeById = (id: string): ResumeListItem | null => {
  const item = resumeDataMap[id as keyof typeof resumeDataMap];
  if (!item) {
    return null;
  }

  return {
    ...item.metadata,
    data: item.data,
  };
};

/**
 * Get resumes filtered by language
 */
export const getResumesByLanguage = (
  language: 'en' | 'fr',
): ResumeListItem[] => {
  return getAllResumes().filter(resume => resume.language === language);
};

/**
 * Get resumes filtered by person name
 */
export const getResumesByPerson = (personName: string): ResumeListItem[] => {
  return getAllResumes().filter(resume =>
    resume.personName.toLowerCase().includes(personName.toLowerCase()),
  );
};

/**
 * Search resumes by query (searches in display name, title, and description)
 */
export const searchResumes = (query: string): ResumeListItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllResumes().filter(
    resume =>
      resume.displayName.toLowerCase().includes(lowercaseQuery) ||
      resume.title.toLowerCase().includes(lowercaseQuery) ||
      resume.personName.toLowerCase().includes(lowercaseQuery) ||
      (resume.description &&
        resume.description.toLowerCase().includes(lowercaseQuery)),
  );
};
