'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaFrontDeskResumeDataFrench from '../../../../data/feiscaFrontDeskResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaFrontDeskResumeDataFrench} />;
};

export default Resume;
