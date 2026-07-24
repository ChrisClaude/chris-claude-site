'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import resumeData from '@/data/faith/faithresumeFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeData} />;
};

export default Resume;
