import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import Image from 'next/image';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
  FaStackOverflow,
  FaDownload,
} from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';
import { SiLeetcode } from 'react-icons/si';
import { IoMdCheckbox } from 'react-icons/io';
import { downloadResumePDF } from '@/utils/pdfGenerator';
import { useState } from 'react';

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

interface ResumeContentProps {
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

const ResumeContent = ({ data: resumeData }: ResumeContentProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!resumeData) {
    return <div>No data provided</div>;
  }

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePDF(resumeData, resumeData.personalInfo.name);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 py-24 px-52 overflow-x-auto xl:flex xl:justify-center">
      <div className="flex flex-col justify-center" style={{ width: '1200px' }}>
        {/* Download Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <FaDownload className="text-sm" />
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        <div>
          {/* Header */}
          <div className="flex justify-between mb-10">
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold uppercase">
                  {resumeData.personalInfo.name}
                </h1>
                <h2 className="text-2xl font-semibold text-blue-500">
                  {resumeData.personalInfo.title}
                </h2>
              </div>
              <div className="grid grid-cols-2">
                <a
                  href={`tel:${resumeData.personalInfo.phone}`}
                  className="flex items-center"
                >
                  <FaPhone className="mr-1 text-blue-500" />
                  {resumeData.personalInfo.phone}
                </a>
                <a
                  href={`mailto:${resumeData.personalInfo.email}`}
                  className="flex items-center"
                >
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{' '}
                  {resumeData.personalInfo.email}
                </a>
                <a
                  href={`https://${resumeData.personalInfo.website}`}
                  target="_blank"
                  className="flex items-center"
                >
                  <FaLink className="mr-1 text-blue-500" />
                  <span>{resumeData.personalInfo.website}</span>
                </a>
                <p className="flex items-center">
                  <MdLocationPin className="mr-1 text-blue-500" />
                  {resumeData.personalInfo.location}
                </p>
              </div>
            </div>

            {resumeData.personalInfo.image && (
              <div className="rounded-full w-48 h-48">
                <Image
                  width={300}
                  height={300}
                  src={resumeData.personalInfo.image}
                  alt={resumeData.personalInfo.imageAlt}
                  className="rounded-full w-48 h-48"
                />
              </div>
            )}
          </div>

          {/* Main */}
          <div className="grid grid-cols-2 gap-x-28">
            {/* First Main Column */}
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.summary || 'Summary'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <p>{resumeData.summary}</p>
              </div>

              {/* Work Experience  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.workExperience ||
                      'Corporate Experience'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                {resumeData.workExperience.map((job, index) => (
                  <div
                    key={index}
                    className={`${
                      index < resumeData.workExperience.length - 1
                        ? 'mb-4 border-b-2 border-dashed border-gray-400 pb-4'
                        : ''
                    }`}
                  >
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-blue-500">{job.company}</p>
                    <p className="flex items-center">
                      <span>{job.startDate}</span>
                      <span className="mx-1"> - </span>{' '}
                      <span>{job.endDate}</span>{' '}
                      <MdLocationPin className="ml-3 mr-1" /> {job.location}
                    </p>
                    <div className="mt-1">
                      <p>{job.description}</p>
                      {job.responsibilities.length > 0 && (
                        <ul className="list-disc ml-10 mt-1">
                          {job.responsibilities.map(
                            (responsibility, respIndex) => (
                              <li key={respIndex}>{responsibility}</li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* References  */}
              <div>
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.references || 'References'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-y-3">
                  {resumeData.references.map((reference, index) => (
                    <div key={index}>
                      <p>
                        <span className="text-blue-500 font-medium">
                          {reference.fullName}
                        </span>
                        <span className="ml-2 bg-slate-800 text-white p-1 rounded-md text-xs relative -top-1">
                          {reference.role}
                        </span>
                        <span className="ml-1 bg-gray-500 text-white p-1 rounded-md text-xs relative -top-1">
                          {reference.company}
                        </span>
                      </p>
                      <p>{reference.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Main Column */}
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.toolbox || 'Toolbox'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>

                {/* Technologies  */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold uppercase mb-2 text-blue-500">
                    {resumeData.sections?.technologies || 'Technologies'}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Power Skills  */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold uppercase mb-2 text-blue-500">
                    {resumeData.sections?.professionalSkills ||
                      'Professional Skills'}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.education || 'Education'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul>
                  {resumeData.education.map((edu, index) => (
                    <li
                      key={index}
                      className={`${
                        index < resumeData.education.length - 1
                          ? 'border-b-2 border-dashed border-gray-400 pb-4'
                          : ''
                      } ${index > 0 ? 'mt-2' : ''}`}
                    >
                      <p className="text-lg">{edu.degree}</p>
                      <p className="text-blue-500">
                        {edu.institutionUrl ? (
                          <a href={edu.institutionUrl} target="_blank">
                            {edu.institution}
                          </a>
                        ) : (
                          edu.institution
                        )}
                      </p>
                      <p className="flex items-center mr-1">
                        <span>{edu.startDate}</span>{' '}
                        <span className="mx-1">-</span>{' '}
                        <span className="mr-3">{edu.endDate}</span>{' '}
                        {edu.location && (
                          <>
                            <MdLocationPin className="mr-1" /> {edu.location}
                          </>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.languages || 'Languages'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-2">
                  {resumeData.languages.map((language, index) => (
                    <li key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{language.name}</p>
                        <p className="text-sm">{language.level}</p>
                      </div>
                      <div className="flex gap-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`h-8 w-2 rounded-full ${
                              i < language.proficiency
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notable Projects */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.notableProjects || 'Notable Projects'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-5">
                  {resumeData.notableProjects.map((project, index) => (
                    <li key={index}>
                      <p className="flex items-center gap-x-1 font-medium">
                        <IoMdCheckbox className="text-green-400 text-xl" />
                        <a
                          href={project.url}
                          target="_blank"
                          className="ml-6 underline underline-offset-4 flex items-center gap-x-1"
                        >
                          <span>{project.title}</span>
                          <FaExternalLinkAlt size={11} />
                        </a>
                      </p>
                      <p>{project.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Find me online  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    {resumeData.sections?.findMeOnline || 'Find me online'}
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-5">
                  {resumeData.socialLinks.map((social, index) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <li
                        key={index}
                        className="border-b border-dashed border-gray-600 pb-2"
                      >
                        <p className="flex items-center gap-x-1 font-medium">
                          <IconComponent className="text-xl text-blue-500" />
                          {social.platform}
                        </p>
                        <a
                          href={social.url}
                          target="_blank"
                          className="ml-6 underline underline-offset-4 flex items-center gap-x-1"
                        >
                          <span>{social.displayText}</span>
                          <FaExternalLinkAlt size={11} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeContent;
