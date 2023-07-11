import Image from 'next/image';
import Link from 'next/link';

const Header = () => (<header className='px-80 pt-10 flex justify-between'>
<div>
  <Link href="/" className='flex items-center'>
  <Image
      src="/ChrisClaudeLogo_.jpeg"
      width={90}
      height={90}
      alt="Chris Claude Logo"
      className='mr-2'
    />
    <span>Chris Claude</span>
  </Link>
</div>
<nav className='flex items-center'>
  <ul className='flex'>
    <li className='mr-9'>
      <Link href="/">Home</Link>
    </li>
    <li className='mr-9'>
      <Link href="/about">About</Link>
    </li>
    <li className='mr-9'>
      <Link href="/portfolio">Portfolio</Link>
    </li>
    <li className='mr-9'>
      <Link href="/news">News</Link>
    </li>
    <li>
      <Link href="/contact">Contact</Link>
    </li>
  </ul>
</nav>
</header>)

export default Header;