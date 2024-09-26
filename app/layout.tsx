import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { labels, assets } from "@/constants/data";


import "./globals.css";


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: `${labels.app_title}`,
  description: `${labels.app_description}`,
  icons: {
    icon: `${assets.favicon_main_layout}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>
      <html lang="en">
        <body
          className={poppins.variable}>

          {children}
        </body>
      </html>
    </ClerkProvider>


  );
}
