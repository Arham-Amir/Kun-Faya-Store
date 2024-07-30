import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/ui/toggleModeButton";
import Whatsapp from "@/components/ui/Whatsapp";
import Testimonials from "@/components/Testimonials";
import Headline from "@/components/Headline";
import Script from "next/script";

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
      <head>

        <Script
        id="gtm"
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-59G7GXVL');`
        }}>
        </Script>

      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ToasterProvider />
            {/* <Headline /> */}
            <Navbar />
            <main className="">
              {children}
            </main>
            <Testimonials />
            <Footer />
          </ClerkProvider>
          <ModeToggle />
          <Whatsapp />
        </ThemeProvider>
      </body>
    </html>
  );
}
