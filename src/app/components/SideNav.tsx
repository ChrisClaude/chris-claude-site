'use client';
import UIContext from '@/hooks/UIContext';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const SideNav = () => {
  const { uiState: {isMobileNavOpen} } = useContext(UIContext);

  return (
    <div
      className={
        `fixed bg-black top-20 left-0 h-full w-72 overflow-hidden transition-all duration-75 ease-in md:hidden ${isMobileNavOpen? '' : ' w-0'}`
      }>
      <nav>
        <ul className="text-2xl">
          <li>
            <Link href="/blog" className="block p-7 font-medium header-border">
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="block p-7 font-medium header-border">
              Courses
            </Link>
          </li>
          <li>
            <Link href="/about" className="block p-7 font-medium header-border">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-7 flex flex-col gap-y-6 items-start">
        <ul className="flex gap-x-3 text-3xl">
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

        <Link
          href="/courses"
          className="block w-full bg-blue-purple-gradient bg-white text-white text-center px-6 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 focus:ring">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
