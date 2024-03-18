'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Languages, MoonIcon, SunIcon } from 'lucide-react'
import { useRouter, usePathname } from '@/lib/navigation';

interface LanguageChangerProps {
  locale: string;
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({ locale }) => {

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: string) => {
    router.push(pathname, { locale: e });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Languages className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange('id')}>
          Indonesian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('en')}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChanger;
