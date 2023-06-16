import Link from 'next/link';

const Header = () => (<header className='px-80 pt-10 flex justify-between'>
<div>
  <Link href="/">ChrisClaude.</Link>
</div>
<nav>
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