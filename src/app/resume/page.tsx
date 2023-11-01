import { EMAIL_ADDRESS, PHONE_NUMBER } from '@/config';
import Image from 'next/image';
import { FaLink, FaPhone } from 'react-icons/fa';
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

  return (
    <div className="bg-white w-full text-gray-800 flex flex-col justify-center p-24">
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
                https://chrisclaude.com
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
            <div>
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">
                  Corporate Experience
                </h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <div>
                <h3>Software Engineer</h3>
                <p>Capgemini</p>
                <p>
                  <span>07/2022</span>
                  <span> - </span> <span>Present</span> <MdLocationPin />{' '}
                  Poznan, Poland
                </p>
                <p>
                  I have been working on architecting and implementing software
                  solutions for clients in the financial services sector. The
                  list of clients I have worked with include (but is not limited
                  to) Nationale Nederlanden, one of the biggest insurance
                  providers in the Netherlands. I have designed and implemented
                  features that have improved the business processes of my
                  clients. The technologies I have used so far include C#, SQL
                  Server, Microsoft Azure, React JS, TypeScript and AzureDevOps.
                </p>
              </div>
            </div>

            {/* References  */}
            <div>
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">
                  References
                </h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <div>
                  <div>
                      <p>Prajwal Chengappa (Senior Software Engineer)</p>
                      <p>prajwal.chengappa@capgemini.com</p>
                  </div>
                  <div>
                      <p>Santosh Jadhav (Tech Lead)</p>
                      <p>santosh.jadhav@capgemini.com</p>
                  </div>
                  <div>
                      <p>Rens Van Driel (Software Developer)</p>
                      <p>rens.van.a.driel@sogeti.com</p>
                  </div>
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
                  <p>Diploma Application Development</p>
                  <p>Cape Peninsula University of Technology</p>
                  <p className="flex items-center mr-1">
                    <span>01/2018</span> <span className="mx-1">-</span>{' '}
                    <span>12/2020</span> <MdLocationPin /> Cape Town, South
                    Africa
                  </p>
                </li>
                <li>
                  <p>Chemical Engineering</p>
                  <p>Central Technical College</p>
                  <p className="flex items-center mr-1">
                    <span>2017</span>
                    <MdLocationPin /> Cape Town, South Africa
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
              <ul>
                <li>
                  <p>English</p>
                  <p>Advanced</p>
                </li>
                <li>
                  <p>French</p>
                  <p>Native</p>
                </li>
              </ul>
            </div>

            {/* Languages  */}
            <div className="mb-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold uppercase">
                  Find me online
                </h2>
                <div className="bg-gray-800 w-full h-1 rounded-full"></div>
              </div>
              <ul>
                <li className="border-b border-dashed border-gray-600 pb-2 mb-2">
                  <p>
                    <MdLocationPin />
                    Site
                  </p>
                  <a href="https://chrisclaude.com" target="_blank">
                    chrisclaude.com
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2 mb-2">
                  <p>
                    <MdLocationPin />
                    LinkedIn
                  </p>
                  <a
                    href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143/"
                    target="_blank">
                    Claude De-Tchambila
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2 mb-2">
                  <p>
                    <MdLocationPin />
                    GitHub
                  </p>
                  <a href="https://github.com/ChrisClaude" target="_blank">
                    Chris Claude
                  </a>
                </li>
                <li className="border-b border-dashed border-gray-600 pb-2 mb-2">
                  <p>
                    <MdLocationPin />
                    Stack Overflow
                  </p>
                  <a
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
