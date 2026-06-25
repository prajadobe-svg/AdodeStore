import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdobeStore",
  description: "Demo ecommerce site for Adobe AEP and Target tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script src="https://assets.adobedtm.com/6a203c8a0ff8/687eb5c89680/launch-bc9f3f0067b4.min.js" async></script>
        {/* <script src="https://assets.adobedtm.com/6a203c8a0ff8/aeb100c194c7/launch-cce179acef2d-development.min.js" async></script> */}
              {/* <script src="https://assets.adobedtm.com/6a203c8a0ff8/aeb100c194c7/launch-59192a116ea8.min.js" async></script> */}
        <SiteHeader />
        
        
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
