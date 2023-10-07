'use client';
import React, { useState } from 'react';

function Newsletter() {

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // TODO: Save email address
    setEmail("");
    setIsSubscribed(true);
  };

  return (
    <section className='py-28 px-5 w-full bg-slate-800 relative'>
      <div className='flex flex-col items-center'>
        <h2 className="text-4xl mb-6 min-w-full md:text-5xl">Subscribe to our <span className='text-blue-600'>newsletter</span></h2>
        <p className='max-w-lg mb-4'>Get notified when there are new articles.</p>

      <div className={`w-full flex flex-col gap-4 md:justify-center md:flex-row md:w-2/3 ${isSubscribed ? ' hidden' : ''}`}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          className='text-base text-gray-800 font-medium italic p-3 rounded-lg md:w-1/3' />
        <button
          type="button"
          className="bloc bg-white text-white bg-blue-purple-gradient px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring"
          onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
      <p className={`bg-green-200 p-2 text-center rounded-lg text-green-600 md:p-3${isSubscribed? '' : ' hidden'}`}>
        Thanks for subscribing to our newsletter!
      </p>
      </div>
    </section>
  );
}

export default Newsletter;
