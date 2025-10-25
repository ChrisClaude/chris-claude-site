'use client';

import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider, Chip } from '@heroui/react';
import { ArrowLeftIcon, ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import ResumeContent from '@/components/ResumeContent';
import { ResumeListItem } from '@/utils/resumeLoader';

interface ResumeViewerProps {
  resume: ResumeListItem;
  onBack: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({
  resume,
  onBack,
  onDownload,
  onShare
}) => {
  const getLanguageFlag = (language: 'en' | 'fr') => {
    return language === 'en' ? '🇺🇸' : '🇫🇷';
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Default download behavior - redirect to download URL
      const downloadUrl = `/resume?download=true&resume=${resume.id}`;
      window.open(downloadUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Default share behavior - copy URL to clipboard
      const shareUrl = `${window.location.origin}/resume/view?resume=${resume.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Resume URL copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy URL to clipboard');
      });
    }
  };

  return (
    <div className="w-full">
      {/* Resume Header */}
      <Card className="mb-6">
        <CardHeader className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="bordered"
              onPress={onBack}
              className="flex-shrink-0 border-gray-300 hover:bg-gray-100"
              aria-label="Back to resume list"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </Button>

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">
                {resume.personName}
              </h1>
              <p className="text-lg text-blue-600 font-medium">
                {resume.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Chip
                  size="sm"
                  variant="flat"
                  color={resume.language === 'en' ? 'primary' : 'secondary'}
                >
                  {getLanguageFlag(resume.language)} {resume.language.toUpperCase()}
                </Chip>
                <span className="text-sm text-gray-500">
                  {resume.fileName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<ShareIcon className="w-4 h-4" />}
              onPress={handleShare}
              size="sm"
            >
              Share
            </Button>
            <Button
              color="primary"
              startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
              onPress={handleDownload}
              size="sm"
            >
              Download PDF
            </Button>
          </div>
        </CardHeader>

        {resume.description && (
          <>
            <Divider />
            <CardBody className="pt-4">
              <p className="text-gray-700">{resume.description}</p>
            </CardBody>
          </>
        )}
      </Card>

      {/* Resume Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <ResumeContent data={resume.data} showDownloadButton={false} />
      </div>
    </div>
  );
};

export default ResumeViewer;
