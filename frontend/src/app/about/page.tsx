import { GridBgWrapper } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <GridBgWrapper bgType={2}>
    <div className="hero relative">
      <section className="pb-10 lg:pb-20 px-6 lg:px-16">
        <h1 className="text-4xl mx-auto max-w-screen-lg pt-24 pb-16 text-center md:pt-32 lg:text-6xl lg:pt-40">Who is Chris Claude</h1>
        <div className="bg-gray-100 flex items-center justify-center py-4 bg-opacity-5">
          <div
            className="rounded-full w-52 h-52 lg:w-64 lg:h-64 bg-slate-300"
          >
          <Image
            width={300}
            height={300}
            src="/about_me.png"
            alt="Chris Claude"
            className="rounded-full w-52 h-52 lg:w-64 lg:h-64"
          />
          </div>
        </div>
      </section>
    </div>
    <section className="px-6 text-center pb-28 text-lg sm:px-14 md:px-24 lg:px-32 xl:px-48 2xl:px-56">
      <p>I&apos;m a software engineer with a passion for building full-stack web applications, mainly with .NET. I consider myself a problem solver. I like breaking down complex concepts to their most fundamental essence to facilitate understanding. My main expertise is in .NET/C#, JavaScript (React JS and Angular), Python, Microsoft Azure, and AWS. I&apos;m also an avid enthusiast of artificial intelligence, especially reinforcement learning.</p>

      <p className="mt-6">
      I created this platform to share my knowledge with a wider audience and help others learn about software development. If you&apos;re new to programming, looking to polish your skills, or become a solutions architect, I encourage you to check out <Link href="/blog" className="text-blue-400 hover:underline">my blog</Link> and <a href="https://www.youtube.com/@chrisclaude"
        className="text-blue-400 hover:underline"
        target="_blank">YouTube channel</a>. I have something for everyone, and I&apos;m always adding new content.
      </p>
    </section>
  </GridBgWrapper>
  );
}
