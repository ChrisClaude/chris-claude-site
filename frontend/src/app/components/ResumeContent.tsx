import { EMAIL_ADDRESS, PHONE_NUMBER } from "@/config";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdLocationPin, MdOutlineAlternateEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { IoMdCheckbox } from "react-icons/io";

// Define the TypeScript interfaces for the resume data
interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  image: string;
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
  institutionUrl: string;
  startDate: string;
  endDate: string;
  location: string;
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
};

const ResumeContent = ({ data }: ResumeContentProps) => {
  // Use default data if none provided (for backward compatibility)
  const resumeData = data || {
    personalInfo: {
      name: "Claude De-Tchambila",
      title: "Senior Software Engineer",
      phone: PHONE_NUMBER,
      email: EMAIL_ADDRESS,
      website: "chrisclaude.com",
      location: "Poznan, Poland",
      image: "/about_me.png",
      imageAlt: "Chris Claude",
    },
    summary:
      "I am a senior software engineer specializing in designing distributed systems and implementing enterprise-grade software solutions. With extensive experience building scalable full-stack web applications, cloud infrastructure, and mobile solutions, I've developed strong problem-solving skills and a passion for continuous learning. My technical expertise spans multiple domains including financial services, insurance, and document processing with a focus on delivering high-quality, secure, and reliable software that positively impacts users' lives.",
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Firma Dla Kazdego",
        startDate: "01/2025",
        endDate: "Present",
        location: "Poznan, Poland",
        description:
          "Leading software development initiatives as a senior engineer, focusing on enterprise-scale applications and cloud architecture. Key responsibilities:",
        responsibilities: [
          "Architecting and developing full-stack web applications using C#/.NET, React/Angular 13+, and cloud services (Azure PaaS, AWS)",
          "Implementing CI/CD pipelines and infrastructure-as-code for reliable, scalable deployments",
          "Establishing comprehensive testing strategies including unit, integration, and E2E testing frameworks",
          "Implementing security best practices and compliance measures for sensitive data handling",
        ],
      },
      {
        title: "Software Engineer",
        company: "Capgemini",
        startDate: "07/2022",
        endDate: "12/2024",
        location: "Poznan, Poland",
        description:
          "I have been working on architecting and implementing software solutions for clients in the financial services sector. The list of clients I have worked with includes (but is not limited to) Nationale Nederlanden, one of the biggest insurance providers in the Netherlands. I have designed and implemented features that have improved the business processes of my clients. The technologies I have used so far include C#, SQL Server, Microsoft Azure, Azure PaaS, React JS, Angular 13+, TypeScript and AzureDevOps. The following are a few of the features I have worked on:",
        responsibilities: [
          "Slowly changing dimension type 2 for a data warehouse system",
          "Cross environment and secure data import and export",
          "Data row level security integrated with Azure RBAC",
        ],
      },
      {
        title: "Software Engineer",
        company: "Dariel",
        startDate: "02/2021",
        endDate: "06/2022",
        location: "Johannesburg, South Africa",
        description:
          "I have worked with a number of clients on multiple projects in the financial service sector. My clients included Sasfin Bank and Safrican Insurance, which is now part of Sanlam, the largest insurance provider in South Africa. The following are a few of the projects I have contributed to:",
        responsibilities: [
          "A Forex exchange trading platform. The technologies used were C#, TypeScript, ASP.NET Core, Angular 13+, AzureDevOps, RabbitMQ and Azure PaaS",
          "Insurance sales system. The technologies used were C#, TypeScript, ASP.NET Core, Angular, React, AzureDevOps",
          "A weighbridge management software system in the logistic industry. The technologies used were C#, TypeScript, ASP.NET Core, Angular, Jira, Jenkins, RabbitMQ",
        ],
      },
      {
        title: "Software Engineer",
        company: "Exigent Group",
        startDate: "11/2020",
        endDate: "02/2021",
        location: "Cape Town, South Africa",
        description:
          "I mainly worked on a project that was aimed at creating a software system that would help process large amounts of documents (company contracts, bills, legal agreements) using machine learning and providing critical insights to clients. I worked on backend and frontend features and integration with ML tools. The technologies used were Python, Django, Keras, PyTorch, and React JS.",
        responsibilities: [],
      },
    ],
    references: [
      {
        fullName: "Prajwal Chengappa",
        role: "Senior Software Engineer",
        email: "prajwal.chengappa@capgemini.com",
        company: "Capgemini",
      },
      {
        fullName: "Banish Jha",
        role: "Senior Software Engineer",
        email: "banish.jha@nn-group.com",
        company: "Nationale Nederlanden",
      },
      {
        fullName: "Rens Van Driel",
        role: "Software Developer",
        email: "rens.van.a.driel@sogeti.com",
        company: "Sogeti",
      },
    ],
    technologies: [
      "C#",
      "C++",
      "JavaScript",
      "Next JS",
      "React JS",
      "Angular",
      "Python",
      "TensorFlow",
      "Java",
      "Docker",
      "Kubernetes",
      "Apache Kafka",
      "Microsoft Azure",
      "AWS",
    ],
    skills: [
      "Problem solving",
      "Assertiveness",
      "Creativity",
      "Critical thinking",
      "Teamwork",
      "Team management",
      "Presentation / Public speaking",
      "Risk management",
    ],
    education: [
      {
        degree: "Diploma in Application Development",
        institution: "Cape Peninsula University of Technology",
        institutionUrl: "https://www.cput.ac.za/",
        startDate: "01/2018",
        endDate: "12/2020",
        location: "Cape Town, South Africa",
      },
      {
        degree: "Chemical Engineering",
        institution: "Central Technical College",
        institutionUrl: "https://www.ctc.edu.za/cape-town-campus/",
        startDate: "2017",
        endDate: "2017",
        location: "Cape Town, South Africa",
      },
    ],
    languages: [
      {
        name: "English",
        level: "Advanced",
        proficiency: 5,
      },
      {
        name: "French",
        level: "Advanced",
        proficiency: 5,
      },
    ],
    notableProjects: [
      {
        title: "Keepmeposted.com.mt",
        url: "https://keepmeposted.com.mt/",
        description:
          "Led full-stack development for this enterprise communication platform. Designed and implemented RESTful APIs, responsive UI components, and established CI/CD pipelines on Azure DevOps. Technologies: .NET Core, Next.js, Azure, SQL Server, and Redis for caching.",
      },
      {
        title: "Personal Portfolio",
        url: "https://github.com/ChrisClaude",
        description:
          "Designed and developed my personal website using Next.js, featuring a responsive design, blog functionality with Markdown support, and custom animations. Implemented SEO best practices and performance optimizations.",
      },
    ],
    socialLinks: [
      {
        platform: "Site",
        icon: "GiEarthAfricaEurope",
        url: "https://chrisclaude.com",
        displayText: "chrisclaude.com",
      },
      {
        platform: "LinkedIn",
        icon: "FaLinkedinIn",
        url: "https://www.linkedin.com/in/claude-de-tchambila-a720ba143/",
        displayText: "Claude De-Tchambila",
      },
      {
        platform: "GitHub",
        icon: "FaGithub",
        url: "https://github.com/ChrisClaude",
        displayText: "Chris Claude",
      },
      {
        platform: "LeetCode",
        icon: "SiLeetcode",
        url: "https://leetcode.com/u/ChChris",
        displayText: "ChChris",
      },
    ],
  };

  return (
    <div className="bg-white text-gray-800 py-24 px-52 overflow-x-auto xl:flex xl:justify-center">
      <div className="flex flex-col justify-center" style={{ width: "1200px" }}>
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
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{" "}
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

            <div className="rounded-full w-48 h-48">
              <Image
                width={300}
                height={300}
                src={resumeData.personalInfo.image}
                alt={resumeData.personalInfo.imageAlt}
                className="rounded-full w-48 h-48"
              />
            </div>
          </div>

          {/* Main */}
          <div className="grid grid-cols-2 gap-x-28">
            {/* First Main Column */}
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Summary</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <p>{resumeData.summary}</p>
              </div>

              {/* Work Experience  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Corporate Experience
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                {resumeData.workExperience.map((job, index) => (
                  <div
                    key={index}
                    className={`${
                      index < resumeData.workExperience.length - 1
                        ? "mb-4 border-b-2 border-dashed border-gray-400 pb-4"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-blue-500">{job.company}</p>
                    <p className="flex items-center">
                      <span>{job.startDate}</span>
                      <span className="mx-1"> - </span>{" "}
                      <span>{job.endDate}</span>{" "}
                      <MdLocationPin className="ml-3 mr-1" /> {job.location}
                    </p>
                    <div className="mt-1">
                      <p>{job.description}</p>
                      {job.responsibilities.length > 0 && (
                        <ul className="list-disc ml-10 mt-1">
                          {job.responsibilities.map(
                            (responsibility, respIndex) => (
                              <li key={respIndex}>{responsibility}</li>
                            )
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
                    References
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
                  <h2 className="text-xl font-semibold uppercase">Toolbox</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>

                {/* Technologies  */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold uppercase mb-2 text-blue-500">
                    Technologies
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
                    Professional Skills
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
                  <h2 className="text-xl font-semibold uppercase">Education</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul>
                  {resumeData.education.map((edu, index) => (
                    <li
                      key={index}
                      className={`${
                        index < resumeData.education.length - 1
                          ? "border-b-2 border-dashed border-gray-400 pb-4"
                          : ""
                      } ${index > 0 ? "mt-2" : ""}`}
                    >
                      <p className="text-lg">{edu.degree}</p>
                      <p className="text-blue-500">
                        <a href={edu.institutionUrl} target="_blank">
                          {edu.institution}
                        </a>
                      </p>
                      <p className="flex items-center mr-1">
                        <span>{edu.startDate}</span>{" "}
                        <span className="mx-1">-</span>{" "}
                        <span className="mr-3">{edu.endDate}</span>{" "}
                        <MdLocationPin className="mr-1" /> {edu.location}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Languages</h2>
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
                                ? "bg-blue-500"
                                : "bg-gray-300"
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
                    Notable Projects
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
                    Find me online
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
