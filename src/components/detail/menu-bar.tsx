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
  area: string
}

const MenuBar = ({ area }: ParamsProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className='flex flex-row gap-2'>
          <Link href={`/id/detail/gudang/profile`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} border ${area === 'gudang' ? 'border-white bg-background text-white' : ''}`}
            >
              Gudang
            </NavigationMenuLink>
          </Link>
          <Link href={`/id/detail/distributor/profile`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} border ${area === 'distributor' ? 'border-white bg-background text-white' : ''}`}
            >
              Distributor
            </NavigationMenuLink>
          </Link>
          <Link href={`/id/detail/kios/profile`} legacyBehavior passHref>
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