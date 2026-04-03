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
import { SocialLink } from '../../types/resume';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Input } from './FormFields';

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
          variant="secondary"
          onPress={addSocialLink}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Social Link
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

        {socialLinks.map((link, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-white">
              <h4 className="text-lg font-medium text-gray-900">
                Social Link {index + 1}
                {link.platform && ` - ${link.platform}`}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => removeSocialLink(index)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Platform</label>
                  <Select
                    selectedKey={link.platform || null}
                    onSelectionChange={key => {
                      updateSocialLink(index, 'platform', key ? String(key) : '');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover>
                      <ListBox>
                        {socialPlatforms.map(platform => (
                          <ListBoxItem key={platform.key} id={platform.key}>{platform.label}</ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                </div>

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
            </CardContent>
          </Card>
        ))}

        {socialLinks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No social links added yet.</p>
            <p className="text-sm">
              Click &quot;Add Social Link&quot; to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialLinksForm;
