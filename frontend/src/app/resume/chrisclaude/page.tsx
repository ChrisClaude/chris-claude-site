'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import resumeData from '@/data/chris/resumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeData} />;
};

export default Resume;
