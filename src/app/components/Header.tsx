import Link from 'next/link';

const Header = () => (<header>
<div>ChrisClaude.</div>
<nav>
  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/about">About</Link>
    </li>
    <li>
      <Link href="/portfolio">Portfolio</Link>
    </li>
    <li>
      <Link href="/news">News</Link>
    </li>
    <li>
      <Link href="/contact">Contact</Link>
    </li>
  </ul>
</nav>
</header>)

export default Header;