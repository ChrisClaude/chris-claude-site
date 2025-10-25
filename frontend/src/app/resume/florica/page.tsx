'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import floricaResumeData from '@/data/florica/floricaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={floricaResumeData} />;
};

export default Resume;
