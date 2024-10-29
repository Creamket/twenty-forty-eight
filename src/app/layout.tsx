import type { Metadata } from 'next'
import { Montserrat_Alternates } from 'next/font/google'
import './globals.css'

const montserrat_alternates = Montserrat_Alternates({ subsets: ['latin', 'cyrillic'], weight: ['300', '500', '700'] })

export const metadata: Metadata = {
  title: 'twenty forty eight',
  description: 'Next js realization of 2048 game by Creamket',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat_alternates.className} antialiased`}>{children}</body>
    </html>
  )
}
