'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaSocialMediaResumeDataFrench from '../../../../data/feiscaSocialMediaResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaSocialMediaResumeDataFrench} />;
};

export default Resume;
