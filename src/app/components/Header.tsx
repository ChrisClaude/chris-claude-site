import Link from 'next/link';
import Logo from './Logo';

const Header = () => (<header className='md:px-20 px-40 py-5 flex justify-between items-center'>
<div>
  <Link href="/" className='flex items-center'>
  <Logo />
  </Link>
</div>
<nav className='flex items-center'>
  <ul className='flex'>
    <li className='mr-9'>
      <Link href="/blog">Blog</Link>
    </li>
    <li className='mr-9'>
      <Link href="/courses">Courses</Link>
    </li>
    <li className='mr-9'>
      <Link href="/about">About</Link>
    </li>
  </ul>
</nav>
</header>)

export default Header;