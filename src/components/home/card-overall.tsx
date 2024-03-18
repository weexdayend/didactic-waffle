import React from 'react'

import { useTranslations } from 'next-intl';

const CardOverall = () => {
  const cs = useTranslations('CardStock');
    
  return (
    <div className='flex flex-col w-full h-full justify-center p-4'>
      <h4 className='text-xl'>{cs('title')}</h4>
      <h1 className='font-bold text-4xl'>10.000 <span className='text-base font-normal'>(Ton)</span></h1>
      <h6 className='text-sm dark:text-white/60'>{cs('description')}</h6>
    </div>
  )
}

export default CardOverall