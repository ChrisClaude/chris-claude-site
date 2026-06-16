'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import fredinaSalesAgentResumeData from '@/data/fredina/fredinaSalesAgentResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={fredinaSalesAgentResumeData} />;
};

export default Resume;
