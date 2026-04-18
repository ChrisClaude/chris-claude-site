'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/_components/auth/AuthGuard';
import { useAuth } from '@/_hooks/useAuth';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'My Articles', href: '/admin/my-articles' },
  { label: 'All Articles', href: '/admin/all-articles' },
  { label: 'Users', href: '/admin/users' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const { userProfile, logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-700">
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to site
        </Link>
        <h1 className="mt-3 text-lg font-bold text-white">Admin Dashboard</h1>
        {userProfile && (
          <p className="mt-1 text-xs text-gray-400 truncate">
            {userProfile.name} {userProfile.surname}
          </p>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard userType="Admin">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
