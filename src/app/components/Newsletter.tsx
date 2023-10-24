'use client';
import { validateEmail } from '@/lib/validator';
import { useState } from 'react';

const Newsletter = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      setIsError(true);
      return;
    }

    if (isError) {
      setIsError(false);
    }

    // TODO: Save email address
    setEmail('');
    setIsSubscribed(true);
  };

  return (
    <section
      className={`w-full bg-slate-800 relative ${
        compact ? 'rounded-lg pt-14 pb-20 px-10' : 'py-28 px-5'
      }`}>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl mb-6 md:text-5xl">
          Subscribe to our <span className="text-blue-600">newsletter</span>
        </h2>
        <p className="max-w-lg mb-4">
          Get notified when there are new articles.
        </p>

        <div
          className={`w-full flex flex-col gap-4 md:justify-center ${
            compact ? 'md:flex-col' : 'md:flex-row md:w-2/3'
          } ${isSubscribed ? ' hidden' : ''}`}>
          <div className={`${compact ? 'md:w-full' : 'md:w-1/3'}`}>
            <input
              name="email"
              type="email"
              placeholder="Email address..."
              onChange={event => setEmail(event.target.value)}
              value={email}
              className="text-base text-gray-800 font-medium italic p-3 rounded-lg w-full mb-2"
            />
            <p
              className={`p-1 bg-red-50 text-center text-sm text-red-600 ${
                isError ? '' : ' hidden'
              }`}>
              The email address is not valid
            </p>
          </div>
          <button
            type="button"
            className="bg-white h-fit text-white bg-blue-purple-gradient px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:ring"
            onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
        <p
          className={`bg-green-200 p-2 text-center rounded-lg text-green-600 md:p-3${
            isSubscribed ? '' : ' hidden'
          }`}>
          Thanks for subscribing to our newsletter!
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
