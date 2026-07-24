'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import resumeData from '@/data/faith/faithresume.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeData} />;
};

export default Resume;
