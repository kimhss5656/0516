import type { Metadata } from 'next'
import { Noto_Sans_KR, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans"
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: '김혜수 | Artist & Emotional Creator',
  description: '감정을 예술의 언어로 기록하는 아티스트 김혜수의 포트폴리오',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark bg-background scroll-smooth">
      <body className={`${notoSansKR.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
