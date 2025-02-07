import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import CookiesNotification from "@/components/cookies-notification"
import { setAdminEmails } from "@/actions/admin"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aplicação Modelo",
  description: "Aplicação modelo criado por Thiago Elias em Next.js",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  await setAdminEmails()

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-x-hidden`}
      >
        {children}
        <Toaster />
        <CookiesNotification />
      </body>
    </html>
  )
}
