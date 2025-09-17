import { ResumeFormData, FormErrors } from '../types/resume';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const urlRegex = /^https?:\/\/.+/;

// Phone validation regex (basic international format)
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  return urlRegex.test(url);
};

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// Validate personal information section
export const validatePersonalInfo = (personalInfo: ResumeFormData['personalInfo']): string[] => {
  const errors: string[] = [];

  if (!validateRequired(personalInfo.name)) {
    errors.push('Name is required');
  }

  if (!validateRequired(personalInfo.title)) {
    errors.push('Title is required');
  }

  if (!validateRequired(personalInfo.email)) {
    errors.push('Email is required');
  } else if (!validateEmail(personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!validateRequired(personalInfo.phone)) {
    errors.push('Phone number is required');
  } else if (!validatePhone(personalInfo.phone)) {
    errors.push('Please enter a valid phone number');
  }

  if (!validateRequired(personalInfo.location)) {
    errors.push('Location is required');
  }

  if (personalInfo.website.destination && !validateUrl(personalInfo.website.destination)) {
    errors.push('Please enter a valid website URL');
  }

  return errors;
};

// Validate work experience section
export const validateWorkExperience = (workExperience: ResumeFormData['workExperience']): string[] => {
  const errors: string[] = [];

  workExperience.forEach((exp, index) => {
    if (!validateRequired(exp.title)) {
      errors.push(`Work experience ${index + 1}: Title is required`);
    }

    if (!validateRequired(exp.company)) {
      errors.push(`Work experience ${index + 1}: Company is required`);
    }

    if (!validateRequired(exp.startDate)) {
      errors.push(`Work experience ${index + 1}: Start date is required`);
    }

    if (!validateRequired(exp.endDate)) {
      errors.push(`Work experience ${index + 1}: End date is required`);
    }

    if (!validateRequired(exp.location)) {
      errors.push(`Work experience ${index + 1}: Location is required`);
    }

    if (!validateRequired(exp.description)) {
      errors.push(`Work experience ${index + 1}: Description is required`);
    }

    if (exp.responsibilities.length === 0) {
      errors.push(`Work experience ${index + 1}: At least one responsibility is required`);
    }
  });

  return errors;
};

// Validate education section
export const validateEducation = (education: ResumeFormData['education']): string[] => {
  const errors: string[] = [];

  education.forEach((edu, index) => {
    if (!validateRequired(edu.degree)) {
      errors.push(`Education ${index + 1}: Degree is required`);
    }

    if (!validateRequired(edu.institution)) {
      errors.push(`Education ${index + 1}: Institution is required`);
    }

    if (!validateRequired(edu.startDate)) {
      errors.push(`Education ${index + 1}: Start date is required`);
    }

    if (!validateRequired(edu.endDate)) {
      errors.push(`Education ${index + 1}: End date is required`);
    }

    if (!validateRequired(edu.location)) {
      errors.push(`Education ${index + 1}: Location is required`);
    }

    if (edu.institutionUrl && !validateUrl(edu.institutionUrl)) {
      errors.push(`Education ${index + 1}: Please enter a valid institution URL`);
    }
  });

  return errors;
};

// Validate references section
export const validateReferences = (references: ResumeFormData['references']): string[] => {
  const errors: string[] = [];

  references.forEach((ref, index) => {
    if (!validateRequired(ref.fullName)) {
      errors.push(`Reference ${index + 1}: Full name is required`);
    }

    if (!validateRequired(ref.role)) {
      errors.push(`Reference ${index + 1}: Role is required`);
    }

    if (!validateRequired(ref.email)) {
      errors.push(`Reference ${index + 1}: Email is required`);
    } else if (!validateEmail(ref.email)) {
      errors.push(`Reference ${index + 1}: Please enter a valid email address`);
    }

    if (!validateRequired(ref.company)) {
      errors.push(`Reference ${index + 1}: Company is required`);
    }
  });

  return errors;
};

// Validate social links section
export const validateSocialLinks = (socialLinks: ResumeFormData['socialLinks']): string[] => {
  const errors: string[] = [];

  socialLinks.forEach((link, index) => {
    if (!validateRequired(link.platform)) {
      errors.push(`Social link ${index + 1}: Platform is required`);
    }

    if (!validateRequired(link.url)) {
      errors.push(`Social link ${index + 1}: URL is required`);
    } else if (!validateUrl(link.url)) {
      errors.push(`Social link ${index + 1}: Please enter a valid URL`);
    }

    if (!validateRequired(link.displayText)) {
      errors.push(`Social link ${index + 1}: Display text is required`);
    }
  });

  return errors;
};

// Validate notable projects section
export const validateNotableProjects = (projects: ResumeFormData['notableProjects']): string[] => {
  const errors: string[] = [];

  projects.forEach((project, index) => {
    if (!validateRequired(project.title)) {
      errors.push(`Project ${index + 1}: Title is required`);
    }

    if (!validateRequired(project.description)) {
      errors.push(`Project ${index + 1}: Description is required`);
    }

    if (project.url && !validateUrl(project.url)) {
      errors.push(`Project ${index + 1}: Please enter a valid URL`);
    }
  });

  return errors;
};

// Validate languages section
export const validateLanguages = (languages: ResumeFormData['languages']): string[] => {
  const errors: string[] = [];

  languages.forEach((lang, index) => {
    if (!validateRequired(lang.name)) {
      errors.push(`Language ${index + 1}: Name is required`);
    }

    if (!validateRequired(lang.level)) {
      errors.push(`Language ${index + 1}: Level is required`);
    }

    if (lang.proficiency < 1 || lang.proficiency > 5) {
      errors.push(`Language ${index + 1}: Proficiency must be between 1 and 5`);
    }
  });

  return errors;
};

// Main validation function for the entire form
export const validateResumeForm = (formData: ResumeFormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate personal info
  const personalInfoErrors = validatePersonalInfo(formData.personalInfo);
  if (personalInfoErrors.length > 0) {
    errors.personalInfo = personalInfoErrors;
  }

  // Validate summary
  if (!validateRequired(formData.summary)) {
    errors.summary = 'Summary is required';
  } else if (!validateMinLength(formData.summary, 50)) {
    errors.summary = 'Summary must be at least 50 characters long';
  }

  // Validate work experience
  const workExperienceErrors = validateWorkExperience(formData.workExperience);
  if (workExperienceErrors.length > 0) {
    errors.workExperience = workExperienceErrors;
  }

  // Validate education
  const educationErrors = validateEducation(formData.education);
  if (educationErrors.length > 0) {
    errors.education = educationErrors;
  }

  // Validate references
  const referencesErrors = validateReferences(formData.references);
  if (referencesErrors.length > 0) {
    errors.references = referencesErrors;
  }

  // Validate social links
  const socialLinksErrors = validateSocialLinks(formData.socialLinks);
  if (socialLinksErrors.length > 0) {
    errors.socialLinks = socialLinksErrors;
  }

  // Validate notable projects
  const notableProjectsErrors = validateNotableProjects(formData.notableProjects);
  if (notableProjectsErrors.length > 0) {
    errors.notableProjects = notableProjectsErrors;
  }

  // Validate languages
  const languagesErrors = validateLanguages(formData.languages);
  if (languagesErrors.length > 0) {
    errors.languages = languagesErrors;
  }

  // Validate technologies and skills arrays
  if (formData.technologies.length === 0) {
    errors.technologies = 'At least one technology is required';
  }

  if (formData.skills.length === 0) {
    errors.skills = 'At least one skill is required';
  }

  return errors;
};
