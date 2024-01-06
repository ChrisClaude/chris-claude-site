'use client';
import UIContext from '@/hooks/UIContext';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { FaLink, FaLinkedinIn, FaPhone } from 'react-icons/fa';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';

type Person = {
  surname: string;
  firstName: string;
  title: string;
  telephone: string;
  email: string;
  website: string;
  city: string;
  country: string;
};

const Resume = () => {
  const { uiState, setUIState } = useContext(UIContext);
  const person: Person = {
    firstName: 'Julien',
    surname: 'Koukodila',
    telephone: '+27 682 999 874',
    title: 'Business Analyst',
    city: 'Cape Town',
    country: 'South Africa',
    email: 'julienkoukodila2@gmail.com',
    website: 'https://chrisclaude.com',
  };
  const technologies = [
    'C#',
    'ASP.NET',
    'SQL Server',
    'JavaScript',
    'React JS',
    'Angular',
    'Python',
    'TensorFlow',
    'Java',
    'GoLang',
    'Swift',
    'Docker',
    'Kubernetes',
    'Apache Kafka',
    'RabbitMQ',
    'Microsoft Azure',
    'Azure DevOps',
    'AWS',
    'Jenkins',
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
      fullName: 'Claude De-Tchambila',
      role: 'Senior Software Engineer',
      email: 'claude-christ.de-tchambila@capgemini.com',
      company: 'Capgemini',
    },
  ];

  useEffect(() => {
    setUIState?.({ ...uiState, isResumePage: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 py-24 px-52 overflow-x-auto xl:flex xl:justify-center">
      <div className="flex flex-col justify-center" style={{ width: '1200px' }}>
        <div>
          {/* Header */}
          <div className="flex justify-between mb-10">
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold uppercase">
                  {person.firstName} {person.surname}
                </h1>
                <h2 className="text-2xl font-semibold text-blue-500">
                  {person.title}
                </h2>
              </div>
              <div className="grid grid-cols-2">
                <a
                  href={`tel:${person.telephone}`}
                  className="flex items-center">
                  <FaPhone className="mr-1 text-blue-500" />
                  {person.telephone}
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center">
                  <MdOutlineAlternateEmail className="mr-1 text-blue-500" />{' '}
                  {person.email}
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
                  {person.city}, {person.country}
                </p>
              </div>
            </div>

            <div className="rounded-full w-48 h-48">
              <Image
                width={300}
                height={300}
                src="/julien_koukodila.png"
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
                  I thrive in data-driven environment and enjoy collaborating
                  with cross-functional teams to solve complex business
                  problems. I bring a passion for analyzing and interpreting
                  complex data to drive business decisions and improve
                  processes. With over three years of experience in the
                  automotive industry as a Simulation Engineer/Analyst, I&apos;ve
                  honed my skills in data management, analysis, and
                  visualization. At my current role, I utilize Python, T-SQL,
                  and Excel to provide insights that support strategic
                  initiatives and ensure data accuracy and reliability.
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
                  <h3 className="text-lg font-medium">HR Agent</h3>
                  <p className="text-blue-500">
                    Trauma Center for Survivors of Violence and Torture
                  </p>
                  <p className="flex items-center">
                    <span>02/2023</span>
                    <span className="mx-1"> - </span> <span>11/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
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
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Consulting Agent</h3>
                  <p className="text-blue-500">Clear Review</p>
                  <p className="flex items-center">
                    <span>01/2022</span>
                    <span className="mx-1"> - </span> <span>01/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
                    Africa
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
                <div className="mb-6 border-b-2 border-dashed border-gray-400 pb-4">
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
                <div>
                  <h3 className="text-lg font-semibold uppercase mb-1 text-blue-500">
                    Power Skills
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
                      Bachelor in Business Administration
                    </p>
                    <p className="text-blue-500">
                      <a href="https://www.richfield.ac.za/" target="_blank">
                        Richfield Graduate Institute of Technology (Pty) Ltd
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>01/2021</span> <span className="mx-1">-</span>{' '}
                      <span className="mr-3">12/2023</span>{' '}
                      <MdLocationPin className="mr-1" /> Cape Town, South Africa
                    </p>
                  </li>
                  <li className="mt-2">
                    <p className="text-lg">Matric</p>
                    <p className="text-blue-500">
                      <a href="https://www.richfield.ac.za/" target="_blank">
                        Notre Dame de Rosaire
                      </a>
                    </p>
                    <p className="flex items-center mr-1">
                      <span>2017</span> <span className="mx-1">-</span>{' '}
                      <span className="mr-3">12/2023</span>{' '}
                      <MdLocationPin className="mr-1" /> Pointe-Noire,
                      Congo-Brazzaville
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
                      <FaLinkedinIn className="text-xl text-blue-500" />
                      LinkedIn
                    </p>
                    <a
                      className="ml-6"
                      href="https://www.linkedin.com/in/julien-koukodila-469838220/"
                      target="_blank">
                      Julien Koukodila
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

export default Resume;
