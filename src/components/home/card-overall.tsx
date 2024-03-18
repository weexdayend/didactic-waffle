import React from 'react'

import { useTranslations } from 'next-intl';

const CardOverall = () => {
  const cs = useTranslations('CardStock');
    
  return (
    <div className='grid w-full h-full p-4'>
      <div className='flex flex-col h-full w-full justify-center gap-2'>
        <h4 className='text-xl'>{cs('title')}</h4>
        <h1 className='font-bold text-4xl'>10.000 <span className='text-base font-normal'>(Ton)</span></h1>
        <h6 className='text-sm dark:text-white/60'>{cs('description')}</h6>
      </div>
    </div>
  )
}

export default CardOverall