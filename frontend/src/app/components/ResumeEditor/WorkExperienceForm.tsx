import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Chip,
} from '@heroui/react';
import { WorkExperience } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  errors?: string[];
  onChange: (workExperience: WorkExperience[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  errors = [],
  onChange,
}) => {
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      responsibilities: [],
    };
    onChange([...workExperience, newExperience]);
  };

  const updateWorkExperience = (
    index: number,
    field: keyof WorkExperience,
    value: any,
  ) => {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeWorkExperience = (index: number) => {
    const updated = workExperience.filter((_, i) => i !== index);
    onChange(updated);
  };

  const addResponsibility = (experienceIndex: number) => {
    const updated = [...workExperience];
    updated[experienceIndex].responsibilities.push('');
    onChange(updated);
  };

  const updateResponsibility = (
    experienceIndex: number,
    responsibilityIndex: number,
    value: string,
  ) => {
    const updated = [...workExperience];
    updated[experienceIndex].responsibilities[responsibilityIndex] = value;
    onChange(updated);
  };

  const removeResponsibility = (
    experienceIndex: number,
    responsibilityIndex: number,
  ) => {
    const updated = [...workExperience];
    updated[experienceIndex].responsibilities = updated[
      experienceIndex
    ].responsibilities.filter((_, i) => i !== responsibilityIndex);
    onChange(updated);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white">
        <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addWorkExperience}
        >
          Add Experience
        </Button>
      </CardHeader>
      <CardBody className="space-y-6 bg-white">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {workExperience.map((experience, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Experience {index + 1}
                {experience.title && ` - ${experience.title}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeWorkExperience(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Job Title"
                  placeholder="e.g., Senior .NET Developer"
                  value={experience.title}
                  onChange={e =>
                    updateWorkExperience(index, 'title', e.target.value)
                  }
                  isRequired
                  variant="bordered"
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

                <Input
                  label="Company"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={e =>
                    updateWorkExperience(index, 'company', e.target.value)
                  }
                  isRequired
                  variant="bordered"
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

                <Input
                  label="Start Date"
                  placeholder="MM/YYYY"
                  value={experience.startDate}
                  onChange={e =>
                    updateWorkExperience(index, 'startDate', e.target.value)
                  }
                  isRequired
                  variant="bordered"
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

                <Input
                  label="End Date"
                  placeholder="MM/YYYY or Present"
                  value={experience.endDate}
                  onChange={e =>
                    updateWorkExperience(index, 'endDate', e.target.value)
                  }
                  isRequired
                  variant="bordered"
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

                <Input
                  label="Location"
                  placeholder="City, Country"
                  value={experience.location}
                  onChange={e =>
                    updateWorkExperience(index, 'location', e.target.value)
                  }
                  isRequired
                  variant="bordered"
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
              </div>

              <Textarea
                label="Description"
                placeholder="Brief description of your role and the company"
                value={experience.description}
                onChange={e =>
                  updateWorkExperience(index, 'description', e.target.value)
                }
                isRequired
                variant="bordered"
                minRows={2}
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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900">
                    Responsibilities
                  </h5>
                  <Button
                    color="primary"
                    variant="light"
                    size="sm"
                    startContent={<PlusIcon className="w-4 h-4" />}
                    onPress={() => addResponsibility(index)}
                  >
                    Add Responsibility
                  </Button>
                </div>

                {experience.responsibilities.map(
                  (responsibility, respIndex) => (
                    <div key={respIndex} className="flex gap-2">
                      <Input
                        placeholder="Describe a key responsibility or achievement"
                        value={responsibility}
                        onChange={e =>
                          updateResponsibility(index, respIndex, e.target.value)
                        }
                        variant="bordered"
                        className="flex-1"
                        classNames={{
                          input: 'text-gray-900',
                          inputWrapper:
                            'bg-white border-gray-300 hover:bg-white',
                          label:
                            'text-gray-700 !text-sm !font-medium !mb-1.5 !static !transform-none',
                          base: 'bg-white',
                          mainWrapper: 'bg-white',
                        }}
                        labelPlacement="outside"
                      />
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        isIconOnly
                        onPress={() => removeResponsibility(index, respIndex)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ),
                )}

                {experience.responsibilities.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No responsibilities added yet. Click &quot;Add
                    Responsibility&quot; to get started.
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        ))}

        {workExperience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <p className="text-sm">
              Click &quot;Add Experience&quot; to get started.
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default WorkExperienceForm;
