import { assets, labels } from "@/utils/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${labels.app_title_signin_signup}`,
  description: `${labels.app_description}`,
  icons: {
    icon: `${assets.favicon_main_layout}`,
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center ">

      {children}

    </div>
  )
}
export default Layout