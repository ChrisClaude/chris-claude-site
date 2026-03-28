import Script from 'next/script';
import { Footer, Header, Main, SideNav } from './components';
import AppWrapper from './components/AppWrapper';
import ThemeProvider from './components/ThemeProvider';
import './globals.css';
import { UIContextProvider } from './_hooks/UIContext';
import { Provider } from 'react-redux';
import Providers from './components/Providers';

export const metadata = {
  title: 'Chris Claude',
  description: 'Chris Claude Software Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://yarrowyard.bily.chat/b.js?shop=chrisclaude.com"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
