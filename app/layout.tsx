import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Adeel Akhani</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <Analytics/>
          <Navbar/>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
