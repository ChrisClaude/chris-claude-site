'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect } from 'react';
import ResumeContent from '@/components/ResumeContent';
import resumeDataFrench from '../../data/resumeDataFrench.json';

const Resume = () => {
  const { setUIState } = useContext(UIContext);

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);

  return (
    <ResumeContent data={resumeDataFrench} />
  );
};

export default Resume;
