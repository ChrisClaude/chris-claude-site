import React from 'react';

function Newsletter() {
  return (
    <section className='py-28 px-5 w-full bg-slate-800'>
      <div className='flex flex-col items-center'>
        <h2 className="text-5xl mb-6">Subscribe to our <span className='text-blue-600'>newsletter</span></h2>
        <p className='max-w-lg mb-4'>Get notified when there are new articles.</p>
      </div>
      <div className='flex flex-col gap-4 md:justify-center md:flex-row'>
        <input name="email" type="email" placeholder="Email Address" className='text-base text-gray-800 font-medium italic p-3 rounded-lg md:w-1/3' />
        <button
          type="button"
          className="bloc bg-white text-white bg-blue-purple-gradient px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring">
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default Newsletter;
