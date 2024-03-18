import React from 'react'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Page = () => {
  const cs = useTranslations('CardStock');
  const ca = useTranslations('CardAch');

  return (
    <div className='flex flex-col items-center pt-[15vh]'>
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 px-4'>
        <div className='flex flex-col w-full rounded-xl shadow-lg shadow-black/5 p-4'>
          <h1 className='text-xl'>{cs('title')}</h1>
          <h1 className='font-bold text-5xl'>10,000 ton</h1>
        </div>
        <div className='flex flex-col w-full bg-zinc-800 rounded-xl shadow-lg shadow-black/5 dark:bg-white p-4'>
          <h4 className='text-lg text-white/70 dark:text-gray-600'>{ca('realization')}</h4>
          <h1 className='text-3xl text-white font-bold dark:text-gray-800'>8,000 ton</h1>
          <h6 className='text-sm text-white/70 dark:text-gray-700'><span className='text-green-500 font-bold'>12.3%</span> {ca('notes')}</h6>
          
          <div className='h-0.5 w-full rounded-full bg-white/10 dark:bg-gray-200 my-4' />

          <h4 className='text-lg text-white/70 dark:text-gray-600'>{ca('target')}</h4>
          <h1 className='text-3xl text-white font-bold dark:text-gray-800'>8,000 ton</h1>
          <h6 className='text-sm text-white/70 dark:text-gray-700'><span className='text-green-500 font-bold'>12.3%</span> {ca('notes')}</h6>
        </div>
        <div className='flex flex-col w-full rounded-xl shadow-lg shadow-black/5 p-4'>
          <h1 className='text-2xl'>Distribution</h1>
          <h4 className='text-sm dark:text-white/60'>Stream of distribution fertilizer</h4>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 pt-6'>
            <div className='flex flex-col justify-center gap-2'>
              <h1 className='text-base dark:text-white/80'>in Warehouse</h1>
              <h1 className='text-3xl font-bold'>2,000 ton</h1>
              <Progress value={20} className="w-full" />
            </div>
            <div className='flex flex-col justify-center gap-2'>
              <h1 className='text-base dark:text-white/80'>Distributed</h1>
              <h1 className='text-3xl font-bold'>8,000 ton</h1>
              <Progress value={80} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page