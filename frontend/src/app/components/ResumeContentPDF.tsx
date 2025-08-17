import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import Image from 'next/image';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
  FaStackOverflow,
} from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';
import { SiLeetcode } from 'react-icons/si';
import { IoMdCheckbox } from 'react-icons/io';

// Define the TypeScript interfaces for the resume data
interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string | null;
  linkedin?: string;
  location: string;
  image: string | null;
  imageAlt: string;
}

interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
}

interface Reference {
  fullName: string;
  role: string;
  email: string;
  company: string;
}

interface Education {
  degree: string;
  institution: string;
  institutionUrl?: string;
  startDate: string;
  endDate: string;
  location: string | null;
}

interface Language {
  name: string;
  level: string;
  proficiency: number;
}

interface NotableProject {
  title: string;
  url: string;
  description: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  displayText: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  references: Reference[];
  technologies: string[];
  skills: string[];
  education: Education[];
  languages: Language[];
  notableProjects: NotableProject[];
  socialLinks: SocialLink[];
  sections?: {
    summary?: string;
    workExperience?: string;
    references?: string;
    toolbox?: string;
    technologies?: string;
    professionalSkills?: string;
    education?: string;
    languages?: string;
    notableProjects?: string;
    findMeOnline?: string;
  };
}

interface ResumeContentPDFProps {
  data?: ResumeData;
}

// Icon mapping for social links
const iconMap: { [key: string]: any } = {
  GiEarthAfricaEurope,
  FaLinkedinIn,
  FaGithub,
  SiLeetcode,
  FaStackOverflow,
};

const ResumeContentPDF = ({ data: resumeData }: ResumeContentPDFProps) => {
  if (!resumeData) {
    return <div>No data provided</div>;
  }

  return (
    <div
      id="resume-pdf"
      className="bg-white text-gray-800 p-8 max-w-[210mm] mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
      }}
    >
      {/* Header */}
      <div className="flex justify-between mb-8 border-b-2 border-gray-300 pb-4">
        <div className="flex-1">
          <div className="mb-3">
            <h1
              className="text-2xl font-bold uppercase mb-1"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            >
              {resumeData.personalInfo.name}
            </h1>
            <h2
              className="text-xl font-semibold text-blue-600 mb-2"
              style={{ fontSize: '18px', fontWeight: '600', color: '#2563eb' }}
            >
              {resumeData.personalInfo.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex items-center">
              <FaPhone
                className="mr-2 text-blue-600"
                style={{ fontSize: '14px' }}
              />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <MdOutlineAlternateEmail
                className="mr-2 text-blue-600"
                style={{ fontSize: '14px' }}
              />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            {resumeData.personalInfo.website && (
              <div className="flex items-center">
                <FaLink
                  className="mr-2 text-blue-600"
                  style={{ fontSize: '14px' }}
                />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
            <div className="flex items-center">
              <MdLocationPin
                className="mr-2 text-blue-600"
                style={{ fontSize: '14px' }}
              />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>
        </div>

        {resumeData.personalInfo.image && (
          <div className="ml-4">
            <Image
              width={80}
              height={80}
              src={resumeData.personalInfo.image}
              alt={resumeData.personalInfo.imageAlt}
              className="rounded-full"
              style={{ width: '80px', height: '80px' }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {/* Summary */}
        <div className="mb-4">
          <h2
            className="text-lg font-semibold uppercase mb-2 border-b border-gray-400 pb-1"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              borderBottom: '1px solid #9ca3af',
            }}
          >
            {resumeData.sections?.summary || 'Summary'}
          </h2>
          <p className="text-sm leading-relaxed">{resumeData.summary}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <h2
            className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              borderBottom: '1px solid #9ca3af',
            }}
          >
            {resumeData.sections?.workExperience || 'Professional Experience'}
          </h2>
          {resumeData.workExperience.map((job, index) => (
            <div
              key={index}
              className={`mb-4 ${index < resumeData.workExperience.length - 1 ? 'border-b border-gray-200 pb-4' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3
                  className="text-base font-semibold"
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  {job.title}
                </h3>
                <span
                  className="text-sm text-gray-600"
                  style={{ fontSize: '12px', color: '#4b5563' }}
                >
                  {job.startDate} - {job.endDate}
                </span>
              </div>
              <p
                className="text-blue-600 font-medium mb-1"
                style={{ color: '#2563eb', fontWeight: '500' }}
              >
                {job.company}
              </p>
              <p
                className="text-sm text-gray-600 mb-2 flex items-center"
                style={{ fontSize: '12px', color: '#4b5563' }}
              >
                <MdLocationPin className="mr-1" style={{ fontSize: '12px' }} />
                {job.location}
              </p>
              <p className="text-sm mb-2">{job.description}</p>
              {job.responsibilities.length > 0 && (
                <ul className="list-disc ml-5 text-sm">
                  {job.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="mb-1">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Skills and Technologies */}
        {(resumeData.technologies.length > 0 ||
          resumeData.skills.length > 0) && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid #9ca3af',
              }}
            >
              {resumeData.sections?.toolbox || 'Skills & Technologies'}
            </h2>

            {resumeData.technologies.length > 0 && (
              <div className="mb-3">
                <h3
                  className="text-base font-semibold mb-2 text-blue-600"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2563eb',
                  }}
                >
                  {resumeData.sections?.technologies || 'Technologies'}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="border border-gray-400 px-2 py-1 rounded text-xs"
                      style={{
                        border: '1px solid #9ca3af',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resumeData.skills.length > 0 && (
              <div className="mb-3">
                <h3
                  className="text-base font-semibold mb-2 text-blue-600"
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2563eb',
                  }}
                >
                  {resumeData.sections?.professionalSkills ||
                    'Professional Skills'}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="border border-gray-400 px-2 py-1 rounded text-xs"
                      style={{
                        border: '1px solid #9ca3af',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education */}
        <div className="mb-4">
          <h2
            className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              borderBottom: '1px solid #9ca3af',
            }}
          >
            {resumeData.sections?.education || 'Education'}
          </h2>
          {resumeData.education.map((edu, index) => (
            <div
              key={index}
              className={`mb-3 ${index < resumeData.education.length - 1 ? 'border-b border-gray-200 pb-3' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3
                  className="text-base font-semibold"
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  {edu.degree}
                </h3>
                <span
                  className="text-sm text-gray-600"
                  style={{ fontSize: '12px', color: '#4b5563' }}
                >
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p
                className="text-blue-600 font-medium mb-1"
                style={{ color: '#2563eb', fontWeight: '500' }}
              >
                {edu.institution}
              </p>
              {edu.location && (
                <p
                  className="text-sm text-gray-600 flex items-center"
                  style={{ fontSize: '12px', color: '#4b5563' }}
                >
                  <MdLocationPin
                    className="mr-1"
                    style={{ fontSize: '12px' }}
                  />
                  {edu.location}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Languages */}
        {resumeData.languages.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid #9ca3af',
              }}
            >
              {resumeData.sections?.languages || 'Languages'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {resumeData.languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p
                      className="font-medium text-sm"
                      style={{ fontWeight: '500', fontSize: '12px' }}
                    >
                      {language.name}
                    </p>
                    <p
                      className="text-xs text-gray-600"
                      style={{ fontSize: '11px', color: '#4b5563' }}
                    >
                      {language.level}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="h-4 w-1 rounded-full"
                        style={{
                          height: '16px',
                          width: '4px',
                          borderRadius: '2px',
                          backgroundColor:
                            i < language.proficiency ? '#2563eb' : '#d1d5db',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notable Projects */}
        {resumeData.notableProjects.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid #9ca3af',
              }}
            >
              {resumeData.sections?.notableProjects || 'Notable Projects'}
            </h2>
            {resumeData.notableProjects.map((project, index) => (
              <div key={index} className="mb-3">
                <p
                  className="font-medium text-sm mb-1"
                  style={{ fontWeight: '500', fontSize: '12px' }}
                >
                  {project.title}
                </p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {resumeData.references.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid #9ca3af',
              }}
            >
              {resumeData.sections?.references || 'References'}
            </h2>
            {resumeData.references.map((reference, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm">
                  <span
                    className="font-medium text-blue-600"
                    style={{ fontWeight: '500', color: '#2563eb' }}
                  >
                    {reference.fullName}
                  </span>
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                    {reference.role}
                  </span>
                  <span className="ml-1 text-xs bg-gray-300 px-2 py-1 rounded">
                    {reference.company}
                  </span>
                </p>
                <p className="text-sm">{reference.email}</p>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {resumeData.socialLinks.length > 0 && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold uppercase mb-3 border-b border-gray-400 pb-1"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                borderBottom: '1px solid #9ca3af',
              }}
            >
              {resumeData.sections?.findMeOnline || 'Professional Links'}
            </h2>
            {resumeData.socialLinks.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <div key={index} className="mb-2">
                  <p
                    className="font-medium text-sm mb-1"
                    style={{ fontWeight: '500', fontSize: '12px' }}
                  >
                    {social.platform}: {social.displayText}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeContentPDF;
