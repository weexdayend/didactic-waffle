import React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type ParamsProps = {
  provinsi: string;
  kabupaten: string;
  area: string;
}

const MenuBar = ({ provinsi, kabupaten, area }: ParamsProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className='flex flex-row gap-2'>
          <Link href={`/${provinsi}/${kabupaten}/gudang/profile`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} border ${area === 'gudang' ? 'border-white bg-background text-white' : ''}`}
            >
              Gudang
            </NavigationMenuLink>
          </Link>
          <Link href={`/${provinsi}/${kabupaten}/distributor/profile`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} border ${area === 'distributor' ? 'border-white bg-background text-white' : ''}`}
            >
              Distributor
            </NavigationMenuLink>
          </Link>
          <Link href={`/${provinsi}/${kabupaten}/kios/profile`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} border ${area === 'kios' ? 'border-white bg-background text-white' : ''}`}
            >
              Kios
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuBar