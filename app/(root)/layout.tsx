import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { assets, labels } from "@/utils/data";


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
      <main className="flex-1">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}