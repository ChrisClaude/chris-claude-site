'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import feiscaCallCenterResumeData from '../../../data/feiscaCallCenterResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={feiscaCallCenterResumeData} />;
};

export default Resume;
