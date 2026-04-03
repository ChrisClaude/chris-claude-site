'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaFrontDeskResumeDataFrench from '@/data/feisca/feiscaFrontDeskResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaFrontDeskResumeDataFrench} />;
};

export default Resume;
