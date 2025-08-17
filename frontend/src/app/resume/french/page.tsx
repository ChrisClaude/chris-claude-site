'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect } from 'react';
import ResumeContent from '@/components/ResumeContent';
import ResumeContentPDF from '@/components/ResumeContentPDF';
import resumeDataFrench from '../../data/resumeDataFrench.json';
import { downloadResumePDF } from '@/utils/pdfGenerator';
import { useSearchParams } from 'next/navigation';

const Resume = () => {
  const { setUIState } = useContext(UIContext);
  const searchParams = useSearchParams();
  const isDownload = searchParams.get('download') === 'true';

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);

  useEffect(() => {
    if (isDownload) {
      const handleDownload = async () => {
        try {
          await downloadResumePDF(resumeDataFrench, resumeDataFrench.personalInfo.name);
          // Redirect back to the normal resume page after download
          window.history.replaceState({}, '', window.location.pathname);
        } catch (error) {
          console.error('Failed to download PDF:', error);
          alert('Failed to download PDF. Please try again.');
        }
      };
      
      handleDownload();
    }
  }, [isDownload]);

  // If downloading, show a loading message
  if (isDownload) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <ResumeContent data={resumeDataFrench} />
  );
};

export default Resume;
