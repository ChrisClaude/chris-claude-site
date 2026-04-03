import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ProgressBar,
} from '@heroui/react';
import { useResumeForm } from '../../_hooks/useResumeForm';
import { validateResumeForm } from '../../utils/validation';
import { ResumeData } from '../../types/resume';
import PersonalInfoForm from './PersonalInfoForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';
import StringArrayForm from './StringArrayForm';
import ReferencesForm from './ReferencesForm';
import SocialLinksForm from './SocialLinksForm';
import LanguagesForm from './LanguagesForm';
import NotableProjectsForm from './NotableProjectsForm';
import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { TextArea } from './FormFields';

interface ResumeEditorProps {
  initialData?: ResumeData;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ initialData }) => {
  const {
    formData,
    errors,
    isDirty,
    updateSection,
    setFormErrors,
    clearErrors,
    resetForm,
    exportAsJSON,
    importFromJSON,
  } = useResumeForm(initialData);

  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationProgress(0);

    // Simulate validation progress
    const progressInterval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const validationErrors = validateResumeForm(formData);
      setFormErrors(validationErrors);

      // Complete progress
      setTimeout(() => {
        setValidationProgress(100);
        setIsValidating(false);
        clearInterval(progressInterval);

        if (Object.keys(validationErrors).length === 0) {
          onOpen(); // Show success modal
        }
      }, 500);
    } catch (error) {
      setIsValidating(false);
      clearInterval(progressInterval);
      console.error('Validation error:', error);
    }
  };

  const handleExport = () => {
    const validationErrors = validateResumeForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      exportAsJSON();
    } else {
      setFormErrors(validationErrors);
      alert('Please fix validation errors before exporting.');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importFromJSON(file)
        .then(() => {
          alert('Resume data imported successfully!');
        })
        .catch(error => {
          alert(`Error importing file: ${error.message}`);
        });
    }
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset all changes? This action cannot be undone.',
      )
    ) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Resume Editor
                </h1>
                <p className="text-gray-600">
                  Create and edit your resume data
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onPress={() => fileInputRef.current?.click()}
                >
                  <DocumentArrowUpIcon className="mr-2 h-4 w-4" />
                  Import JSON
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  onPress={handleReset}
                  isDisabled={!isDirty}
                >
                  Reset
                </Button>
                <Button
                  variant="secondary"
                  onPress={handleValidate}
                >
                  {!isValidating ? (
                    <CheckCircleIcon className="mr-2 h-4 w-4" />
                  ) : null}
                  {isValidating ? 'Validating...' : 'Validate'}
                </Button>
                <Button
                  onPress={handleExport}
                >
                  <DocumentArrowDownIcon className="mr-2 h-4 w-4" />
                  Export JSON
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isValidating && (
              <div className="mb-4">
                <ProgressBar value={validationProgress} className="w-full" />
              </div>
            )}

            <div className="space-y-6">
              <div className="py-4">
                <PersonalInfoForm
                  personalInfo={formData.personalInfo}
                  errors={
                    Array.isArray(errors.personalInfo) ? errors.personalInfo : []
                  }
                  onChange={personalInfo =>
                    updateSection('personalInfo', personalInfo)
                  }
                />
              </div>

              <div className="py-4">
                <Card className="bg-white">
                  <CardHeader className="bg-white">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Professional Summary
                    </h3>
                  </CardHeader>
                  <CardContent className="bg-white">
                    {errors.summary && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <p className="text-sm text-red-600">• {errors.summary}</p>
                      </div>
                    )}
                    <TextArea
                      placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
                      value={formData.summary}
                      onChange={e => updateSection('summary', e.target.value)}
                      variant="bordered"
                      minRows={4}
                      maxRows={8}
                      classNames={{
                        input: 'text-gray-900',
                        inputWrapper: 'bg-white border-gray-300 hover:bg-white',
                        label:
                          'text-gray-700 !text-sm !font-medium !mb-1.5 !static !transform-none',
                        base: 'bg-white',
                        mainWrapper: 'bg-white',
                      }}
                      labelPlacement="outside"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="py-4">
                <WorkExperienceForm
                  workExperience={formData.workExperience}
                  errors={
                    Array.isArray(errors.workExperience) ? errors.workExperience : []
                  }
                  onChange={workExperience =>
                    updateSection('workExperience', workExperience)
                  }
                />
              </div>

              <div className="py-4">
                <EducationForm
                  education={formData.education}
                  errors={Array.isArray(errors.education) ? errors.education : []}
                  onChange={education => updateSection('education', education)}
                />
              </div>

              <div className="py-4 space-y-6">
                <StringArrayForm
                  title="Technologies"
                  items={formData.technologies}
                  errors={
                    Array.isArray(errors.technologies) ? errors.technologies : []
                  }
                  onChange={technologies =>
                    updateSection('technologies', technologies)
                  }
                  placeholder="e.g., C#, .NET Core, React"
                  addButtonText="Add Technology"
                />

                <StringArrayForm
                  title="Skills"
                  items={formData.skills}
                  errors={Array.isArray(errors.skills) ? errors.skills : []}
                  onChange={skills => updateSection('skills', skills)}
                  placeholder="e.g., API Development, Cloud Architecture"
                  addButtonText="Add Skill"
                />
              </div>

              <div className="py-4">
                <NotableProjectsForm
                  notableProjects={formData.notableProjects}
                  errors={
                    Array.isArray(errors.notableProjects)
                      ? errors.notableProjects
                      : []
                  }
                  onChange={notableProjects =>
                    updateSection('notableProjects', notableProjects)
                  }
                />
              </div>

              <div className="py-4">
                <LanguagesForm
                  languages={formData.languages}
                  errors={Array.isArray(errors.languages) ? errors.languages : []}
                  onChange={languages => updateSection('languages', languages)}
                />
              </div>

              <div className="py-4">
                <SocialLinksForm
                  socialLinks={formData.socialLinks}
                  errors={
                    Array.isArray(errors.socialLinks) ? errors.socialLinks : []
                  }
                  onChange={socialLinks => updateSection('socialLinks', socialLinks)}
                />
              </div>

              <div className="py-4">
                <ReferencesForm
                  references={formData.references}
                  errors={Array.isArray(errors.references) ? errors.references : []}
                  onChange={references => updateSection('references', references)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Modal */}
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
          <ModalBackdrop />
          <ModalContainer>
            <ModalDialog>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  Validation Successful
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Your resume data has been validated successfully! All required
                  fields are filled and the data is ready for export.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </Modal>
      </div>
    </div>
  );
};

export default ResumeEditor;
