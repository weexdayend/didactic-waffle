"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { ModeToggle } from '@/components/global/mode-toggle'
import { MobileMenu } from '@/components/global/mobile-menu'

import { HelpMenu } from '../global/help-menu'

import Monitoring from '../monitoring'
import { useTheme } from 'next-themes'

const Navigation = () => {
  const [source, setSource] = useState<string>('')
  const [pathname, setPathname] = useState<string>('en')

  const { theme } = useTheme();

  useEffect(() => {
    const pathnameSegments = window.location.pathname.split('/');
    setPathname(pathnameSegments[1])
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      setSource('/assets/icons/logo-pi-putih.svg')
    } else {
      setSource('/assets/icons/logo-pi-warna.svg')
    }
  }, [theme])

  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-50 bg-background">
      <aside className="flex items-center gap-2">
        <Image
          src={source}
          width={80}
          height={40}
          alt="plur logo"
          layout="fixed"
        />
        {/* <span className="text-xl font-bold"> Fermon</span> */}
      </aside>
      <aside className="flex gap-2 items-center">
        {/* <LanguageChanger locale={pathname} /> */}
        <Monitoring />
        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation