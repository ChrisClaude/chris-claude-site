import Script from 'next/script';
import './globals.css';
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
