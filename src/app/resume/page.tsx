import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import Image from 'next/image';
import {
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaPhone,
  FaStackOverflow,
} from 'react-icons/fa';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';

const Resume = () => {
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

  const references: { fullName: string; role: string; email: string, company: string }[] = [
    {
      fullName: 'Prajwal Chengappa',
      role: 'Senior Software Engineer',
      email: 'prajwal.chengappa@capgemini.com',
      company: 'Capgemini',
    },
    {
      fullName: 'Banish Jha',
      role: 'Senior Software Engineer at Nationale Nederlanden',
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
    <div className="bg-white w-full text-gray-800 flex flex-col justify-center p-24 sm:scale-50 md:scale-100">
      <div>
        {/* Header */}
        <div className="flex justify-between mb-10">
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold uppercase">
                Claude De-Tchambila
              </h1>
              <h2 className="text-2xl font-semibold text-blue-500">
                Software Engineer
              </h2>
            </div>
            <div className="grid grid-cols-2">
              <p className="flex items-center">
                <FaPhone className="mr-1" />
                {PHONE_NUMBER}
              </p>
              <p className="flex items-center">
                <MdOutlineAlternateEmail className="mr-1" /> {EMAIL_ADDRESS}
              </p>
              <p className="flex items-center">
                <FaLink className="mr-1" />
                <a href="https://chrisclaude.com">chrisclaude.com</a>
              </p>
              <p className="flex items-center">
                <MdLocationPin className="mr-1" />
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
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">Summary</h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <p>
                I am a software engineer that specializes in designing
                distributed systems and implementing software solutions. With a
                strong background in building full-stack web, cloud, and mobile
                applications, I have developed excellent problem-solving skills
                and a love for constant learning. I am a critical thinker with a
                passion for positively impacting people&apos;s lives.
              </p>
            </div>

            {/* Work Experience  */}
            <div className="mb-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">
                  Corporate Experience
                </h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                <h3 className="text-lg font-medium">Software Engineer</h3>
                <p className="text-blue-500">Capgemini</p>
                <p className="flex items-center">
                  <span>07/2022</span>
                  <span className="mx-1"> - </span> <span>Present</span>{' '}
                  <MdLocationPin className="ml-3 mr-1" /> Poznan, Poland
                </p>
                <p className="mt-1">
                  I have been working on architecting and implementing software
                  solutions for clients in the financial services sector. The
                  list of clients I have worked with includes (but is not
                  limited to) Nationale Nederlanden, one of the biggest
                  insurance providers in the Netherlands. I have designed and
                  implemented features that have improved the business processes
                  of my clients. The technologies I have used so far include C#,
                  SQL Server, Microsoft Azure, React JS, TypeScript and
                  AzureDevOps. The following are a few of the features I have
                  implemented:
                  <ul className="list-disc ml-10 mt-1">
                    <li>
                      Slowly changing dimension type 2 for a data warehouse
                      system
                    </li>
                    <li>Cross environment and secure data import and export</li>
                    <li>Data row level security integrated with Azure RBAC</li>
                  </ul>
                </p>
              </div>
              <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4">
                <h3 className="text-lg font-medium">Software Engineer</h3>
                <p className="text-blue-500">Dariel</p>
                <p className="flex items-center">
                  <span>02/2021</span>
                  <span className="mx-1"> - </span> <span>06/2023</span>{' '}
                  <MdLocationPin className="ml-3 mr-1" /> Johannesburg, South
                  Africa
                </p>
                <p className="mt-1">
                  I have been working on architecting and implementing software
                  solutions for clients in the financial services sector. The
                  list of clients I have worked with includes (but is not
                  limited to) Nationale Nederlanden, one of the biggest
                  insurance providers in the Netherlands. I have designed and
                  implemented features that have improved the business processes
                  of my clients. The technologies I have used so far include C#,
                  SQL Server, Microsoft Azure, React JS, TypeScript and
                  AzureDevOps. The following are a few of the features I have
                  implemented:
                  <ul className="list-disc ml-10 mt-1">
                    <li>
                      Slowly changing dimension type 2 for a data warehouse
                      system
                    </li>
                    <li>Cross environment and secure data import and export</li>
                    <li>Data row level security integrated with Azure RBAC</li>
                  </ul>
                </p>
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
                  I have been working on architecting and implementing software
                  solutions for clients in the financial services sector. The
                  list of clients I have worked with includes (but is not
                  limited to) Nationale Nederlanden, one of the biggest
                  insurance providers in the Netherlands. I have designed and
                  implemented features that have improved the business processes
                  of my clients. The technologies I have used so far include C#,
                  SQL Server, Microsoft Azure, React JS, TypeScript and
                  AzureDevOps. The following are a few of the features I have
                  implemented:
                  <ul className="list-disc ml-10 mt-1">
                    <li>
                      Slowly changing dimension type 2 for a data warehouse
                      system
                    </li>
                    <li>Cross environment and secure data import and export</li>
                    <li>Data row level security integrated with Azure RBAC</li>
                  </ul>
                </p>
              </div>
            </div>

            {/* References  */}
            <div>
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">References</h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-y-2">
                {references.map((reference, index) => (
                  <div key={index}>
                    <p>
                      <span className="text-blue-500 font-medium">
                        {reference.fullName}
                      </span>
                      <span className="ml-2">({reference.role})</span>
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
              <div className="mb-2">
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
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">Education</h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <ul>
                <li>
                  <p className="text-lg">Diploma in Application Development</p>
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
              <div className="mb-2">
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
                <li className="flex justify-between">
                  <div>
                    <p className="font-medium">Polish</p>
                    <p className="text-sm">Beginner</p>
                  </div>
                  <div className="flex gap-x-1">
                    <div className="h-8 w-2 bg-blue-500 rounded-full" />
                    <div className="h-8 w-2 bg-gray-300 rounded-full" />
                    <div className="h-8 w-2 bg-gray-300 rounded-full" />
                    <div className="h-8 w-2 bg-gray-300 rounded-full" />
                    <div className="h-8 w-2 bg-gray-300 rounded-full" />
                  </div>
                </li>
              </ul>
            </div>

            {/* Find me online  */}
            <div className="mb-6">
              <div className="mb-2">
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
                    className="ml-6">
                    chrisclaude.com
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2">
                  <p className="flex items-center gap-x-1  font-medium">
                    <FaLinkedinIn className="text-xl text-blue-500" />
                    LinkedIn
                  </p>
                  <a
                    className="ml-6"
                    href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143/"
                    target="_blank">
                    Claude De-Tchambila
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2">
                  <p className="flex items-center gap-x-1  font-medium">
                    <FaGithub className="text-xl text-blue-500" />
                    GitHub
                  </p>
                  <a
                    className="ml-6"
                    href="https://github.com/ChrisClaude"
                    target="_blank">
                    Chris Claude
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2">
                  <p className="flex items-center gap-x-1  font-medium">
                    <FaStackOverflow className="text-xl text-blue-500" />
                    Stack Overflow
                  </p>
                  <a
                    className="ml-6"
                    href="https://stackoverflow.com/users/10338096/chris-claude"
                    target="_blank">
                    Chris Claude
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
