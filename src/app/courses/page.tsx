import { GridBgWrapper } from "@/components";

export default function Home() {
  return (
    <>
      <GridBgWrapper bgType={2}>
        <div className="hero relative">
          <section className="pb-40 px-16">
            <h1 className="text-6xl mx-auto max-w-screen-lg pt-24 text-center sm:heading-2 lg:heading-1 md:pt-32 lg:pt-40">Explore our Project Based Tutorials and Courses</h1>
          </section>
        </div>
        <section>
          <div className="py-20 px-16 text-5xl flex items-center justify-center">
            Coming Soon!
          </div>
        </section>
      </GridBgWrapper>
    </>
  );
}
