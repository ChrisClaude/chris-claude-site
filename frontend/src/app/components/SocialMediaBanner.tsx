import React from 'react';
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const SocialMediaBanner = () => (
  <section className="max-w-screen-xl mx-auto mb-28 md:mb-48">
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mb-6 md:text-5xl">Let&apos;s Connect</h2>
      <p className="max-w-lg mb-12 text-center md:text-left">
        We publish different types of software engineering content on multiple
        Social Media platforms. Reach out and let&apos;s connect.
      </p>
    </div>
    <ul className="flex flex-1 justify-center text-4xl gap-x-4 md:text-7xl md:gap-x-12">
      <li>
        <a href="https://www.youtube.com/@chrisclaude" target="_blank">
          <FaYoutube />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143"
          target="_blank">
          <FaLinkedinIn />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/ChrisClaude_" target="_blank">
          <RiTwitterXFill />
        </a>
      </li>
      <li>
        <a href="https://github.com/ChrisClaude" target="_blank">
          <FaGithub />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/chrisclaude__" target="_blank">
          <FaInstagram />
        </a>
      </li>
    </ul>
  </section>
);

export default SocialMediaBanner;
