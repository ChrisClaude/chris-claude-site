import React from 'react';
import {
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa';

const SocialMediaBanner = () => (
  <section className="mb-48 max-w-screen-xl mx-auto">
    <div className="flex flex-col items-center">
      <h2 className="text-5xl mb-6">Let&apos;s Connect</h2>
      <p className="max-w-lg mb-12">
        We publish different types of software engineering content on multiple
        Social Media platforms. Reach out and let&apos;s connect.
      </p>
    </div>
    <ul className="flex flex-1 justify-center text-7xl gap-x-12">
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
          <FaTwitter />
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
