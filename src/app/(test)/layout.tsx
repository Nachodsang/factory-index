import TwElementCom from "@/components/twElementCom/twElementCom"


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}
        <TwElementCom /></body>
    </html>
  )
}
