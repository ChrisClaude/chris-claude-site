'use client';
import UIContext from '@/hooks/UIContext';
import { useContext, useEffect } from 'react';
import ResumeContent from '@/components/ResumeContent';
import floricaResumeData from '../../data/floricaResumeData.json';

const Resume = () => {
  const { setUIState } = useContext(UIContext);

  useEffect(() => {
    setUIState?.(state => ({ ...state, isResumePage: true }));
  }, [setUIState]);

  return (
    <ResumeContent data={floricaResumeData} />
  );
};

export default Resume;
