"use client"

import React, { useState } from 'react'
import Map from '@/components/map'
import Image from 'next/image'

import { SelectDemo } from '@/components/mapping/select-filter'

import aritports from '@/components/map/dummy.json'
import ComboboxDemo from '@/components/mapping/combobox'

const Page = () => {
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const handleSelected = (value: [number, number]) => {
    setSelected(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex flex-col items-center pb-20 pt-20'>
      <div className='absolute w-full px-6 pt-4 z-50 top-20'>
        <ComboboxDemo handle={handleSelected} />
      </div>
      <div className='z-[40]'>
        <Map selectedPosition={selected} />
      </div>
      <div className='absolute top-[70vh] z-[45] flex flex-col px-6 py-6 w-full h-fit rounded-t-3xl bg-background gap-6'>
        <SelectDemo />
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {aritports.map((airport, index) => {
            return(
              <div 
                key={index} 
                className='flex flex-row px-6 py-6 border rounded-3xl gap-4 hover:cursor-pointer hover:border-blue-500'
                onClick={() => handleSelected([Number(airport.lat), Number(airport.lon)])}
              >
                <div className='px-2 py-2 h-fit w-fit bg-blue-100 rounded-full'>
                  <Image
                    src={'/assets/icons/warehouses.png'}
                    height={16}
                    width={16}
                    alt='warehouses icon'
                  />
                </div>
                <div className='flex w-full h-full flex-col gap-4'>
                  <div className='flex flex-col'>
                    <h1 className='text-base font-bold uppercase'>{airport.name}</h1>
                    <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Distributor</h1>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col w-full h-full'>
                      <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Alokasi</h1>
                      <h1 className='text-base font-bold uppercase'>2.250</h1>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                      <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Realisasi</h1>
                      <h1 className='text-base font-bold uppercase'>0.562</h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Page