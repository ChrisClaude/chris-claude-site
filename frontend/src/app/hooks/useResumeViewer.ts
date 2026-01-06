import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeListItem, getResumeById } from '@/utils/resumeLoader';

export type ViewMode = 'list' | 'viewer';

interface UseResumeViewerReturn {
  viewMode: ViewMode;
  selectedResume: ResumeListItem | null;
  isLoading: boolean;
  error: string | null;
  selectResume: (resume: ResumeListItem) => void;
  goBackToList: () => void;
  clearError: () => void;
}

/**
 * Custom hook for managing resume viewer state and navigation
 */
export const useResumeViewer = (): UseResumeViewerReturn => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedResume, setSelectedResume] = useState<ResumeListItem | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Load resume from URL parameter
   */
  const loadResumeFromUrl = useCallback(async (resumeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const resume = getResumeById(resumeId);
      if (resume) {
        setSelectedResume(resume);
        setViewMode('viewer');
      } else {
        setError(`Resume with ID "${resumeId}" not found`);
        setViewMode('list');
      }
    } catch (err) {
      setError('Failed to load resume from URL');
      setViewMode('list');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle URL parameters on component mount
  useEffect(() => {
    const resumeId = searchParams.get('resume');
    if (resumeId) {
      loadResumeFromUrl(resumeId);
    }
  }, [searchParams, loadResumeFromUrl]);

  /**
   * Select a resume and switch to viewer mode
   */
  const selectResume = useCallback((resume: ResumeListItem) => {
    setSelectedResume(resume);
    setViewMode('viewer');
    setError(null);

    // Update URL without page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('resume', resume.id);
    window.history.pushState({}, '', newUrl.toString());
  }, []);

  /**
   * Go back to list view
   */
  const goBackToList = useCallback(() => {
    setViewMode('list');
    setSelectedResume(null);
    setError(null);

    // Update URL to remove resume parameter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('resume');
    window.history.pushState({}, '', newUrl.toString());
  }, []);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    viewMode,
    selectedResume,
    isLoading,
    error,
    selectResume,
    goBackToList,
    clearError,
  };
};
