'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import fredinaCustomerAgentResumeData from '@/data/fredina/fredinaCustomerAgentResumeData.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={fredinaCustomerAgentResumeData} />;
};

export default Resume;
