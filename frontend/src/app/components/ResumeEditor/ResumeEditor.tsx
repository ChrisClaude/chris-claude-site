import React, { useState, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Textarea,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
} from '@heroui/react';
import { useResumeForm } from '../../hooks/useResumeForm';
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
import { DocumentArrowDownIcon, DocumentArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        .catch((error) => {
          alert(`Error importing file: ${error.message}`);
        });
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes? This action cannot be undone.')) {
      resetForm();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <div>
              <h1 className="text-2xl font-bold">Resume Editor</h1>
              <p className="text-gray-600">Create and edit your resume data</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                color="secondary"
                variant="flat"
                startContent={<DocumentArrowUpIcon className="w-4 h-4" />}
                onPress={() => fileInputRef.current?.click()}
              >
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
                color="warning"
                variant="flat"
                onPress={handleReset}
                isDisabled={!isDirty}
              >
                Reset
              </Button>
              <Button
                color="success"
                variant="flat"
                onPress={handleValidate}
                isLoading={isValidating}
                startContent={!isValidating ? <CheckCircleIcon className="w-4 h-4" /> : undefined}
              >
                {isValidating ? 'Validating...' : 'Validate'}
              </Button>
              <Button
                color="primary"
                onPress={handleExport}
                startContent={<DocumentArrowDownIcon className="w-4 h-4" />}
              >
                Export JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {isValidating && (
            <div className="mb-4">
              <Progress value={validationProgress} className="w-full" />
            </div>
          )}
          
          <Tabs aria-label="Resume sections" className="w-full">
            <Tab key="personal" title="Personal Info">
              <div className="py-4">
                <PersonalInfoForm
                  personalInfo={formData.personalInfo}
                  errors={Array.isArray(errors.personalInfo) ? errors.personalInfo : []}
                  onChange={(personalInfo) => updateSection('personalInfo', personalInfo)}
                />
              </div>
            </Tab>

            <Tab key="summary" title="Summary">
              <div className="py-4">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Professional Summary</h3>
                  </CardHeader>
                  <CardBody>
                    {errors.summary && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <p className="text-sm text-red-600">• {errors.summary}</p>
                      </div>
                    )}
                    <Textarea
                      placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
                      value={formData.summary}
                      onChange={(e) => updateSection('summary', e.target.value)}
                      variant="bordered"
                      minRows={4}
                      maxRows={8}
                    />
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="experience" title="Work Experience">
              <div className="py-4">
                <WorkExperienceForm
                  workExperience={formData.workExperience}
                  errors={Array.isArray(errors.workExperience) ? errors.workExperience : []}
                  onChange={(workExperience) => updateSection('workExperience', workExperience)}
                />
              </div>
            </Tab>

            <Tab key="education" title="Education">
              <div className="py-4">
                <EducationForm
                  education={formData.education}
                  errors={Array.isArray(errors.education) ? errors.education : []}
                  onChange={(education) => updateSection('education', education)}
                />
              </div>
            </Tab>

            <Tab key="skills" title="Skills & Tech">
              <div className="py-4 space-y-6">
                <StringArrayForm
                  title="Technologies"
                  items={formData.technologies}
                  errors={Array.isArray(errors.technologies) ? errors.technologies : []}
                  onChange={(technologies) => updateSection('technologies', technologies)}
                  placeholder="e.g., C#, .NET Core, React"
                  addButtonText="Add Technology"
                />
                
                <StringArrayForm
                  title="Skills"
                  items={formData.skills}
                  errors={Array.isArray(errors.skills) ? errors.skills : []}
                  onChange={(skills) => updateSection('skills', skills)}
                  placeholder="e.g., API Development, Cloud Architecture"
                  addButtonText="Add Skill"
                />
              </div>
            </Tab>

            <Tab key="projects" title="Projects">
              <div className="py-4">
                <NotableProjectsForm
                  notableProjects={formData.notableProjects}
                  errors={Array.isArray(errors.notableProjects) ? errors.notableProjects : []}
                  onChange={(notableProjects) => updateSection('notableProjects', notableProjects)}
                />
              </div>
            </Tab>

            <Tab key="languages" title="Languages">
              <div className="py-4">
                <LanguagesForm
                  languages={formData.languages}
                  errors={Array.isArray(errors.languages) ? errors.languages : []}
                  onChange={(languages) => updateSection('languages', languages)}
                />
              </div>
            </Tab>

            <Tab key="social" title="Social Links">
              <div className="py-4">
                <SocialLinksForm
                  socialLinks={formData.socialLinks}
                  errors={Array.isArray(errors.socialLinks) ? errors.socialLinks : []}
                  onChange={(socialLinks) => updateSection('socialLinks', socialLinks)}
                />
              </div>
            </Tab>

            <Tab key="references" title="References">
              <div className="py-4">
                <ReferencesForm
                  references={formData.references}
                  errors={Array.isArray(errors.references) ? errors.references : []}
                  onChange={(references) => updateSection('references', references)}
                />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              Validation Successful
            </div>
          </ModalHeader>
          <ModalBody>
            <p>Your resume data has been validated successfully! All required fields are filled and the data is ready for export.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResumeEditor;
