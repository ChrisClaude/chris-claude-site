import Link from 'next/link';
import React from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const SideNav = () => {
  return (
    <div className='fixed top-20 left-0 h-full w-72'>
      <nav>
        <ul className='text-2xl'>
          <li className='p-7 font-medium header-border'>
            <Link href="/blog">Blog</Link>
          </li>
          <li className='p-7 font-medium header-border'>
            <Link href="/courses">Courses</Link>
          </li>
          <li className='p-7 font-medium header-border'>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className='p-7 flex flex-col gap-y-6 items-start'>
      <ul className="flex gap-x-3 text-3xl">
        <li>
          <a
            href="https://www.youtube.com/@chrisclaude"
            target="_blank">
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
          <a
            href="https://twitter.com/ChrisClaude_"
            target="_blank">
            <RiTwitterXFill />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ChrisClaude"
            target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/chrisclaude__"
            target="_blank">
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
  )
}

export default SideNav;