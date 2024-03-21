import React from 'react'
import Map from '@/components/map'
import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { SelectDemo } from '@/components/mapping/combobox'

import aritports from '@/components/map/dummy.json'

const Page = () => {
  const t = useTranslations('Home');

  return (
    <div className='flex flex-col items-center pb-20 pt-20'>
      <div className='z-[40]'>
        <Map />
      </div>
      <div className='absolute top-[70vh] z-[45] flex flex-col px-6 py-6 w-full h-fit rounded-t-3xl bg-background gap-6'>
        <SelectDemo />
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {aritports.map((airport, index) => {
            return(
              <div key={index} className='flex flex-row px-6 py-6 border rounded-3xl gap-4'>
                <div className='px-2 py-2 h-fit w-fit bg-blue-100 rounded-full'>
                  <Image
                    src={'/assets/icons/warehouses.png'}
                    height={16}
                    width={16}
                    alt='warehouses icon'
                  />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-base font-bold uppercase'>{airport.name}</h1>
                  <h1 className='text-xs text-opacity-70'>Distributor</h1>
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