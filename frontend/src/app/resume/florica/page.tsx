'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import floricaResumeData from '../../data/floricaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={floricaResumeData} />;
};

export default Resume;
