'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import SessionRefreshProvider from './SessionRefreshProvider';

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <SessionRefreshProvider>{children}</SessionRefreshProvider>
    </SessionProvider>
  );
};

export default SessionProviderWrapper;
