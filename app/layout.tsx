import './globals.css'

export const metadata = {
  title: 'AI experience',
  description: 'App for sharing AI prompts and experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
