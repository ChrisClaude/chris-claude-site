'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaSocialMediaResumeData from '../../../data/feiscaSocialMediaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaSocialMediaResumeData} />;
};

export default Resume;
