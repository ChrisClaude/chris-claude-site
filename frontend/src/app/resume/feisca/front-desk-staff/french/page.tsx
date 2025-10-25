'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaFrontDeskResumeDataFrench from '@/data/feisca/feiscaFrontDeskResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaFrontDeskResumeDataFrench} />;
};

export default Resume;
