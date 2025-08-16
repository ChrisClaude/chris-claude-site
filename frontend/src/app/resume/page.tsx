'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect } from 'react';
import ResumeContent from '@/components/ResumeContent';
import resumeData from '../data/resumeData.json';

const Resume = () => {
  const { setUIState } = useContext(UIContext);

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);

  return (
    <ResumeContent data={resumeData} />
  );
};

export default Resume;
