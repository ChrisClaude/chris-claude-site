'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect, Suspense } from 'react';
import ResumeContent from '@/components/ResumeContent';

import { useSearchParams } from 'next/navigation';

interface ResumePageWrapperProps {
  resumeData: any;
  personName?: string;
}

const ResumePageContent = ({
  resumeData,
  personName,
}: ResumePageWrapperProps) => {
  const { setUIState } = useContext(UIContext);
  const searchParams = useSearchParams();
  const isDownload = searchParams.get('download') === 'true';

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);



  return <ResumeContent data={resumeData} showDownloadButton={isDownload} />;
};

const ResumePageWrapper = (props: ResumePageWrapperProps) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ResumePageContent {...props} />
    </Suspense>
  );
};

export default ResumePageWrapper;
