'use client';

import React, { Suspense } from 'react';
import { Card, CardBody, Spinner } from '@heroui/react';
import { useResumeViewer } from '@/hooks/useResumeViewer';
import ResumeList from '@/components/ResumeList/ResumeList';
import ResumeViewer from '@/components/ResumeViewer/ResumeViewer';

/**
 * Main Resume View Page Component
 *
 * This component orchestrates the resume viewing experience by:
 * - Managing view state (list vs viewer mode)
 * - Handling URL parameters for direct resume access
 * - Providing error handling and loading states
 * - Coordinating between ResumeList and ResumeViewer components
 */
const ResumeViewPageContent = () => {
  const {
    viewMode,
    selectedResume,
    isLoading,
    error,
    selectResume,
    goBackToList,
    clearError,
  } = useResumeViewer();

  // Handle download functionality
  const handleDownload = () => {
    if (selectedResume) {
      // Redirect to download URL with the specific resume
      const downloadUrl = `/resume?download=true&resume=${selectedResume.id}`;
      window.open(downloadUrl, '_blank');
    }
  };

  // Handle share functionality
  const handleShare = () => {
    if (selectedResume) {
      const shareUrl = `${window.location.origin}/resume/view?resume=${selectedResume.id}`;
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          alert('Resume URL copied to clipboard!');
        })
        .catch(() => {
          alert('Failed to copy URL to clipboard');
        });
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardBody className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Resume
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={clearError}
                className="text-sm text-red-600 underline hover:no-underline"
              >
                Dismiss
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" label="Loading resume..." />
        </div>
      </div>
    );
  }

  // Render based on current view mode
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {viewMode === 'list' ? (
        <ResumeList
          onResumeSelect={selectResume}
          selectedResumeId={selectedResume?.id}
        />
      ) : selectedResume ? (
        <div className="p-4 pb-24">
          <ResumeViewer
            resume={selectedResume}
            onBack={goBackToList}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardBody className="text-center py-8">
              <p className="text-gray-600">No resume selected</p>
              <button
                onClick={goBackToList}
                className="mt-4 text-blue-600 hover:underline"
              >
                Back to Resume List
              </button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

/**
 * Resume View Page with Suspense wrapper
 *
 * Wraps the main content in Suspense to handle Next.js navigation
 * and provides a loading fallback during route transitions.
 */
const ResumeViewPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Spinner size="lg" label="Loading..." />
          </div>
        </div>
      }
    >
      <ResumeViewPageContent />
    </Suspense>
  );
};

export default ResumeViewPage;
