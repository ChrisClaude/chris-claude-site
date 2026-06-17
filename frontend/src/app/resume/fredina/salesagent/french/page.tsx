'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import fredinaSalesAgentResumeDataFrench from '@/data/fredina/fredinaSalesAgentResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={fredinaSalesAgentResumeDataFrench} />;
};

export default Resume;
