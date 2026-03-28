'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import StoreProvider from './StoreProvider';
import { UIContextProvider } from '@/_hooks/UIContext';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <StoreProvider>
        <SessionProvider>
          <ThemeProvider>
            <ToastProvider />
            <UIContextProvider>{children}</UIContextProvider>
          </ThemeProvider>
        </SessionProvider>
      </StoreProvider>
    </HeroUIProvider>
  );
};

export default Providers;
