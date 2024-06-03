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
    telephone: '+971 559 186 938',
    title: 'Human Resources Manager',
    city: 'Damac Towers by Paramount, Dubai',
    country: 'United Arab Emirates',
    email: 'julienkoukodila2@gmail.com',
    website: 'https://www.linkedin.com/in/julien-koukodila-469838220/',
  };
  const technologies = [
    'Microsoft Excel',
    'Microsoft Word',
    'Microsoft Office',
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
    {
      fullName: 'Belanganaye',
      role: 'Senior Call Center Agent',
      email: '+27 83 859 6609',
      company: 'P3 People',
    },
    {
      fullName: 'Yumna',
      role: 'Human Resource Agent',
      email: '+27 65 537 7144',
      company: 'Trauma Center for Survivors of Violence and Torture',
    },
    {
      fullName: 'Lungi Gxagxisa',
      role: 'Sales Agent',
      email: '+27 079 223 5053',
      company: 'Vodacom',
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
                  href={person.website}
                  target="_blank"
                  className="flex items-center">
                  <FaLink className="mr-1 text-blue-500" />
                  <span>My LinkedIn</span>
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
                  mental health industry as a Simulation Engineer/Analyst,
                  I&apos;ve honed my skills in data management, analysis, and
                  visualization. At my current role, I utilize Python, JavaScript,
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
                      I have undertaken diverse responsibilities as a
                      receptionist, project secretary, and HR assistant, all of
                      which contribute significantly to the smooth functioning
                      of business operations. Notably, in the realm of Front
                      Desk Management, I have excelled in delivering a
                      professional and welcoming experience to visitors. This
                      encompasses adeptly handling incoming phone calls,
                      directing them to the appropriate contacts, and capturing
                      messages when required. Additionally, I have been
                      proficient in providing information to guests, addressing
                      queries, and collaborating with various departments to
                      ensure timely service:
                    </p>
                  </div>
                </div>

                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Call Center Agent</h3>
                  <p className="text-blue-500">P3 People</p>
                  <p className="flex items-center">
                    <span>10/2022</span>
                    <span className="mx-1"> - </span> <span>01/2023</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
                    Africa
                  </p>
                  <div className="mt-1">
                    <p>My duties during this time were as follows:</p>
                    <ul className="list-disc pl-5">
                      <li>
                        Provide information on various auto insurance policies,
                        coverage alternatives, and conditions for company such
                        as CARTRAC, FIRST FOR WOMEN, KING PRICE.
                      </li>
                      <li>
                        Explain policy details to customers, like as
                        deductibles, premiums, and exclusions
                      </li>
                      <li>
                        Help consumers buy new vehicle insurance plans or renew
                        current ones.
                      </li>
                      <li>
                        Explain the renewal procedure, including coverage
                        modifications and premium adjustments.
                      </li>
                      <li>
                        Handle requests for insurance adjustments, such as
                        changing personal information, adding or removing
                        drivers, or altering coverage. Ensure that any policy
                        changes are appropriately reflected in the system.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4 border-b-0 border-dashed border-gray-400 pb-4">
                  <h3 className="text-lg font-medium">Consulting Agent</h3>
                  <p className="text-blue-500">Clear Review</p>
                  <p className="flex items-center">
                    <span>01/2022</span>
                    <span className="mx-1"> - </span> <span>09/2022</span>{' '}
                    <MdLocationPin className="ml-3 mr-1" /> Cape Town, South
                    Africa
                  </p>
                  <div className="mt-1">
                    <p>My duties during this time were as follows:</p>
                    <ul className="list-disc pl-5">
                      <li>
                        Use mediation strategies to direct the talk and create a
                        positive and cooperative outcome.
                      </li>
                      <li>
                        Determine the root reasons of consumer complaints or
                        concerns in order to discover underlying issues.
                      </li>
                      <li>
                        Negotiate fair and reasonable solutions for both
                        customers and the organisation. Apply company policies
                        and processes correctly, ensuring that solutions are
                        consistent with established criteria.
                      </li>
                      <li>
                        Clarify policy details with the consumer and provide
                        insight into the reasoning behind particular decisions,
                        such as clearing his name from a department review issue
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
                      <span>2017</span> <MdLocationPin className="mr-1" />{' '}
                      Pointe-Noire, Congo-Brazzaville
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
