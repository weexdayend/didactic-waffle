"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { ModeToggle } from '@/components/global/mode-toggle'
import { MobileMenu } from '@/components/global/mobile-menu'

import { HelpMenu } from '../global/help-menu'

import Monitoring from '../monitoring'

const Navigation = () => {

  const [pathname, setPathname] = useState<string>('en')

  useEffect(() => {
    const pathnameSegments = window.location.pathname.split('/');
    setPathname(pathnameSegments[1])
  }, [])

  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-50 bg-background">
      <aside className="flex items-center gap-2">
        {/* <Image
          src={'./assets/syncronice-logo-box.svg'}
          width={40}
          height={40}
          alt="plur logo"
        /> */}
        <span className="text-xl font-bold"> Fermon</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'/home'}>Home</Link>
          <Link href={'/mapping'}>Mapping</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {/* <LanguageChanger locale={pathname} /> */}
        <HelpMenu />
        <Monitoring />
        <div className='sm:block md:hidden lg:hidden xl:hidden'>
          <MobileMenu />
        </div>
      </aside>
    </div>
  )
}

export default Navigation