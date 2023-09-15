import Link from 'next/link';
import { SiCsharp, SiMicrosoftazure, SiMicrosoftsqlserver, SiDotnet } from 'react-icons/si';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';

//https://www.traversymedia.com/
export default function Home() {
  return (
    <>
      <section className='landing-section flex flex-col items-center h-screen relative pb-40 pt-14 sm:pt-20 lg:pt-32'>
        <p className='text-xl font-semibold mb-3'>Chris Claude</p>
        <h1 className='text-7xl font-semibold text-center leading-tight mb-7'>Learn & Improve Your <br/>Software Development Skills</h1>
        <p className='text-2xl max-w-xl mb-10 mx-auto text-center'>
        Full-stack project based tutorials for beginners, intermediate, and advanced developers.
        </p>
        <div className='flex justify-center sm:mb-12 mb-10 md:mb-16 lg:mb-20 xl:mb-24'>
          <Link href="/courses" className='bloc bg-white text-blue-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring'>Get started</Link>
        </div>
        <div className='flex flex-col gap-x-6 gap-y-8 px-4 md:px-6 lg:flex-row lg:items-center '>
          <h2 className='text-lg w-56 lg:mr-4'>
            Learn the most popular and relevant topics in the tech industry
          </h2>
          <div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 text-7xl'>
            <SiDotnet />
            <SiCsharp />
            <SiMicrosoftazure />
            <SiMicrosoftsqlserver />
            <FaReact />
            <TbBrandNextjs />
          </div>
        </div>
      </section>
      <div className='relative'>
        <div className='absolute bg-grid inset-0'/>
        <section>
          <div className='flex items-center flex-col mb-14'>
            <span className='block uppercase mb-3'>Recent Posts Of</span>
            <h1 className='text-5xl'>The <span className='text-blue-500'>Dev</span> Weekly</h1>
          </div>
          <div className='flex justify-center grid-cols-1 gap-6 mb-36 max-w-screen-xl mx-auto sm:grid-cols-2 lg:grid-cols-3'>
            {/* TODO: This should come from a directory with files (.md files) that we can parse and loop through */}
            <article>
              <div  className='card mb-3'>
                <h2>Build and Secure an API with ASP.NET and Identity Server</h2>
              </div>
              <div>
                <div className='flex justify-between items-center'>
                  <h2>We leverage the OAuth2 and OpenId protocols to implement authentication</h2>
                  <BsArrowRightShort className='text-4xl' />
                </div>
              </div>
            </article>
            <article>
              <div className='card mb-2'>
                <h2>How to Handle Exceptions in ASP.NET</h2>
              </div>
              <div>
                <div className='flex justify-between items-center'>
                  <h2>We leverage the OAuth2 and OpenId protocols to implement authentication</h2>
                  <BsArrowRightShort className='text-4xl' />
                </div>
              </div>
            </article>

            <article>
              <div className='card'>
                <h2>Build a full-stack web app with ASP.NET and React JS</h2>
              </div>
              <div>
                <div className='flex justify-between items-center'>
                  <h2>We leverage the OAuth2 and OpenId protocols to implement authentication</h2>
                  <BsArrowRightShort className='text-4xl' />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section>
          <div>
            Image
          </div>
          <div>
            <h1>Chris Claude on YouTube</h1>
            <p>Subscribe to my YouTube channel for more tutorials</p>
            <button>
              View channel
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
