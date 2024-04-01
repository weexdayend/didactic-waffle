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
import { Button } from '../ui/button';

const Monitoring = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <div
            className='h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
          >
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
        <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-6 px-4 pb-6'>
          <div className='border-2 border-green-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6 gap-2'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-lg text-white'>WCM</h1>
            </div>
            <div className='flex flex-row w-full justify-between items-center px-4 py-2 rounded-full border border-green-500'>
              <h1 className='text-xs'>ON</h1>
              <CheckCircle2Icon className='w-4 h-4 text-green-500' />
            </div>
          </div>

          <div className='border-2 border-red-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6 gap-2'>
            <div className='flex flex-col'>
              <h1 className='text-lg text-white'>APG</h1>
            </div>
            <div className='flex flex-row w-full justify-between items-center px-4 py-2 rounded-full border border-red-500'>
              <h1 className='text-xs'>OFF</h1>
              <Link2OffIcon className='w-4 h-4 text-red-500' />
            </div>
          </div>

          <div className='border-2 border-green-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6 gap-2'>
            <div className='flex flex-col'>
              <h1 className='text-lg text-white'>Rekan</h1>
            </div>
            <div className='flex flex-row w-full justify-between items-center px-4 py-2 rounded-full border border-green-500'>
              <h1 className='text-xs'>ON</h1>
              <CheckCircle2Icon className='w-4 h-4 text-green-500' />
            </div>
          </div>

          <div className='border-2 border-green-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6 gap-2'>
            <div className='flex flex-col'>
              <h1 className='text-lg text-white'>Markisa</h1>
            </div>
            <div className='flex flex-row w-full justify-between items-center px-4 py-2 rounded-full border border-green-500'>
              <h1 className='text-xs'>ON</h1>
              <CheckCircle2Icon className='w-4 h-4 text-green-500' />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Monitoring;
