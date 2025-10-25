'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaResumeDataFrench from '@/data/feisca/feiscaResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaResumeDataFrench} />;
};

export default Resume;
