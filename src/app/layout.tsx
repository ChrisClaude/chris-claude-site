import { Footer, Header, Main } from './components'
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
        <Header />
        <Main>
          {children}
        </Main>
        <Footer />
      </body>
    </html>
  )
}
