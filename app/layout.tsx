import Provider from '@/components/Provider';
import './globals.css'
import { Roboto } from 'next/font/google';

const roboto_medium = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-medium',
});

export const metadata = {
  title: 'AI.me',
  description: 'App for sharing AI prompts and experiences'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto_medium.variable} font-medium min-h-screen min-w-full`}>
        <Provider>
          <main className="container mx-auto">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
