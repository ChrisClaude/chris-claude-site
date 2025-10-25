'use client';

import { Footer, Main } from '@/components';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  EyeIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const ResumeHeader = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/resume',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      href: '/resume/view',
      label: 'View Resumes',
      icon: EyeIcon,
    },
    {
      href: '/resume/editor',
      label: 'Editor',
      icon: PencilSquareIcon,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/resume') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/resume"
            className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            <DocumentTextIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Resume Hub</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map(link => {
              const IconComponent = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      active
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ResumeHeader />
      <Main>
        {children}

        <div
          data-component-embed="chat-prompt"
          data-enable-chat="true"
          id="chat-prompt"
        />
        <Footer />
      </Main>
    </>
  );
};

export default MainLayout;
