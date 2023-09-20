import { Footer, Header, Main, SideNav } from './components'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chris Claude',
  description: 'Chris Claude Software Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideNav />
        <Header />
        <div className='ml-72 md:ml-0'>
          <Main>
            {children}
          </Main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
