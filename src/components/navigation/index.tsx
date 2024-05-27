"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { ModeToggle } from '@/components/global/mode-toggle'

import Monitoring from '../monitoring'

import { signOut } from "next-auth/react"
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { PowerCircleIcon } from 'lucide-react'

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

  const handleLogout = async () => {
    await signOut()
  }

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
      <aside className="flex flex-row gap-2 items-center justify-between">
        {/* <LanguageChanger locale={pathname} /> */}
        <Monitoring />
        <ModeToggle />
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <PowerCircleIcon className="h-5 w-5 text-red-500" />
        </Button>
      </aside>
    </div>
  )
}

export default Navigation