'use client';
import ResumePageWrapper from '@/components/ResumePageWrapper';
import resumeData from '../data/resumeData_20_aug_2025.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={resumeData} />;
};

export default Resume;
