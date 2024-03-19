import React from 'react'

import { useTranslations } from 'next-intl';

const CardOverall = () => {
  const cs = useTranslations('CardStock');
    
  return (
    <div className='grid w-full h-full bg-zinc-900/90 dark:bg-white px-6 py-6 rounded-3xl'>
      <div className='flex flex-col h-full w-full justify-center gap-2'>
        <div className='w-full h-fit'>
          <h4 className='text-xl text-white dark:text-zinc-900'>{cs('title')}</h4>
          <h1 className='font-bold text-4xl text-white dark:text-zinc-900'>10.000 <span className='text-base font-normal'>(Ton)</span></h1>
          <h6 className='text-sm text-white dark:text-zinc-900 mt-4'>{cs('description')}</h6>
        </div>
        <div className='grid grid-cols-3 gap-4 items-center justify-between my-4'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-bold text-white dark:text-zinc-900'>4.000</h1>
            <h1 className='text-sm text-white dark:text-zinc-900'>UREA</h1>
          </div>
          <div className='w-full h-full'>
            <h1 className='text-lg font-bold text-white dark:text-zinc-900'>4.000</h1>
            <h1 className='text-sm text-white dark:text-zinc-900'>ORGANIK</h1>
          </div>
          <div className='w-full h-full'>
            <h1 className='text-lg font-bold text-white dark:text-zinc-900'>2.000</h1>
            <h1 className='text-sm text-white dark:text-zinc-900'>NPK</h1>
          </div>
        </div>
        <h6 className='text-sm text-white/70 dark:text-zinc-900/70 mt-4'>Satuan dalam (Ton).</h6>
      </div>
    </div>
  )
}

export default CardOverall