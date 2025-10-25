'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
  Chip,
  Avatar,
  Divider,
  Spinner,
} from '@heroui/react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  DocumentIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  ResumeListItem,
  getAllResumes,
  searchResumes,
  getResumesByLanguage,
  getResumesGroupedByFolder,
} from '@/utils/resumeLoader';

interface ResumeListProps {
  onResumeSelect: (resume: ResumeListItem) => void;
  selectedResumeId?: string;
}

const ResumeList: React.FC<ResumeListProps> = ({
  onResumeSelect,
  selectedResumeId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [personFilter, setPersonFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<
    Record<string, boolean>
  >({});

  // Get all resumes
  const allResumes = useMemo(() => getAllResumes(), []);

  // Get unique persons for filter
  const uniquePersons = useMemo(() => {
    const persons = [...new Set(allResumes.map(resume => resume.personName))];
    return persons.sort();
  }, [allResumes]);

  // Filter resumes based on search and filters
  const filteredResumes = useMemo(() => {
    let filtered = allResumes;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchResumes(searchQuery.trim());
    }

    // Apply language filter
    if (languageFilter !== 'all') {
      filtered = filtered.filter(resume => resume.language === languageFilter);
    }

    // Apply person filter
    if (personFilter !== 'all') {
      filtered = filtered.filter(resume => resume.personName === personFilter);
    }

    return filtered;
  }, [allResumes, searchQuery, languageFilter, personFilter]);

  // Group resumes by folder
  const groupedResumes = useMemo(() => {
    const grouped: Record<string, ResumeListItem[]> = {
      chris: [],
      feisca: [],
      florica: [],
    };

    filteredResumes.forEach(resume => {
      if (grouped[resume.folder]) {
        grouped[resume.folder].push(resume);
      }
    });

    return grouped;
  }, [filteredResumes]);

  const handleResumeClick = async (resume: ResumeListItem) => {
    setIsLoading(true);
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      onResumeSelect(resume);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLanguageFilter('all');
    setPersonFilter('all');
  };

  const getPersonInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getLanguageFlag = (language: 'en' | 'fr') => {
    return language === 'en' ? '🇺🇸' : '🇫🇷';
  };

  const toggleFolder = (folder: string) => {
    setCollapsedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 pb-32">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Resume Gallery
        </h1>
        <p className="text-gray-600">
          Browse and view all available resumes. Click on any resume to view it
          in detail.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardBody className="gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <Input
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 text-black"
              size="lg"
            />

            {/* Language Filter */}
            <Select
              placeholder="Language"
              selectedKeys={languageFilter ? [languageFilter] : []}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as string;
                setLanguageFilter(selected || 'all');
              }}
              className="w-full sm:w-48"
              size="lg"
            >
              <SelectItem key="all" textValue="All Languages">
                All Languages
              </SelectItem>
              <SelectItem key="en" textValue="🇺🇸 English">
                🇺🇸 English
              </SelectItem>
              <SelectItem key="fr" textValue="🇫🇷 French">
                🇫🇷 French
              </SelectItem>
            </Select>

            {/* Person Filter */}
            <Select
              placeholder="Person"
              selectedKeys={personFilter ? [personFilter] : []}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as string;
                setPersonFilter(selected || 'all');
              }}
              className="w-full sm:w-48"
              size="lg"
            >
              <SelectItem key="all" textValue="All People">
                All People
              </SelectItem>
              <>
                {uniquePersons.map(person => (
                  <SelectItem key={person} textValue={person}>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" name={getPersonInitials(person)} />
                      {person}
                    </div>
                  </SelectItem>
                ))}
              </>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery ||
            languageFilter !== 'all' ||
            personFilter !== 'all') && (
            <div className="flex justify-end">
              <Button
                variant="light"
                size="sm"
                onPress={clearFilters}
                startContent={<FunnelIcon className="w-4 h-4" />}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredResumes.length}{' '}
          {filteredResumes.length === 1 ? 'resume' : 'resumes'}
          {filteredResumes.length !== allResumes.length &&
            ` (filtered from ${allResumes.length} total)`}
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Spinner size="lg" label="Loading resume..." />
        </div>
      )}

      {/* Resume Grid - Grouped by Folder */}
      <div className="space-y-8">
        {Object.entries(groupedResumes).map(([folder, resumes]) => {
          if (resumes.length === 0) return null;

          // Get folder display name
          const folderDisplayName =
            folder.charAt(0).toUpperCase() + folder.slice(1);

          const isCollapsed = collapsedFolders[folder];

          return (
            <div key={folder} className="space-y-4">
              {/* Folder Header */}
              <button
                onClick={() => toggleFolder(folder)}
                className="flex items-center gap-3 w-full hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                )}
                <h2 className="text-xl font-bold text-gray-800">
                  {folderDisplayName}
                </h2>
                <Chip size="sm" variant="flat" color="default">
                  {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'}
                </Chip>
              </button>

              {/* Resume Grid for this folder */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumes.map(resume => (
                    <Card
                      key={resume.id}
                      isPressable
                      isHoverable
                      className={`transition-all duration-200 ${
                        selectedResumeId === resume.id
                          ? 'ring-2 ring-blue-500 shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                      onPress={() => handleResumeClick(resume)}
                    >
                      <CardHeader className="flex gap-3">
                        <Avatar
                          name={getPersonInitials(resume.personName)}
                          className="flex-shrink-0"
                          size="md"
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="text-lg font-semibold truncate">
                            {resume.personName}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {resume.title}
                          </p>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            resume.language === 'en' ? 'primary' : 'secondary'
                          }
                        >
                          {getLanguageFlag(resume.language)}
                        </Chip>
                      </CardHeader>

                      <Divider />

                      <CardBody className="pt-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DocumentIcon className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{resume.fileName}</span>
                          </div>

                          {resume.description && (
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {resume.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <Chip
                              size="sm"
                              variant="dot"
                              color={
                                resume.language === 'en'
                                  ? 'primary'
                                  : 'secondary'
                              }
                            >
                              {resume.language.toUpperCase()}
                            </Chip>

                            <span className="text-xs text-blue-600 font-medium">
                              Click to view
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredResumes.length === 0 && !isLoading && (
        <Card className="mt-8">
          <CardBody className="text-center py-12">
            <DocumentIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No resumes found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button variant="light" onPress={clearFilters}>
              Clear all filters
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ResumeList;
