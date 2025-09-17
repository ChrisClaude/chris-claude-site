import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from '@heroui/react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  errors?: string[];
  onChange: (personalInfo: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  errors = [],
  onChange,
}) => {
  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleWebsiteChange = (field: keyof PersonalInfo['website'], value: string) => {
    onChange({
      ...personalInfo,
      website: {
        ...personalInfo.website,
        [field]: value,
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">Personal Information</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={personalInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            isRequired
            variant="bordered"
          />

          <Input
            label="Professional Title"
            placeholder="e.g., Senior .NET Developer"
            value={personalInfo.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            isRequired
            variant="bordered"
          />

          <Input
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            isRequired
            variant="bordered"
          />

          <Input
            label="Phone"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            isRequired
            variant="bordered"
          />

          <Input
            label="Location"
            placeholder="City, Country"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            isRequired
            variant="bordered"
          />

          <Input
            label="Image URL"
            placeholder="https://example.com/your-photo.jpg"
            value={personalInfo.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            variant="bordered"
          />

          <Input
            label="Image Alt Text"
            placeholder="Your name"
            value={personalInfo.imageAlt}
            onChange={(e) => handleInputChange('imageAlt', e.target.value)}
            variant="bordered"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Website Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Website Label"
              placeholder="Website"
              value={personalInfo.website.label}
              onChange={(e) => handleWebsiteChange('label', e.target.value)}
              variant="bordered"
            />

            <Input
              label="Website URL"
              placeholder="https://yourwebsite.com"
              value={personalInfo.website.destination}
              onChange={(e) => handleWebsiteChange('destination', e.target.value)}
              variant="bordered"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PersonalInfoForm;
