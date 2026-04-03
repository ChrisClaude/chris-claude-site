'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ToastProvider } from '@heroui/react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/_lib/apollo/client';
import { UIContextProvider } from '@/_hooks/UIContext';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider>
        <ThemeProvider>
          <ToastProvider />
          <UIContextProvider>{children}</UIContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default Providers;
