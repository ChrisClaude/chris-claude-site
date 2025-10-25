import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
} from '@heroui/react';
import { NotableProject } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NotableProjectsFormProps {
  notableProjects: NotableProject[];
  errors?: string[];
  onChange: (notableProjects: NotableProject[]) => void;
}

const NotableProjectsForm: React.FC<NotableProjectsFormProps> = ({
  notableProjects,
  errors = [],
  onChange,
}) => {
  const addProject = () => {
    const newProject: NotableProject = {
      title: '',
      url: '',
      description: '',
    };
    onChange([...notableProjects, newProject]);
  };

  const updateProject = (
    index: number,
    field: keyof NotableProject,
    value: string,
  ) => {
    const updated = [...notableProjects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeProject = (index: number) => {
    const updated = notableProjects.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white">
        <h3 className="text-xl font-semibold text-gray-900">
          Notable Projects
        </h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addProject}
        >
          Add Project
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

        {notableProjects.map((project, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Project {index + 1}
                {project.title && ` - ${project.title}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeProject(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4 bg-white">
              <Input
                label="Project Title"
                placeholder="e.g., E-commerce Platform"
                value={project.title}
                onChange={e => updateProject(index, 'title', e.target.value)}
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
                label="Project URL"
                placeholder="https://github.com/username/project or https://project-demo.com"
                value={project.url}
                onChange={e => updateProject(index, 'url', e.target.value)}
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

              <Textarea
                label="Project Description"
                placeholder="Describe the project, technologies used, and your role..."
                value={project.description}
                onChange={e =>
                  updateProject(index, 'description', e.target.value)
                }
                isRequired
                variant="bordered"
                minRows={3}
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
            </CardBody>
          </Card>
        ))}

        {notableProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet.</p>
            <p className="text-sm">Click "Add Project" to get started.</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default NotableProjectsForm;
