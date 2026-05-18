import React from 'react'
import './styles.css'
import { Inter, Tangerine } from 'next/font/google'
import localFont from 'next/font/local'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const belmoneBallpoint = localFont({
  src: '../../../public/fonts/BelmoneBallpoint.otf',
  variable: '--font-sans',
  display: 'swap',
})
const imperialScript = Tangerine({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-imperial',
})
const littleNima = localFont({
  src: '../../../public/fonts/LittleNima.otf',
  variable: '--font-nima',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={`${belmoneBallpoint.variable} ${littleNima.variable} ${imperialScript.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}
