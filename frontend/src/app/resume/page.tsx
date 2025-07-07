'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect } from 'react';
import ResumeContent from '@/components/ResumeContent';

const Resume = () => {
  const { setUIState } = useContext(UIContext);

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);

  return (
    <ResumeContent />
  );
};

export default Resume;
