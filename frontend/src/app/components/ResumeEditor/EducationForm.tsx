import React from 'react';
import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';
import { Education } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  education: Education[];
  errors?: string[];
  onChange: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  errors = [],
  onChange,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      degree: '',
      institution: '',
      institutionUrl: '',
      startDate: '',
      endDate: '',
      location: '',
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">Education</h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addEducation}
        >
          Add Education
        </Button>
      </CardHeader>
      <CardBody className="space-y-6">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {education.map((edu, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <h4 className="text-lg font-medium">
                Education {index + 1}
                {edu.degree && ` - ${edu.degree}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeEducation(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  value={edu.degree}
                  onChange={e =>
                    updateEducation(index, 'degree', e.target.value)
                  }
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Institution"
                  placeholder="University or College Name"
                  value={edu.institution}
                  onChange={e =>
                    updateEducation(index, 'institution', e.target.value)
                  }
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Start Date"
                  placeholder="MM/YYYY"
                  value={edu.startDate}
                  onChange={e =>
                    updateEducation(index, 'startDate', e.target.value)
                  }
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="End Date"
                  placeholder="MM/YYYY"
                  value={edu.endDate}
                  onChange={e =>
                    updateEducation(index, 'endDate', e.target.value)
                  }
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Location"
                  placeholder="City, Country"
                  value={edu.location}
                  onChange={e =>
                    updateEducation(index, 'location', e.target.value)
                  }
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Institution URL"
                  placeholder="https://university.edu"
                  value={edu.institutionUrl}
                  onChange={e =>
                    updateEducation(index, 'institutionUrl', e.target.value)
                  }
                  variant="bordered"
                />
              </div>
            </CardBody>
          </Card>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education entries added yet.</p>
            <p className="text-sm">
              Click &quot;Add Education&quot; to get started.
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default EducationForm;
