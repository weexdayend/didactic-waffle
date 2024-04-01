import React from 'react'

import { useTranslations } from 'next-intl';

const CardAch = () => {
  const ca = useTranslations('CardAch');
  
  return (
    <div className='w-full grid grid-cols-1 md:col-span-4 lg:col-span-4 xl:col-span-4 gap-6'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4'>
        <div className='flex flex-col w-full h-full'>
          <div className='flex flex-col'>
            <h4 className='text-xl'>UREA</h4>
            <h4 className='text-sm text-zinc-800/70 dark:text-white/70 pb-2'>Harga tebus dan jual pupuk.</h4>
          </div>
          <div className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2'>
            <div className='flex flex-col w-full border rounded-xl p-3'>
              <h6 className='text-base pb-2'>Tebus</h6>
              <div className='flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row border-b-2 border-amber-500'>
                  <h6 className='text-sm font-bold'>Distributor &rarr; Produsen</h6>
                </div>
                <div className='flex flex-row border-b-2 border-indigo-500'>
                  <h6 className='text-sm font-bold'>2.782.000</h6>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full border rounded-xl p-3'>
              <h6 className='text-base pb-2'>Jual</h6>
              <div className='flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row border-b-2 border-amber-500'>
                  <h6 className='text-sm font-bold'>Distributor &rarr; Kios</h6>
                </div>
                <div className='flex flex-row border-b-2 border-indigo-500'>
                  <h6 className='text-sm font-bold'>2.782.000</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
              
        <div className='flex flex-col w-full h-full'>
          <div className='flex flex-col'>
            <h4 className='text-xl'>NPK</h4>
            <h4 className='text-sm text-zinc-800/70 dark:text-white/70 pb-2'>Harga tebus dan jual pupuk.</h4>
          </div>
          <div className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2'>
            <div className='flex flex-col w-full border rounded-xl p-3'>
              <h6 className='text-base pb-2'>Tebus</h6>
              <div className='flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row border-b-2 border-amber-500'>
                  <h6 className='text-sm font-bold'>Distributor &rarr; Produsen</h6>
                </div>
                <div className='flex flex-row border-b-2 border-indigo-500'>
                  <h6 className='text-sm font-bold'>2.782.000</h6>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full border rounded-xl p-3'>
              <h6 className='text-base pb-2'>Jual</h6>
              <div className='flex flex-row w-full items-center justify-between'>
                <div className='flex flex-row border-b-2 border-amber-500'>
                  <h6 className='text-sm font-bold'>Distributor &rarr; Kios</h6>
                </div>
                <div className='flex flex-row border-b-2 border-indigo-500'>
                  <h6 className='text-sm font-bold'>2.782.000</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full items-center justify-center gap-8'>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-6 h-3 rounded-full bg-indigo-500' />
          <h6 className='text-sm'>(Rp)</h6>
        </div>
      </div>
    </div>
  )
}

export default CardAch