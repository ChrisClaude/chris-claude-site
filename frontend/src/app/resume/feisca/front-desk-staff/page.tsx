'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaFrontDeskResumeData from '../../../data/feisca/feiscaFrontDeskResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaFrontDeskResumeData} />;
};

export default Resume;
