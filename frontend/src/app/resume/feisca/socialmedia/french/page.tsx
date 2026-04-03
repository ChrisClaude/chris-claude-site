'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaSocialMediaResumeDataFrench from '@/data/feisca/feiscaSocialMediaResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaSocialMediaResumeDataFrench} />;
};

export default Resume;
