'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaResumeData from '../../data/feiscaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaResumeData} />;
};

export default Resume;
