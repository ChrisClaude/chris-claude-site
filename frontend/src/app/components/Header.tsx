'use client';
import UIContext from '@/_hooks/UIContext';
import Link from 'next/link';
import { useContext } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import { useAuth } from '@/_hooks/useAuth';

const Header = () => {
  const { uiState, setUIState } = useContext(UIContext);

  const toggleSideNav = (value?: boolean) => {
    if (value !== undefined) {
      setUIState?.({ ...uiState, isMobileNavOpen: value });
      return;
    }
    setUIState?.({ ...uiState, isMobileNavOpen: !uiState.isMobileNavOpen });
  };

  const { login, logout, isUserSignedIn, userProfile } = useAuth();
  const { theme, setTheme } = useTheme();

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
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                className="ml-2 cursor-pointer transition-transform"
                size="sm"
              >
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
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="profile" id="profile" href="/profile">
                Profile
              </DropdownItem>
              <DropdownItem
                key="logout"
                id="logout"
                className="text-danger"
                onPress={logout}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
