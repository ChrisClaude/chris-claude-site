import Link from 'next/link';
import Image from 'next/image';
import {
  SiCsharp,
  SiMicrosoftazure,
  SiMicrosoftsqlserver,
  SiDotnet,
} from 'react-icons/si';
import { BsArrowRightShort } from 'react-icons/bs';
import {
  FaReact,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';

//https://www.traversymedia.com/
export default function Home() {
  return (
    <>
      {/* Banner */}
      <section className="landing-section flex flex-col items-center h-screen relative pb-40 mb-28 pt-14 sm:pt-20 lg:pt-32">
        <p className="text-xl font-semibold mb-3">Chris Claude</p>
        <h1 className="text-7xl font-semibold text-center leading-tight mb-7">
          Learn & Improve Your <br />
          Software Development Skills
        </h1>
        <p className="text-2xl max-w-xl mb-10 mx-auto text-center">
          Full-stack project based tutorials for beginners, intermediate, and
          advanced developers.
        </p>
        <div className="flex justify-center sm:mb-12 mb-10 md:mb-16 lg:mb-20 xl:mb-24">
          <Link
            href="/courses"
            className="bloc bg-white text-blue-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring">
            Get started
          </Link>
        </div>
        <div className="flex flex-col gap-x-6 gap-y-8 px-4 md:px-6 lg:flex-row lg:items-center ">
          <h2 className="text-lg w-56 lg:mr-4">
            Learn the most popular and relevant topics in the tech industry
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 text-7xl">
            <SiDotnet />
            <SiCsharp />
            <SiMicrosoftazure />
            <SiMicrosoftsqlserver />
            <FaReact />
            <TbBrandNextjs />
          </div>
        </div>
      </section>
      <div className="relative">
        <div className="absolute bg-grid inset-0" />
        {/* Articles */}
        <section className="mb-36">
          <div className="flex items-center flex-col mb-14">
            <span className="block uppercase mb-3">Recent Posts Of</span>
            <h1 className="text-5xl">
              The <span className="text-blue-500">Dev</span> Weekly
            </h1>
          </div>
          <div className="flex justify-center grid-cols-1 gap-6 max-w-screen-xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {/* TODO: This should come from a directory with files (.md files) that we can parse and loop through */}
            <article className='flex-1'>
              <Image
                src="/Logging_in_ASP_NET_Thumbnail.png"
                alt="Logging in asp.net thumbnail"
                width={384}
                height={384}
                className="rounded-lg mb-3 w-full"
              />
              <div className="flex justify-between items-center">
              <h2>
                How to log different types of information and use logging providers available in .NET Core
              </h2>
                <BsArrowRightShort className="text-4xl" />
              </div>
            </article>

            <article className='flex-1'>
              <Image
                src="/Exception_handling_in_ASP_NET Thumbnail.png"
                alt="Exception handling in asp.net thumbnail"
                width={384}
                height={384}
                className="rounded-lg mb-3 w-full"
              />
              <div className="flex justify-between items-center">
                <h2>
                  Best practices on how to handle errors and exceptions in ASP.NET Core
                </h2>
                <BsArrowRightShort className="text-4xl" />
              </div>
            </article>

            <article className='flex-1'>
              <Image
                src="/ASP_NET_Web_API_Authentication_with_Identity_Server_6_Thumbnail.png"
                alt="ASP.NET API Authentication with Identity Server"
                width={384}
                height={384}
                className="rounded-lg mb-3 w-full"
              />
              <div className="flex justify-between items-center">
                <h2>
                We leverage the Identity Server implementation of OAuth2 and OpenId protocols to secure our Web API
                </h2>
                <BsArrowRightShort className="text-4xl" />
              </div>
            </article>
          </div>
        </section>

        <section className="max-w-screen-xl mx-auto bg-blue-purple-gradient mb-36 rounded-lg flex flex-1 flex-col lg:flex-row">
          <div className="flex flex-1 flex-col gap-6 p-6 text-left">
            <aside className="code">Community</aside>
            <div className="flex flex-col flex-1 justify-center gap-6 lg:px-8 lg:pb-12">
              <h3 className="text-6xl font-semibold text-gray-100">
                Join Us On Youtube
              </h3>
              <p className="text-gray-100">
                Join our YouTube community and subscribe to stay updated about
                the latest published content.
              </p>
              <a
                href="https://www.youtube.com/@chrisclaude"
                target="_blank"
                className="bloc bg-white text-blue-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring w-48">
                Join on YouTube
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/e-4FzpecBns?si=IEPjBqtDlFDb-I82"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
          </div>
        </section>

        <section className="mb-48 max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl mb-6">Let&apos;s Connect</h2>
            <p className="max-w-lg mb-12">
              We publish different types of software engineering content on
              multiple Social Media platforms. Reach out and let&apos;s connect.
            </p>
          </div>
          <ul className="flex flex-1 justify-center text-7xl gap-x-12">
            <li>
              <a href="https://www.youtube.com/@chrisclaude" target="_blank">
                <FaYoutube />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143"
                target="_blank">
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/ChrisClaude_" target="_blank">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://github.com/ChrisClaude" target="_blank">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/chrisclaude__" target="_blank">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
