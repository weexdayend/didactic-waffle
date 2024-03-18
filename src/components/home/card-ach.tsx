import React from 'react'

import { useTranslations } from 'next-intl';

const CardAch = () => {
  const ca = useTranslations('CardAch');
  
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:col-span-2 xl:grid-cols-2 xl:col-span-2 w-full h-full bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 rounded-3xl shadow-lg shadow-black/5 gap-6 px-6 py-6'>
      <div className='flex flex-col w-full h-full justify-center'>
        <h4 className='text-base text-white'>Realisasi F5</h4>
        <h1 className='text-3xl text-white font-bold'>8.000 <span className='text-sm font-normal'>(Ton)</span></h1>
        <div className='w-full bg-white px-4 py-1 rounded-full mt-4 drop-shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20'>
          <h6 className='text-sm text-white'>dari total target 8.000 Ton</h6>
        </div>
      </div>

      <div className='sm:block md:block lg:hidden xl:hidden h-0.5 w-full rounded-full bg-white/10' />
      
      <div className='flex flex-col w-full h-full justify-center'>
        <h4 className='text-base text-white'>Realisasi F6</h4>
        <h1 className='text-3xl text-white font-bold'>8.000 <span className='text-sm font-normal'>(Ton)</span></h1>
        <div className='w-full bg-white px-4 py-1 rounded-full mt-4 drop-shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20'>
          <h6 className='text-sm text-white'>dari total target 8.000 Ton</h6>
        </div>
      </div>
    </div>
  )
}

export default CardAch