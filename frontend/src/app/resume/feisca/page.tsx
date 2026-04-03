'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import feiscaResumeData from '@/data/feisca/feiscaResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaResumeData} />;
};

export default Resume;
