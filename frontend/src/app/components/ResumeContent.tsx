import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import Image from 'next/image';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
} from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';
import { SiLeetcode } from 'react-icons/si';
import { IoMdCheckbox } from 'react-icons/io';

const ResumeContent = () => {
  const technologies = [
    'C#',
    'C++',
    'JavaScript',
    'Next JS',
    'React JS',
    'Angular',
    'Python',
    'TensorFlow',
    'Java',
    'Docker',
    'Kubernetes',
    'Apache Kafka',
    'Microsoft Azure',
    'AWS',
  ];

  const skills = [
    'Problem solving',
    'Assertiveness',
    'Creativity',
    'Critical thinking',
    'Teamwork',
    'Team management',
    'Presentation / Public speaking',
    'Risk management',
  ];

  const references: {
    fullName: string;
    role: string;
    email: string;
    company: string;
  }[] = [
    {
      fullName: 'Prajwal Chengappa',
      role: 'Senior Software Engineer',
      email: 'prajwal.chengappa@capgemini.com',
      company: 'Capgemini',
    },
    {
      fullName: 'Banish Jha',
      role: 'Senior Software Engineer',
      email: 'banish.jha@nn-group.com',
      company: 'Nationale Nederlanden',
    },
    {
      fullName: 'Rens Van Driel',
      role: 'Software Developer',
      email: 'rens.van.a.driel@sogeti.com',
      company: 'Sogeti',
    },
  ];

  return (
    <div className="bg-white text-gray-800 py-24 px-52 overflow-x-auto xl:flex xl:justify-center">
      <div className="flex flex-col justify-center" style={{ width: '1200px' }}>
        <div>
          {/* Header */}
          <div className="flex justify-between mb-10">
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold uppercase">
                  Claude De-Tchambila
                </h1>
                <h2 className="text-2xl font-semibold text-blue-500">
                  Senior Software Engineer
                </h2>
              </div>
              <div className="grid grid-cols-2">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center">
                  <FaPhone className="mr-1 text-blue-500" />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{' '}
                  {EMAIL_ADDRESS}
                </a>
                <a
                  href="https://chrisclaude.com"
                  target="_blank"
                  className="flex items-center">
                  <FaLink className="mr-1 text-blue-500" />
                  <span>chrisclaude.com</span>
                </a>
                <p className="flex items-center">
                  <MdLocationPin className="mr-1 text-blue-500" />
                  Poznan, Poland
                </p>
              </div>
            </div>

            <div className="rounded-full w-48 h-48">
              <Image
                width={300}
                height={300}
                src="/about_me.png"
                alt="Chris Claude"
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
                <p>
                  I am a senior software engineer specializing in designing
                  distributed systems and implementing enterprise-grade software
                  solutions. With extensive experience building scalable
                  full-stack web applications, cloud infrastructure, and mobile
                  solutions, I&apos;ve developed strong problem-solving skills
                  and a passion for continuous learning. My technical expertise
                  spans multiple domains including financial services,
                  insurance, and document processing with a focus on delivering
                  high-quality, secure, and reliable software that positively
                  impacts users&apos; lives.
                </p>
              </div>

              {/* Work Experience  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">
                    Corporate Experience
                  </h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">
                    Senior Software Engineer
                  </h3>
                  <p className="text-blue-500">Firma Dla Kazdego</p>
                  <p className="flex items-center">
                    <span>01/2025</span>
                    <span className="mx-1"> - </span> <span>Present</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Poznan, Poland
                  </p>
                  <div className="mt-1">
                    <p>
                      Leading software development initiatives as a senior
                      engineer, focusing on enterprise-scale applications and
                      cloud architecture. Key responsibilities:
                    </p>
                    <ul className="list-disc ml-10 mt-1">
                      <li>
                        Architecting and developing full-stack web applications
                        using C#/.NET, React/Angular, and cloud services (Azure,
                        AWS)
                      </li>
                      <li>
                        Implementing CI/CD pipelines and infrastructure-as-code
                        for reliable, scalable deployments
                      </li>
                      <li>
                        Establishing comprehensive testing strategies including
                        unit, integration, and E2E testing frameworks
                      </li>
                      <li>
                        Implementing security best practices and compliance
                        measures for sensitive data handling
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Software Engineer</h3>
                  <p className="text-blue-500">Capgemini</p>
                  <p className="flex items-center">
                    <span>07/2022</span>
                    <span className="mx-1"> - </span> <span>12/2024</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Poznan, Poland
                  </p>
                  <div className="mt-1">
                    <p>
                      I have been working on architecting and implementing
                      software solutions for clients in the financial services
                      sector. The list of clients I have worked with includes
                      (but is not limited to) <b>Nationale Nederlanden</b>, one
                      of the biggest insurance providers in the Netherlands. I
                      have designed and implemented features that have improved
                      the business processes of my clients. The technologies I
                      have used so far include C#, SQL Server, Microsoft Azure,
                      React JS, TypeScript and AzureDevOps. The following are a
                      few of the features I have worked on:
                    </p>
                    <ul className="list-disc ml-10 mt-1">
                      <li>
                        Slowly changing dimension type 2 for a data warehouse
                        system
                      </li>
                      <li>
                        Cross environment and secure data import and export
                      </li>
                      <li>
                        Data row level security integrated with Azure RBAC
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Software Engineer</h3>
                  <p className="text-blue-500">Dariel</p>
                  <p className="flex items-center">
                    <span>02/2021</span>
                    <span className="mx-1"> - </span> <span>06/2022</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Johannesburg, South
                    Africa
                  </p>
                  <div className="mt-1">
                    <p>
                      I have worked with a number of clients on multiple
                      projects in the financial service sector. My clients
                      included <b>Sasfin Bank</b> and <b>Safrican Insurance</b>,
                      which is now part of <b>Sanlam</b>, the largest insurance
                      provider in South Africa. The following are a few of the
                      projects I have contributed to:
                    </p>
                    <ul className="list-disc ml-10 mt-1">
                      <li>
                        A Forex exchange trading platform. The technologies used
                        were C#, TypeScript, ASP.NET Core, Angular, AzureDevOps,
                        RabbitMQ
                      </li>
                      <li>
                        Insurance sales system. The technologies used were C#,
                        TypeScript, ASP.NET Core, Angular, React, AzureDevOps
                      </li>
                      <li>
                        A weighbridge management software system in the logistic
                        industry. The technologies used were C#, TypeScript,
                        ASP.NET Core, Angular, Jira, Jenkins, RabbitMQ
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Software Engineer</h3>
                  <p className="text-blue-500">Exigent Group</p>
                  <p className="flex items-center">
                    <span>11/2020</span>
                    <span className="mx-1"> - </span> <span>02/2021</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
                    Africa
                  </p>
                  <p className="mt-1">
                    I mainly worked on a project that was aimed at creating a
                    software system that would help process large amounts of
                    documents (company contracts, bills, legal agreements) using
                    machine learning and providing critical insights to clients.
                    I worked on backend and frontend features and integration
                    with ML tools. The technologies used were Python, Django,
                    Keras, PyTorch, and React JS.
                  </p>
                </div>
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
                  {references.map((reference, index) => (
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
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg">
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
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="border border-gray-600 border-solid py-1 px-2 rounded-lg">
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
                  <li className="border-b-2 border-dashed border-gray-400 pb-4">
                    <p className="text-lg">
                      Diploma in Application Development
                    </p>
                    <p className="text-blue-500">
                      <a href="https://www.cput.ac.za/" target="_blank">
                        Cape Peninsula University of Technology
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>01/2018</span> <span className="mx-1">-</span>{' '}
                      <span className="mr-3">12/2020</span>{' '}
                      <MdLocationPin className="mr-1" /> Cape Town, South Africa
                    </p>
                  </li>
                  <li className="mt-2">
                    <p className="text-lg">Chemical Engineering</p>
                    <p className="text-blue-500">
                      <a
                        href="https://www.ctc.edu.za/cape-town-campus/"
                        target="_blank">
                        Central Technical College
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span className="mr-3">2017</span>
                      <MdLocationPin className="mr-1" /> Cape Town, South Africa
                    </p>
                  </li>
                </ul>
              </div>

              {/* Languages  */}
              <div className="mb-6">
                <div className="mb-3">
                  <h2 className="text-xl font-semibold uppercase">Languages</h2>
                  <div className="bg-gray-800 w-full h-1 rounded-full"></div>
                </div>
                <ul className="flex flex-col gap-y-2">
                  <li className="flex justify-between">
                    <div>
                      <p className="font-medium">English</p>
                      <p className="text-sm">Advanced</p>
                    </div>
                    <div className="flex  gap-x-1">
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <div>
                      <p className="font-medium">French</p>
                      <p className="text-sm">Advanced</p>
                    </div>
                    <div className="flex gap-x-1">
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                      <div className="h-8 w-2 bg-blue-500 rounded-full" />
                    </div>
                  </li>
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
                  <li>
                    <p className="flex items-center gap-x-1 font-medium">
                      <IoMdCheckbox className="text-green-400 text-xl" />
                      <a
                        href="https://keepmeposted.com.mt/"
                        target="_blank"
                        className="ml-6 underline underline-offset-4 flex items-center gap-x-1">
                        <span>Keepmeposted.com.mt</span>
                        <FaExternalLinkAlt size={11} />
                      </a>
                    </p>
                    <p>
                      Led full-stack development for this enterprise
                      communication platform. Designed and implemented RESTful
                      APIs, responsive UI components, and established CI/CD
                      pipelines on Azure DevOps. Technologies: .NET Core,
                      Next.js, Azure, SQL Server, and Redis for caching.
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center gap-x-1 font-medium">
                      <IoMdCheckbox className="text-green-400 text-xl" />
                      <a
                        href="https://github.com/ChrisClaude"
                        target="_blank"
                        className="ml-6 underline underline-offset-4 flex items-center gap-x-1">
                        <span>Personal Portfolio</span>
                        <FaExternalLinkAlt size={11} />
                      </a>
                    </p>
                    <p>
                      Designed and developed my personal website using Next.js,
                      featuring a responsive design, blog functionality with
                      Markdown support, and custom animations. Implemented SEO
                      best practices and performance optimizations.
                    </p>
                  </li>
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
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <GiEarthAfricaEurope className="text-xl text-blue-500" />
                      Site
                    </p>
                    <a
                      href="https://chrisclaude.com"
                      target="_blank"
                      className="ml-6 underline underline-offset-4 flex items-center gap-x-1">
                      <span>chrisclaude.com</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <FaLinkedinIn className="text-xl text-blue-500" />
                      LinkedIn
                    </p>
                    <a
                      className="ml-6 underline underline-offset-4 flex items-center gap-x-1"
                      href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143/"
                      target="_blank">
                      <span>Claude De-Tchambila</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <FaGithub className="text-xl text-blue-500" />
                      <span>GitHub</span>
                    </p>
                    <a
                      className="ml-6 underline underline-offset-4 flex items-center gap-x-1"
                      href="https://github.com/ChrisClaude"
                      target="_blank">
                      <span>Chris Claude</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
                  <li className="border-b border-dashed border-gray-600 pb-2">
                    <p className="flex items-center gap-x-1  font-medium">
                      <SiLeetcode className="text-xl" />
                      LeetCode
                    </p>
                    <a
                      className="ml-6 underline underline-offset-4 flex items-center gap-x-1"
                      href="https://leetcode.com/u/ChChris"
                      target="_blank">
                      <span>ChChris</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </li>
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
