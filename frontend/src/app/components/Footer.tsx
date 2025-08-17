'use client';
import Link from 'next/link';
import Logo from './Logo';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { useContext } from 'react';
import UIContext from '@/hooks/UIContext';

const Footer = () => {
  const { uiState } = useContext(UIContext);

  return (
    <footer
      className={`px-5 py-6 w-screen flex-col-reverse gap-y-4 items-center md:gap-y-0 md:flex-row md:justify-between md:px-20 md:w-full ${
        uiState.isResumePage ? 'hidden' : 'flex'
      }`}
    >
      <div>
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Chris Claude. All rights reserved.
      </p>
      <div>
        <ul className="flex gap-x-3">
          <li>
            <a
              href="https://www.youtube.com/@chrisclaude"
              className="text-2xl"
              target="_blank"
            >
              <FaYoutube />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143"
              className="text-2xl"
              target="_blank"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/ChrisClaude_"
              className="text-2xl"
              target="_blank"
            >
              <RiTwitterXFill />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ChrisClaude"
              className="text-2xl"
              target="_blank"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/chrisclaude__"
              className="text-2xl"
              target="_blank"
            >
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
