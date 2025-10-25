'use client';

import React from 'react';
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  EyeIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

/**
 * Resume Home Page Component
 *
 * This is the main entry point for all resume-related features.
 * Users can navigate to:
 * - Resume Viewer: Browse and view all available resumes
 * - Resume Editor: Create and edit resume content
 */
const ResumePage = () => {
  const router = useRouter();

  const features: {
    title: string;
    description: string;
    icon: any;
    path: string;
    color:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'default';
    features: string[];
  }[] = [
    {
      title: 'Resume Viewer',
      description:
        'Browse and view all available resumes. Search, filter by language or person, and view detailed resume content.',
      icon: EyeIcon,
      path: '/resume/view',
      color: 'primary',
      features: [
        'Search resumes by keyword',
        'Filter by language (English/French)',
        'Filter by person',
        'View detailed resume content',
        'Download and share resumes',
      ],
    },
    {
      title: 'Resume Editor',
      description:
        'Create and edit resume content with a visual editor. Customize sections, update information, and preview changes in real-time.',
      icon: PencilSquareIcon,
      path: '/resume/editor',
      color: 'secondary',
      features: [
        'Visual editing interface',
        'Real-time preview',
        'Section management',
        'Custom formatting',
        'Export to multiple formats',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DocumentTextIcon className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Resume Hub</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the Resume Hub. Choose from the options below to view
            existing resumes or create and edit new ones.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="flex flex-col items-start gap-3 pb-4">
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`p-3 rounded-lg ${
                        feature.color === 'primary'
                          ? 'bg-blue-100'
                          : 'bg-purple-100'
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          feature.color === 'primary'
                            ? 'text-blue-600'
                            : 'text-purple-600'
                        }`}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>

                <Divider />

                <CardBody className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Features:
                      </h3>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      color={feature.color}
                      variant="solid"
                      className="w-full"
                      size="lg"
                      startContent={<RocketLaunchIcon className="w-5 h-5" />}
                      onPress={() => router.push(feature.path)}
                    >
                      Go to {feature.title}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Getting Started
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    For Viewing Resumes:
                  </h4>
                  <p className="text-sm text-gray-600">
                    Head to the Resume Viewer to browse all available resumes.
                    Use the search and filter features to find specific resumes
                    quickly.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    For Creating Resumes:
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use the Resume Editor to create or modify resume content.
                    The editor provides a visual interface with real-time
                    preview capabilities.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResumePage;
