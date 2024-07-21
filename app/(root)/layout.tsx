import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/ui/toggleModeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KunFaya Store",
  description: "KunFaya Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ToasterProvider />
            <Navbar />
            <main className="mt-[55px]">
              {children}
            </main>
            <Footer />
          </ClerkProvider>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
