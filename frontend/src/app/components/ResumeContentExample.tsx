import ResumeContent from './ResumeContent';
import resumeData from '../data/resumeData.json';

// Example of how to use the reusable ResumeContent component
const ResumeContentExample = () => {
  return (
    <div>
      {/* Using the component with JSON data */}
      <ResumeContent data={resumeData} />
      
      {/* Or using it without data (will use default data) */}
      {/* <ResumeContent /> */}
    </div>
  );
};

export default ResumeContentExample;
