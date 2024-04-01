'use client'

import * as React from 'react'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { PhoneIcon } from 'lucide-react'

export function HelpMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
        <PhoneIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <PhoneIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Mobile menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Whatsapp
        </DropdownMenuItem>
        <DropdownMenuItem>
          Panggilan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}