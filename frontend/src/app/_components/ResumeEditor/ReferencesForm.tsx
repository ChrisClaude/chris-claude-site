import React from 'react';
import { Card, CardContent, CardHeader, Button } from '@heroui/react';
import { Reference } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Input } from './FormFields';

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

  const updateReference = (
    index: number,
    field: keyof Reference,
    value: string,
  ) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeReference = (index: number) => {
    const updated = references.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white">
        <h3 className="text-xl font-semibold text-gray-900">References</h3>
        <Button
          variant="secondary"
          onPress={addReference}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Reference
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 bg-white">
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
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Reference {index + 1}
                {reference.fullName && ` - ${reference.fullName}`}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => removeReference(index)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={reference.fullName}
                  onChange={e =>
                    updateReference(index, 'fullName', e.target.value)
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
                  label="Role/Position"
                  placeholder="Senior Software Engineer"
                  value={reference.role}
                  onChange={e => updateReference(index, 'role', e.target.value)}
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
                  label="Email"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={reference.email}
                  onChange={e =>
                    updateReference(index, 'email', e.target.value)
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
                  value={reference.company}
                  onChange={e =>
                    updateReference(index, 'company', e.target.value)
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
            </CardContent>
          </Card>
        ))}

        {references.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No references added yet.</p>
            <p className="text-sm">
              Click &quot;Add Reference&quot; to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferencesForm;
