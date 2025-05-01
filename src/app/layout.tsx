import type { Metadata } from "next";
// Remove Geist fonts as we are using Poppins from globals.css
// import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin']
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin']
// })

export const metadata: Metadata = {
  title: "Teste de Personalidade Big Five",
  description:
    "Descubra seus traços de personalidade com nosso teste baseado no modelo Big Five.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* Remove Geist font variables from body */}
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
