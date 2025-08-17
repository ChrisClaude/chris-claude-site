'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import resumeData from '../data/resumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeData} />;
};

export default Resume;
