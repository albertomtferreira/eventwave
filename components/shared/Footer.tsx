import { headerLinks } from "@/constants"
import { labels, logo } from "@/constants/data"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        {/* headerLinks[0] points to Home on index file */}
        <Link href={`${headerLinks[0].route}`}>
          <Image
            src={`${logo.image}`}
            alt={`${logo.alt}`}
            width={`${logo.width}`}
            height={`${logo.height}`}
          />
        </Link>
        <p>{`${labels.rights}`}</p>
      </div>
    </footer>
  )
}

export default Footer