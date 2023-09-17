import React from 'react';
import Image from 'next/image';
import { BsArrowRightShort } from 'react-icons/bs';

const Articles = () => (
  <section className="mb-36">
    <div className="flex items-center flex-col mb-14">
      <span className="block uppercase mb-3">Recent Posts Of</span>
      <h1 className="text-5xl">
        The <span className="text-blue-500">Dev</span> Weekly
      </h1>
    </div>
    <div className="flex justify-center grid-cols-1 gap-6 max-w-screen-xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
      {/* TODO: This should come from a directory with files (.md files) that we can parse and loop through */}
      <article className="flex-1">
        <Image
          src="/Logging_in_ASP_NET_Thumbnail.png"
          alt="Logging in asp.net thumbnail"
          width={384}
          height={384}
          className="rounded-lg mb-3 w-full"
        />
        <div className="flex justify-between items-center">
          <h2>
            How to log different types of information and use logging providers
            available in .NET Core
          </h2>
          <BsArrowRightShort className="text-4xl" />
        </div>
      </article>

      <article className="flex-1">
        <Image
          src="/Exception_handling_in_ASP_NET Thumbnail.png"
          alt="Exception handling in asp.net thumbnail"
          width={384}
          height={384}
          className="rounded-lg mb-3 w-full"
        />
        <div className="flex justify-between items-center">
          <h2>
            Best practices on how to handle errors and exceptions in ASP.NET
            Core
          </h2>
          <BsArrowRightShort className="text-4xl" />
        </div>
      </article>

      <article className="flex-1">
        <Image
          src="/ASP_NET_Web_API_Authentication_with_Identity_Server_6_Thumbnail.png"
          alt="ASP.NET API Authentication with Identity Server"
          width={384}
          height={384}
          className="rounded-lg mb-3 w-full"
        />
        <div className="flex justify-between items-center">
          <h2>
            Leverage the OAuth2 and OpenId protocols to secure your Web API
          </h2>
          <BsArrowRightShort className="text-4xl" />
        </div>
      </article>
    </div>
  </section>
);

export default Articles;
