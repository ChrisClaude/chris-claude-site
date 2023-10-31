import Image from 'next/image';
import { FaLink, FaPhone } from 'react-icons/fa';
import { MdLocationPin, MdOutlineAlternateEmail } from 'react-icons/md';

const Resume = () => {
  return (
    <div className="bg-white w-full text-gray-800">
      <div>
        {/* Header */}
        <div>
          <h1 className="text-xl">Claude De-Tchambila</h1>
          <h2 className="text-lg">Software Engineer</h2>
          <div>
            <p>
              <FaPhone />
              +48 600 697 514
            </p>
            <p>
              <MdOutlineAlternateEmail /> christ.tchambila@gmail.com
            </p>
            <p>
              <FaLink />
              https://chrisclaude.com
            </p>
            <p>
              <MdLocationPin />
              Poznan, Poland
            </p>
          </div>

          <div>
            <Image
              width={300}
              height={300}
              src="/about_me.png"
              alt="Chris Claude"
              className="rounded-full w-52 h-52 lg:w-64 lg:h-64"
            />
          </div>
        </div>

        {/* Main */}
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <div>
              <h2>Summary</h2>
              <p>
                As an experienced software engineer, I specialize in designing
                distributed systems and implementing software solutions. With a
                strong background in building full-stack web, cloud, and mobile
                applications, I have developed excellent problem-solving skills
                and a love for constant learning. I am a critical thinker with a
                passion for positively impacting people&apos;s lives.
              </p>
            </div>
          </div>

          <div>
            <h2>Toolbox</h2>
            <h3>Technologies</h3>
            <div>
              <span>C#</span>
            </div>

            <h3>Power Skills</h3>
            <div>
              <span>Problem solving</span>
              <span>Assertiveness</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
