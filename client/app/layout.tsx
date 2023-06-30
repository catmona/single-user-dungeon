import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './_components/footer'
import Header from './_components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Single User Dungeon',
  description: 'A game made by Catherine Sangiovanni',
  type: "website",
  robots: {
    follow: true,
    index: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="dark:bg-gray-800 w-full flex flex-col h-screen justify-between">
          <Header />
          <div className="mb-auto h-10">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
