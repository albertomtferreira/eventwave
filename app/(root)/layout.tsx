import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { assets, labels } from "@/constants/data";


export const metadata: Metadata = {
  title: `${labels.app_title}`,
  description: `${labels.app_description}`,
  icons: {
    icon: `${assets.favicon_root_layout}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}