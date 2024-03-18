import React from 'react'

import { useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';

const CardDistribution = () => {
  const cd = useTranslations('CardDistribution');

  return (
    <div className='flex flex-col w-full h-full justify-center p-4'>
      <h1 className='text-2xl'>{cd('title')}</h1>
      <h4 className='text-sm dark:text-white/60'>{cd('description')}</h4>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 pt-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-base dark:text-white/80'>{cd('warehouse')}</h1>
          <h1 className='text-3xl font-bold'>2.000 <span className='text-base font-normal'>(Ton)</span></h1>
          <Progress value={20} className="w-full" primaryColor='bg-amber-500' secondaryColor='bg-amber-300/30' />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-base dark:text-white/80'>{cd('distributed')}</h1>
          <h1 className='text-3xl font-bold'>8.000 <span className='text-base font-normal'>(Ton)</span></h1>
          <Progress value={80} className="w-full" primaryColor='bg-green-500' secondaryColor='bg-green-300/30' />
        </div>
      </div>
    </div>
  )
}

export default CardDistribution