import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Nunito_Sans,
  Space_Grotesk,
} from "next/font/google"

import "@repo/ui/globals.css"
import { TooltipProvider } from "@repo/ui/components/tooltip"

import { ThemeProvider } from "@/components/theme-provider"

import { cn } from "@repo/ui/lib/utils"
import { Navbar } from "@/components/global/navbar"

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const inter = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
