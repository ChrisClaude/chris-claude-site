import Link from "next/link";
import Logo from "./Logo";
import { FaLinkedinIn, FaYoutube, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => (<footer className='md:px-20 px-40 py-2 flex justify-between items-center'>
  <div>
    <Link href="/" className='flex items-center'>
      <Logo />
    </Link>
</div>
<p>
  &copy; { new Date().getFullYear() } Chris Claude. All rights reserved.
</p>
<div>
  <ul className='flex'>
    <li className='mr-4'>
      <a href="https://twitter.com/ChrisClaude_" className="text-2xl" target="_blank"><FaTwitter /></a>
    </li>
    <li className='mr-4'>
      <a href="https://www.instagram.com/chrisclaude__" className="text-2xl" target="_blank"><FaInstagram /></a>
    </li>
    <li className='mr-4'>
      <a href="https://www.youtube.com/@chrisclaude" className="text-2xl" target="_blank"><FaYoutube /></a>
    </li>
    <li className='mr-4'>
      <a href="https://github.com/ChrisClaude" className="text-2xl" target="_blank"><FaGithub /></a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/claude-de-tchambila-a720ba143" className="text-2xl" target="_blank"><FaLinkedinIn /></a>
    </li>
  </ul>
</div>
</footer>);

export default Footer;