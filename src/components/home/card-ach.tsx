import React from 'react'

import { useTranslations } from 'next-intl';

const CardAch = () => {
  const ca = useTranslations('CardAch');
  
  return (
    <div className='flex flex-col w-full h-full bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 rounded-3xl shadow-lg shadow-black/5 gap-6 px-6 py-6'>
      <div className='flex flex-col w-full h-full justify-center'>
        <h4 className='text-xl text-white'>Realisasi F5</h4>
        <div className='grid grid-cols-3 gap-4'>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>2.000</h6>
            <h6 className='text-sm text-white'>UREA</h6>
          </div>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>2.000</h6>
            <h6 className='text-sm text-white'>ORGANIK</h6>
          </div>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>1.000</h6>
            <h6 className='text-sm text-white'>NPK</h6>
          </div>
        </div>
      </div>

      <div className='sm:block md:block lg:hidden xl:hidden h-0.5 w-full rounded-full bg-white/10' />
      
      <div className='flex flex-col w-full h-full justify-center'>
        <h4 className='text-xl text-white'>Realisasi F6</h4>
        <div className='grid grid-cols-3 gap-4'>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>2.000</h6>
            <h6 className='text-sm text-white'>UREA</h6>
          </div>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>2.000</h6>
            <h6 className='text-sm text-white'>ORGANIK</h6>
          </div>
          <div className='py-4 border-b-2 border-white'>
            <h6 className='text-lg font-bold text-white'>1.000</h6>
            <h6 className='text-sm text-white'>NPK</h6>
          </div>
        </div>
      </div>

      <h6 className='text-sm text-white/70 mt-4'>Satuan dalam (Ton).</h6>
    </div>
  )
}

export default CardAch