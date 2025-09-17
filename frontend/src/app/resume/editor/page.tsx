'use client';
import React from 'react';
import ResumeEditor from '../../components/ResumeEditor/ResumeEditor';
import resumeData from '../../data/resumeData_20_aug_2025.json';

const ResumeEditorPage = () => {
  return <ResumeEditor initialData={resumeData} />;
};

export default ResumeEditorPage;
