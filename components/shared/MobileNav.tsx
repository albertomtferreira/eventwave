import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { logo, mobile_nav_icon } from '@/constants/data'
import NavItems from './NavItems'


const MobileNav = () => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Image
            src={`${mobile_nav_icon.image}`}
            alt={`${mobile_nav_icon.alt}`}
            width={`${mobile_nav_icon.width}`}
            height={`${mobile_nav_icon.height}`}
            className='cursor-pointer'
          />

        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          <Image src={`${logo.image}`} alt={`${logo.alt}`} width={logo.width} height={logo.height} />
          <Separator className='border border-gray-100' />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>

  )
}

export default MobileNav