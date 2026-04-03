'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaCallCenterResumeData from '@/data/feisca/feiscaCallCenterResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaCallCenterResumeData} />;
};

export default Resume;
