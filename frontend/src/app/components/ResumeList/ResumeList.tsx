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
} from '@heroicons/react/24/outline';
import {
  ResumeListItem,
  getAllResumes,
  searchResumes,
  getResumesByLanguage,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredResumes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResumes = filteredResumes.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, languageFilter, personFilter]);

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
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              startContent={
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
              }
              className="flex-1"
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
          Showing {startIndex + 1}-{Math.min(endIndex, filteredResumes.length)} of {filteredResumes.length} resumes
          {filteredResumes.length !== allResumes.length && ` (filtered from ${allResumes.length} total)`}
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Spinner size="lg" label="Loading resume..." />
        </div>
      )}

      {/* Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedResumes.map(resume => (
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
                <p className="text-sm text-gray-600 truncate">{resume.title}</p>
              </div>
              <Chip
                size="sm"
                variant="flat"
                color={resume.language === 'en' ? 'primary' : 'secondary'}
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
                    color={resume.language === 'en' ? 'primary' : 'secondary'}
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

      {/* Pagination Controls */}
      {totalPages > 1 && filteredResumes.length > 0 && (
        <div className="mt-8 mb-8 flex justify-center items-center gap-2">
          <Button
            size="sm"
            variant="flat"
            isDisabled={currentPage === 1}
            onPress={() => goToPage(currentPage - 1)}
            aria-label="Go to previous page"
          >
            Previous
          </Button>

          <div className="flex gap-1" role="group" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              const showEllipsis =
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2);

              if (showEllipsis) {
                return (
                  <span key={page} className="px-2 text-gray-400" aria-hidden="true">
                    ...
                  </span>
                );
              }

              if (!showPage) {
                return null;
              }

              return (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? 'solid' : 'flat'}
                  color={currentPage === page ? 'primary' : 'default'}
                  onPress={() => goToPage(page)}
                  className="min-w-[40px]"
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            size="sm"
            variant="flat"
            isDisabled={currentPage === totalPages}
            onPress={() => goToPage(currentPage + 1)}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeList;
