'use client';
import UIContext from '@/_hooks/UIContext';
import Link from 'next/link';
import { useContext, useRef, useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSun, BsMoon, BsPerson, BsBoxArrowRight } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import { Button, Avatar } from '@heroui/react';
import { useAuth } from '@/_hooks/useAuth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { uiState, setUIState } = useContext(UIContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleSideNav = (value?: boolean) => {
    if (value !== undefined) {
      setUIState?.({ ...uiState, isMobileNavOpen: value });
      return;
    }
    setUIState?.({ ...uiState, isMobileNavOpen: !uiState.isMobileNavOpen });
  };

  const { login, logout, isUserSignedIn, userProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeToggle = (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <BsSun className="text-xl" />
      ) : (
        <BsMoon className="text-xl" />
      )}
    </button>
  );

  return (
    <header
      className={`px-5 pt-6 pb-4 items-center header-border justify-between h-20 md:px-20 ${uiState.isResumePage ? 'hidden' : 'flex'}`}
    >
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
        {themeToggle}
        {isUserSignedIn ? (
          <div ref={menuRef} className="relative ml-3">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="focus:outline-none"
              aria-label="User menu"
            >
              <Avatar className="cursor-pointer" size="sm">
                {userProfile?.image ? (
                  <Avatar.Image
                    src={userProfile.image}
                    alt={userProfile?.name ?? 'User avatar'}
                  />
                ) : null}
                <Avatar.Fallback>
                  {userProfile?.name?.slice(0, 1)?.toUpperCase() ?? 'U'}
                </Avatar.Fallback>
              </Avatar>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-default-200 bg-background shadow-lg py-1 z-50">
                <div className="px-3 py-2 border-b border-default-100 select-none">
                  <p className="text-sm font-semibold truncate">
                    {userProfile?.name ?? 'Account'}
                  </p>
                  {userProfile?.email && (
                    <p className="text-xs text-default-400 truncate">
                      {userProfile.email}
                    </p>
                  )}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-default-100 transition-colors"
                >
                  <BsPerson className="text-base shrink-0" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger hover:bg-danger-50 transition-colors"
                >
                  <BsBoxArrowRight className="text-base shrink-0" />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            onPress={login}
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Login
          </Button>
        )}
      </nav>
      <div className="flex items-center gap-2 md:hidden">
        {themeToggle}
        <button className="text-3xl opacity-70" onClick={() => toggleSideNav()}>
          <RxHamburgerMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
