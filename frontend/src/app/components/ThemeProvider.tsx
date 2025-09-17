'use client';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
