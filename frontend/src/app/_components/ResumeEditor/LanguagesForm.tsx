import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from '@heroui/react';
import { Language } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Input } from './FormFields';

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
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white">
        <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
        <Button
          variant="secondary"
          onPress={addLanguage}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Language
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

        {languages.map((language, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Language {index + 1}
                {language.name && ` - ${language.name}`}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => removeLanguage(index)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Language Name"
                  placeholder="e.g., English, Spanish, French"
                  value={language.name}
                  onChange={e => updateLanguage(index, 'name', e.target.value)}
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

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Proficiency Level</label>
                  <Select
                    selectedKey={language.level || null}
                    onSelectionChange={key => {
                      updateLanguage(index, 'level', key ? String(key) : '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover>
                      <ListBox>
                        {languageLevels.map(level => (
                          <ListBoxItem key={level.key} id={level.key}>{level.label}</ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Proficiency Rating: {language.proficiency}/5
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={language.proficiency}
                  onChange={e =>
                    updateLanguage(index, 'proficiency', Number(e.target.value))
                  }
                  className="max-w-md w-full accent-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Basic</span>
                  <span>Native</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {languages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No languages added yet.</p>
            <p className="text-sm">
              Click &quot;Add Language&quot; to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguagesForm;
