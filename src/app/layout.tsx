import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https:/ribeiroevandro.com.br'),
  title: {
    default: 'Evandro Ribeiro',
    template: '%s | Evandro Ribeiro'
  },
  description: 'Sou desenvolvedor de software, com foco em Frontend, sou apaixonado por CSS.',
  openGraph: {
    title: 'Evandro Ribeiro - Sou desenvolvedor de software, com foco em Frontend, sou apaixonado por CSS.',
    description: 'Sou desenvolvedor de software, com foco em Frontend, sou apaixonado por CSS.',
    url: absoluteUrl('/'),
    siteName: 'Evandro Ribeiro',
    images: [
      {
        url: absoluteUrl('/images/og-image.png'),
        width: 1800,
        height: 1600
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
