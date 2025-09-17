import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
} from '@heroui/react';
import { Reference } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ReferencesFormProps {
  references: Reference[];
  errors?: string[];
  onChange: (references: Reference[]) => void;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({
  references,
  errors = [],
  onChange,
}) => {
  const addReference = () => {
    const newReference: Reference = {
      fullName: '',
      role: '',
      email: '',
      company: '',
    };
    onChange([...references, newReference]);
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeReference = (index: number) => {
    const updated = references.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">References</h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addReference}
        >
          Add Reference
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

        {references.map((reference, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <h4 className="text-lg font-medium">
                Reference {index + 1}
                {reference.fullName && ` - ${reference.fullName}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeReference(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={reference.fullName}
                  onChange={(e) => updateReference(index, 'fullName', e.target.value)}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Role/Position"
                  placeholder="Senior Software Engineer"
                  value={reference.role}
                  onChange={(e) => updateReference(index, 'role', e.target.value)}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={reference.email}
                  onChange={(e) => updateReference(index, 'email', e.target.value)}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Company"
                  placeholder="Company Name"
                  value={reference.company}
                  onChange={(e) => updateReference(index, 'company', e.target.value)}
                  isRequired
                  variant="bordered"
                />
              </div>
            </CardBody>
          </Card>
        ))}

        {references.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No references added yet.</p>
            <p className="text-sm">Click "Add Reference" to get started.</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ReferencesForm;
