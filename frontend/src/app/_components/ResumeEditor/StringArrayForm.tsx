import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button } from '@heroui/react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Input } from './FormFields';

interface StringArrayFormProps {
  title: string;
  items: string[];
  errors?: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addButtonText?: string;
}

const StringArrayForm: React.FC<StringArrayFormProps> = ({
  title,
  items,
  errors = [],
  onChange,
  placeholder = 'Enter an item',
  addButtonText = 'Add Item',
}) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="bg-white">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4 bg-white">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="bordered"
            className="flex-1"
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
          <Button
            variant="secondary"
            onPress={addItem}
            isDisabled={!newItem.trim() || items.includes(newItem.trim())}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        </div>

        {items.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Current Items:</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item}`}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p>No items added yet.</p>
            <p className="text-sm">Add items using the input above.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StringArrayForm;
