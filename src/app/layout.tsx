
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Providers } from "@/providers/session";

import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fermon: Fertilizer Monitoring Distribution",
  description: "At Saptakarya, we blend creativity with precision to transform your ideas into reality. Discover our comprehensive range of innovative solutions designed to elevate your business to new heights. Partner with us and unlock the potential of your vision today. Welcome to Saptakarya – Where Innovation Meets Excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>  
      </body>
    </html>
  );
}
