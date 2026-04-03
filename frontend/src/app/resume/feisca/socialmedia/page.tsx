'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaSocialMediaResumeData from '@/data/feisca/feiscaSocialMediaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaSocialMediaResumeData} />;
};

export default Resume;
