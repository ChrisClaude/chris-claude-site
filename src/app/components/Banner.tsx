import Link from 'next/link';
import {
  SiCsharp,
  SiMicrosoftazure,
  SiMicrosoftsqlserver,
  SiDotnet,
} from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { BiLogoPython } from 'react-icons/bi';

const Banner = () => (
  <section className="landing-section w-screen flex flex-col items-center h-screen relative px-4 mb-24 pt-14 sm:pt-20 md:pb-40 md:w-full md:mb-28 lg:pt-32">
    <p className="text-sm font-semibold mb-3 md:text-xl">Chris Claude</p>
    <h1 className="text-3xl font-semibold text-center leading-tight mb-7 md:text-7xl">
      Learn & Improve Your <br />
      Software Development Skills
    </h1>
    <p className="text-lg max-w-xl mb-10 mx-auto text-center md:text-2xl">
      Full-stack project based tutorials for beginners, intermediate, and
      advanced developers.
    </p>
    <div className="flex justify-center sm:mb-12 mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <Link
        href="/courses"
        className="bg-white text-blue-600 px-7 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 focus:ring">
        Get started
      </Link>
    </div>
    <div className="flex flex-col gap-x-6 gap-y-8 px-4 md:px-6 lg:flex-row lg:items-center ">
      <h2 className="text-lg text-center md:text-left md:w-56 md:mr-4">
        Learn the most popular and relevant topics in the tech industry
      </h2>
      <div className="flex flex-wrap text-5xl items-center justify-center gap-x-10 gap-y-6 px-4 md:text-7xl">
        <SiDotnet title='.NET Core' />
        <SiCsharp title='C#' />
        <BiLogoPython title='Python' />
        <SiMicrosoftazure title='Microsoft Azure' />
        <SiMicrosoftsqlserver title='Microsoft SQL Server' />
        <FaReact title='React JS' />
      </div>
    </div>
  </section>
);

export default Banner;
