import Link from 'next/link';
import {
  SiCsharp,
  SiMicrosoftazure,
  SiMicrosoftsqlserver,
  SiDotnet,
} from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';

const Banner = () => (
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
);

export default Banner;
