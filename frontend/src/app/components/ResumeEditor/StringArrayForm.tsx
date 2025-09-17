import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Chip,
} from '@heroui/react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

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
  placeholder = "Enter an item",
  addButtonText = "Add Item",
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
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardBody className="space-y-4">
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
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="bordered"
            className="flex-1"
          />
          <Button
            color="primary"
            variant="flat"
            startContent={<PlusIcon className="w-4 h-4" />}
            onPress={addItem}
            isDisabled={!newItem.trim() || items.includes(newItem.trim())}
          >
            {addButtonText}
          </Button>
        </div>

        {items.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Current Items:</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <Chip
                  key={index}
                  onClose={() => removeItem(index)}
                  variant="flat"
                  color="primary"
                  className="cursor-pointer"
                >
                  {item}
                </Chip>
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
      </CardBody>
    </Card>
  );
};

export default StringArrayForm;
