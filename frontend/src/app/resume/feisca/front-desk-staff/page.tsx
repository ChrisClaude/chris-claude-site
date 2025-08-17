'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaFrontDeskResumeData from '../../../data/feiscaFrontDeskResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaFrontDeskResumeData} />;
};

export default Resume;
