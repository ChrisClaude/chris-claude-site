'use client';
import UIContext from '@/hooks/UIContext';
import Link from 'next/link';
import { useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from './Logo';

const Header = () => {
  const { uiState, setUIState } = useContext(UIContext);

  const toggleSideNav = (value?: boolean) => {
    if (value !== undefined) {
      setUIState?.({ ...uiState, isMobileNavOpen: value });
      return;
    }
    setUIState?.({ ...uiState, isMobileNavOpen: !uiState.isMobileNavOpen });
  };

  return (
    <header className={`px-5 pt-6 pb-4 items-center header-border justify-between h-20 md:px-20 ${uiState.isResumePage? 'hidden' : 'flex'}`}>
      <div onClick={() => toggleSideNav(false)}>
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
      </div>
      <nav className="items-center hidden md:flex">
        <ul className="flex">
          <li className="mr-9">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="mr-9">
            <Link href="/courses">Courses</Link>
          </li>
          <li className="mr-9">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <button
        className="md:hidden text-3xl opacity-70"
        onClick={() => toggleSideNav()}>
        <RxHamburgerMenu />
      </button>
    </header>
  );
};

export default Header;
