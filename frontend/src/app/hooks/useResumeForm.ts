import { useState, useCallback } from 'react';
import { ResumeData, FormErrors, ResumeFormData } from '../types/resume';

// Default empty resume data structure
const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '',
    title: '',
    phone: '',
    email: '',
    website: {
      label: 'Website',
      destination: '',
    },
    location: '',
    image: '',
    imageAlt: '',
  },
  summary: '',
  workExperience: [],
  references: [],
  technologies: [],
  skills: [],
  education: [],
  languages: [],
  notableProjects: [],
  socialLinks: [],
};

export const useResumeForm = (initialData?: ResumeData) => {
  const [formData, setFormData] = useState<ResumeFormData>(
    initialData || defaultResumeData
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  // Update form data and mark as dirty
  const updateFormData = useCallback((updates: Partial<ResumeFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
    // Clear related errors when data is updated
    const errorKeys = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      errorKeys.forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  }, []);

  // Update specific section of form data
  const updateSection = useCallback((
    section: keyof ResumeFormData,
    data: any
  ) => {
    updateFormData({ [section]: data });
  }, [updateFormData]);

  // Add item to array sections
  const addArrayItem = useCallback((
    section: keyof ResumeFormData,
    item: any
  ) => {
    const currentArray = formData[section] as any[];
    updateSection(section, [...currentArray, item]);
  }, [formData, updateSection]);

  // Update array item at specific index
  const updateArrayItem = useCallback((
    section: keyof ResumeFormData,
    index: number,
    item: any
  ) => {
    const currentArray = formData[section] as any[];
    const updatedArray = [...currentArray];
    updatedArray[index] = item;
    updateSection(section, updatedArray);
  }, [formData, updateSection]);

  // Remove array item at specific index
  const removeArrayItem = useCallback((
    section: keyof ResumeFormData,
    index: number
  ) => {
    const currentArray = formData[section] as any[];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateSection(section, updatedArray);
  }, [formData, updateSection]);

  // Set form errors
  const setFormErrors = useCallback((newErrors: FormErrors) => {
    setErrors(newErrors);
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialData || defaultResumeData);
    setErrors({});
    setIsDirty(false);
  }, [initialData]);

  // Export form data as JSON
  const exportAsJSON = useCallback(() => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [formData]);

  // Import JSON data
  const importFromJSON = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setFormData(jsonData);
          setErrors({});
          setIsDirty(false);
          resolve();
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return {
    formData,
    errors,
    isDirty,
    updateFormData,
    updateSection,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    setFormErrors,
    clearErrors,
    resetForm,
    exportAsJSON,
    importFromJSON,
  };
};
