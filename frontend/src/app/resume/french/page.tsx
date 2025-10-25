'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import resumeDataFrench from '../../data/chris/resumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeDataFrench} />;
};

export default Resume;
