import { Footer, Header, Main, SideNav } from './components';
import './globals.css';
import { Inter } from 'next/font/google';
import { UIContextProvider } from './hooks/UIContext';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <UIContextProvider>
          <SideNav />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </UIContextProvider>
      </body>
    </html>
  );
}
