import React from 'react'

import { useTranslations } from 'next-intl';

const CardAch = () => {
  const ca = useTranslations('CardAch');
  
  return (
    <div className='flex flex-col w-full h-full justify-between gap-4 px-6 py-6'>
      <div className='flex flex-col'>
        <h1 className='text-2xl'>Distribusi</h1>
        <h4 className='text-sm dark:text-white/60'>Aliran distribusi pupuk.</h4>
      </div>
      <div className='flex flex-col w-full h-full'>
        <h4 className='text-xl pb-2'>F5</h4>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold '>1.250</h6>
            <h6 className='text-sm'>UREA</h6>
          </div>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold'>1.000</h6>
            <h6 className='text-sm'>ORGANIK</h6>
          </div>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold'>0.500</h6>
            <h6 className='text-sm'>NPK</h6>
          </div>
        </div>
      </div>
            
      <div className='flex flex-col w-full h-full'>
        <h4 className='text-xl pb-2'>F6</h4>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold '>1.000</h6>
            <h6 className='text-sm'>UREA</h6>
          </div>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold'>2.000</h6>
            <h6 className='text-sm'>ORGANIK</h6>
          </div>
          <div className='flex flex-col pb-4 border-b'>
            <h6 className='text-lg font-bold'>0.250</h6>
            <h6 className='text-sm'>NPK</h6>
          </div>
        </div>
      </div>

      <h6 className='text-sm'>Satuan dalam (Ton).</h6>
    </div>
  )
}

export default CardAch