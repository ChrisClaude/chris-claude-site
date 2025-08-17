import { GridBgWrapper } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <GridBgWrapper bgType={2}>
        <div className="hero relative">
          <section className="pb-20 lg:pb-40 px-6 lg:px-16">
            <h1 className="text-4xl mx-auto max-w-screen-lg pt-24 text-center md:pt-32 lg:text-6xl lg:pt-40">
              Explore our Project Based Tutorials and Courses
            </h1>
          </section>
        </div>
        <section>
          <p className="pt-10 pb-28 px-16 text-lg text-center">
            New courses will appear here as they are published. Please explore
            articles in our{' '}
            <Link href="/blog" className="text-blue-400 hover:underline">
              blog
            </Link>{' '}
            in the meantime.
          </p>
        </section>
      </GridBgWrapper>
    </>
  );
}
