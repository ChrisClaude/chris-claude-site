import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
} from '@heroui/react';
import { SocialLink } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface SocialLinksFormProps {
  socialLinks: SocialLink[];
  errors?: string[];
  onChange: (socialLinks: SocialLink[]) => void;
}

// Common social media platforms with their icons
const socialPlatforms = [
  { key: 'LinkedIn', label: 'LinkedIn', icon: 'FaLinkedinIn' },
  { key: 'GitHub', label: 'GitHub', icon: 'FaGithub' },
  { key: 'Twitter', label: 'Twitter', icon: 'FaTwitter' },
  { key: 'Facebook', label: 'Facebook', icon: 'FaFacebook' },
  { key: 'Instagram', label: 'Instagram', icon: 'FaInstagram' },
  { key: 'YouTube', label: 'YouTube', icon: 'FaYoutube' },
  { key: 'LeetCode', label: 'LeetCode', icon: 'SiLeetcode' },
  { key: 'HackerRank', label: 'HackerRank', icon: 'FaHackerrank' },
  { key: 'Stack Overflow', label: 'Stack Overflow', icon: 'FaStackOverflow' },
  { key: 'Medium', label: 'Medium', icon: 'FaMedium' },
  { key: 'Dev.to', label: 'Dev.to', icon: 'FaDev' },
  { key: 'Site', label: 'Personal Website', icon: 'GiEarthAfricaEurope' },
  { key: 'Portfolio', label: 'Portfolio', icon: 'FaPortfolio' },
  { key: 'Other', label: 'Other', icon: 'FaLink' },
];

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  socialLinks,
  errors = [],
  onChange,
}) => {
  const addSocialLink = () => {
    const newSocialLink: SocialLink = {
      platform: '',
      icon: '',
      url: '',
      displayText: '',
    };
    onChange([...socialLinks, newSocialLink]);
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-update icon when platform changes
    if (field === 'platform') {
      const platform = socialPlatforms.find(p => p.key === value);
      if (platform) {
        updated[index].icon = platform.icon;
      }
    }

    onChange(updated);
  };

  const removeSocialLink = (index: number) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-white">
        <h3 className="text-xl font-semibold text-gray-900">Social Links</h3>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={addSocialLink}
        >
          Add Social Link
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

        {socialLinks.map((link, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Social Link {index + 1}
                {link.platform && ` - ${link.platform}`}
              </h4>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<TrashIcon className="w-4 h-4" />}
                onPress={() => removeSocialLink(index)}
              >
                Remove
              </Button>
            </CardHeader>
            <CardBody className="space-y-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Platform"
                  placeholder="Select a platform"
                  selectedKeys={link.platform ? [link.platform] : []}
                  onSelectionChange={keys => {
                    const selectedKey = Array.from(keys)[0] as string;
                    updateSocialLink(index, 'platform', selectedKey);
                  }}
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
                >
                  {socialPlatforms.map(platform => (
                    <SelectItem key={platform.key} value={platform.key}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Display Text"
                  placeholder="How it should appear on your resume"
                  value={link.displayText}
                  onChange={e =>
                    updateSocialLink(index, 'displayText', e.target.value)
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
                  label="URL"
                  placeholder="https://example.com"
                  value={link.url}
                  onChange={e => updateSocialLink(index, 'url', e.target.value)}
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
                  label="Icon (React Icon Name)"
                  placeholder="FaGithub"
                  value={link.icon}
                  onChange={e =>
                    updateSocialLink(index, 'icon', e.target.value)
                  }
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
            </CardBody>
          </Card>
        ))}

        {socialLinks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No social links added yet.</p>
            <p className="text-sm">Click "Add Social Link" to get started.</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default SocialLinksForm;
