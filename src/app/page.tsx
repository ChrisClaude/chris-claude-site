import Link from 'next/link';

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
          <button className='bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-blue-600'>Get in touch</button>
        </p>
      </section>
    </>
  );
}
