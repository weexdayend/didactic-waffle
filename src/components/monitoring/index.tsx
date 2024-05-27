import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  AlertCircleIcon,
  CheckCircle2Icon,
  LinkIcon,
  Link2OffIcon
} from 'lucide-react'
import ListApp from './list-app';

const Monitoring = () => {
  return (
    <Drawer preventScrollRestoration={false}>
      <DrawerTrigger>
        <div
          className='relative h-10 w-10 border border-red-500 bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
        >
          <div className='absolute bottom-1 right-1 z-50 p-1 bg-red-500 rounded-full' />
          <LinkIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LinkIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Monitoring</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Monitoring Aplikasi</DrawerTitle>
          <DrawerDescription>Daftar status aplikasi pupuk indonesia.</DrawerDescription>
        </DrawerHeader>
        <ListApp />
      </DrawerContent>
    </Drawer>
  );
};

export default Monitoring;
