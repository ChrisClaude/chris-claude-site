import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Slider,
} from '@heroui/react';
import { Language } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface LanguagesFormProps {
  languages: Language[];
  errors?: string[];
  onChange: (languages: Language[]) => void;
}

const languageLevels = [
  { key: 'Beginner', label: 'Beginner' },
  { key: 'Elementary', label: 'Elementary' },
  { key: 'Intermediate', label: 'Intermediate' },
  { key: 'Advanced', label: 'Advanced' },
  { key: 'Fluent', label: 'Fluent' },
  { key: 'Native', label: 'Native' },
];

const LanguagesForm: React.FC<LanguagesFormProps> = ({
  languages,
  errors = [],
  onChange,
}) => {
  const addLanguage = () => {
    const newLanguage: Language = {
      name: '',
      level: '',
      proficiency: 3,
    };
    onChange([...languages, newLanguage]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: any) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeLanguage = (index: number) => {
    const updated = languages.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">Languages</h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addLanguage}
        >
          Add Language
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

        {languages.map((language, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <h4 className="text-lg font-medium">
                Language {index + 1}
                {language.name && ` - ${language.name}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeLanguage(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Language Name"
                  placeholder="e.g., English, Spanish, French"
                  value={language.name}
                  onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                  isRequired
                  variant="bordered"
                />

                <Select
                  label="Proficiency Level"
                  placeholder="Select proficiency level"
                  selectedKeys={language.level ? [language.level] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    updateLanguage(index, 'level', selectedKey);
                  }}
                  variant="bordered"
                >
                  {languageLevels.map((level) => (
                    <SelectItem key={level.key} value={level.key}>
                      {level.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Proficiency Rating: {language.proficiency}/5
                </label>
                <Slider
                  size="sm"
                  step={1}
                  color="primary"
                  showSteps={true}
                  showOutline={true}
                  disableThumbScale={true}
                  formatOptions={{style: "decimal"}}
                  tooltipValueFormatOptions={{style: "decimal"}}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3" },
                    { value: 4, label: "4" },
                    { value: 5, label: "5" },
                  ]}
                  minValue={1}
                  maxValue={5}
                  value={language.proficiency}
                  onChange={(value) => updateLanguage(index, 'proficiency', value as number)}
                  className="max-w-md"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Basic</span>
                  <span>Native</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {languages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No languages added yet.</p>
            <p className="text-sm">Click "Add Language" to get started.</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default LanguagesForm;
