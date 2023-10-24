
const YouTubeChannelBanner = ({ compact = false }: {compact?: boolean}) => (
  <section className="max-w-screen-xl mx-auto bg-blue-purple-gradient mb-36 rounded-lg flex flex-1 flex-col md:px-0 lg:flex-row">
    <div className="flex flex-1 flex-col gap-6 p-6 text-left">
      <aside className="code">Community</aside>
      <div className="flex flex-col flex-1 justify-center gap-6 lg:px-8 lg:pb-12">
        <h1 className="text-5xl font-semibold text-gray-100 md:text-6xl">
          Join Us On Youtube
        </h1>
        <p className="text-gray-100">
          Join our YouTube community and subscribe to stay updated about the
          latest published content.
        </p>
        <a
          href="https://www.youtube.com/@chrisclaude"
          target="_blank"
          className="bloc bg-white text-blue-600 px-6 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 focus:ring w-48">
          Join on YouTube
        </a>
      </div>
    </div>
    {
      !compact &&
      <div className="flex-1 flex justify-center items-center px-2 pb-2 md:p-0">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/e-4FzpecBns?si=IEPjBqtDlFDb-I82"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
    </div>
    }
  </section>
);

export default YouTubeChannelBanner;
