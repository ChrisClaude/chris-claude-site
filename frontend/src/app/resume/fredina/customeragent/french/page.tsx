'use client';
import ResumePageWrapper from '@/_components/ResumePageWrapper';
import fredinaCustomerAgentResumeDataFrench from '@/data/fredina/fredinaCustomerAgentResumeDataFrench.json';

const Resume = () => {
  return <ResumePageWrapper resumeData={fredinaCustomerAgentResumeDataFrench} />;
};

export default Resume;
