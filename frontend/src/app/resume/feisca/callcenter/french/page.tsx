'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaCallCenterResumeDataFrench from '@/data/feisca/feiscaCallCenterResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaCallCenterResumeDataFrench} />;
};

export default Resume;
