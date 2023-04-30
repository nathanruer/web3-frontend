import './globals.css'

import { Roboto } from "next/font/google"

import Navbar from './components/navbar/Navbar';

const font = Roboto({
  subsets: ["latin"],
  weight: "300",
});

export const metadata = {
  title: 'Web3 App - Nathan Ruer',
  description: 'Simple Web3 App using Next 13!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-gray-900 to-gray-600
       ${font.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
