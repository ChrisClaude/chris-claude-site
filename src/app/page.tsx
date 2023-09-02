import Link from 'next/link';

// TODO: Example websites: https://preview.themeforest.net/item/edrea-tailwind-css-personal-portfolio-react-template/full_screen_preview/42914502
//https://www.traversymedia.com/
export default function Home() {
  return (
    <>
      <section className='landing-section relative text-center pb-40 pt-14 sm:pt-20 lg:pt-32'>
        <p className='text-xl font-semibold mb-3'>Chris Claude</p>
        <p className='text-7xl font-semibold mb-3'>Software Development</p>
        <p className='text-7xl font-semibold mb-3'>Training</p>
        <p className='text-2xl mb-6'>
        Full-stack project based tutorials for beginners and intermediate, and advanced developers.
        </p>
        <div>
          <Link href="/courses" className='bg-blue-800 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring'>Get started</Link>
        </div>
      </section>
      <section className='flex justify-between items-center py-8'>
        <p className='text-lg uppercase'>
          Notify me when new courses are available
        </p>
        <div>
          <input type="email" placeholder='Email' className='mr-6 outline outline-1 outline-gray-400 rounded p-1 w-60 focus:outline-blue-600' />
          <button className='bg-blue-800 text-white px-3 py-2 rounded text-sm font-semibold focus:ring hover:bg-blue-600' type='submit'>Notify me</button>
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
