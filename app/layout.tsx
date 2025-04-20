import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocFinder - Trouvez le médecin qu'il vous faut",
  description: "Plateforme de recherche de médecins et de prise de rendez-vous en ligne",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Récupérer les identifiants Back4App depuis les variables d'environnement
  const BACK4APP_APPLICATION_ID = process.env.BACK4APP_APPLICATION_ID || ""
  const BACK4APP_JAVASCRIPT_KEY = process.env.BACK4APP_JAVASCRIPT_KEY || ""
  const BACK4APP_SERVER_URL = process.env.BACK4APP_SERVER_URL || "https://parseapi.back4app.com"

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Injecter les identifiants Back4App directement depuis les variables d'environnement */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.BACK4APP_APPLICATION_ID = "${BACK4APP_APPLICATION_ID}";
              window.BACK4APP_JAVASCRIPT_KEY = "${BACK4APP_JAVASCRIPT_KEY}";
              window.BACK4APP_SERVER_URL = "${BACK4APP_SERVER_URL}";
              console.log("Identifiants Back4App injectés:", !!window.BACK4APP_APPLICATION_ID, !!window.BACK4APP_JAVASCRIPT_KEY);
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} suppressHydrationWarning>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
