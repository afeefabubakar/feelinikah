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
const betrisDaniel = localFont({
  src: '../../../public/fonts/Betris_Daniel.otf',
  variable: '--font-betris-daniel',
  display: 'swap',
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
      className={`${belmoneBallpoint.variable} ${littleNima.variable} ${betrisDaniel.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}
