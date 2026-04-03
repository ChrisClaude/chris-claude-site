'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaCallCenterResumeDataFrench from '@/data/feisca/feiscaCallCenterResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaCallCenterResumeDataFrench} />;
};

export default Resume;
