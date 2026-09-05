import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'SAN3A — Creative Technology Studio',
  description: 'SAN3A is a two-person digital studio building web platforms, mobile applications, visual systems, and custom software solutions with intention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} dark`}>
      <body className="bg-studio-bg text-studio-fg antialiased selection:bg-studio-fg selection:text-studio-bg min-h-screen relative font-sans">
        <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-40" />
        {children}
      </body>
    </html>
  )
}
