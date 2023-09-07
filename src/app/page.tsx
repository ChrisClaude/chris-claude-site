import Link from 'next/link';
import { SiCsharp, SiMicrosoftazure, SiMicrosoftsqlserver, SiDotnet } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';

//https://www.traversymedia.com/
export default function Home() {
  return (
    <>
      <section className='landing-section h-screen relative pb-40 pt-14 sm:pt-20 lg:pt-32'>
        <p className='text-xl font-semibold mb-3 text-center '>Chris Claude</p>
        <h1 className='text-7xl font-semibold leading-tight text-center mb-7'>Learn & Improve Your <br/>Software Development Skills</h1>
        <p className='text-2xl max-w-xl mb-10 mx-auto text-center'>
        Full-stack project based tutorials for beginners and intermediate, and advanced developers.
        </p>
        <div className='text-center sm:mb-16 mb-14 md:mb-20 lg:mb-24 xl:mb-28'>
          <Link href="/courses" className='bg-white text-blue-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring'>Get started</Link>
        </div>
        <div>
          <h2>
            Learn valuable and in demand skills
          </h2>
          <div>
            <SiCsharp />
            <SiMicrosoftazure />
            <SiMicrosoftsqlserver />
            <SiDotnet />
            <FaReact />
            <TbBrandNextjs />
          </div>
        </div>
      </section>
      <section className='flex justify-between items-center py-8'>
        <p className='text-lg uppercase'>
          Notify me when new courses are available
        </p>
        <div>
          <input type="email" placeholder='Email' className='mr-6 outline outline-1 outline-gray-400 rounded p-1 w-60 focus:outline-blue-600' />
          <button className='bg-white text-black px-3 py-2 rounded text-sm font-semibold focus:ring hover:bg-gray-200' type='submit'>Notify me</button>
        </div>
      </section>
      <section>
        <h1>Latest Courses & Posts</h1>
        <div>
          {/* TODO: This should come from a directory with files (.md files) that we can parse and loop through */}
          <div>
            <h2>Build and Secure an API with ASP.NET and Identity Server</h2>
            <h3>Intermediate</h3>
            <div>description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt maxime voluptates sapiente suscipit, nesciunt vero.</div>
            <button>
              Watch
            </button>
            <button>
              Read
            </button>
          </div>
          <div>
            <h2>Build and Secure an API with ASP.NET and Identity Server</h2>
            <h3>Intermediate</h3>
            <div>description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, nam repellendus asperiores reprehenderit quibusdam vero!</div>
            <button>
              Watch
            </button>
            <button>
              Read
            </button>
          </div>
          <div>
            <h2>Build an Azure Boards Clone with ASP.NET & Next JS</h2>
            <h3>Intermediate</h3>
            <div>description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi minus odit soluta ea temporibus praesentium.</div>
            <button>
              Watch
            </button>
            <button>
              Read
            </button>
          </div>
          <button>
            Show all courses
          </button>
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
    </>
  );
}
