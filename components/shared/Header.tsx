import { labels, logo } from "@/constants/data"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={`${logo.image}`} alt={`${logo.alt}`} width={logo.width} height={logo.height} />
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs ">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">

          <SignedIn>
            <UserButton />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in" >{`${labels.login}`}</Link>
            </Button>
            {/* FIXME */}
            {/* remove the <MobileNav />  and <NavItems /> when the app will be stable on the cache sign in! */}
            <NavItems />
            <MobileNav />
          </SignedOut>
        </div>

      </div>

    </header>
  )
}

export default Header