import Link from 'next/link';

// TODO: Example websites: https://preview.themeforest.net/item/edrea-tailwind-css-personal-portfolio-react-template/full_screen_preview/42914502
//https://www.traversymedia.com/
export default function Home() {
  return (
    <>
      <section className='text-center'>
        <p className='text-xl font-semibold mb-3'>Chris Claude</p>
        <p className='text-5xl font-semibold mb-3'>Software Development</p>
        <p className='text-5xl font-semibold mb-3'>Training</p>
        <p className='mb-6'>
        Full-stack project based tutorials for beginners and intermediate, and advanced developers.
        </p>
        <p>
          <Link href="/courses" className='bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-blue-600'>Get started</Link>
        </p>
      </section>
      <section>
        <p>
          Notify me when new courses are available
        </p>
        <div>
          <input type="email" />
          <button>Notify Me</button>
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
