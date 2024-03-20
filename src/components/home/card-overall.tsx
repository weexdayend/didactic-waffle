import React from 'react'

import { useTranslations } from 'next-intl';

const CardOverall = () => {
  const cs = useTranslations('CardStock');
    
  return (
    <div className='grid w-full h-full md:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 px-6 py-6 rounded-3xl'>
      <div className='flex flex-col h-full w-full justify-between gap-2'>
        <div className='w-full h-fit'>
          <h4 className='text-xl text-white'>{cs('title')}</h4>
          <h1 className='font-bold text-4xl text-white'>10.000 <span className='text-base font-normal'>(Ton)</span></h1>
          <h6 className='text-sm text-white mt-2'>Akumulasi data stok awal dari distributor dan kios.</h6>
        </div>
        <div className='grid grid-cols-3 gap-4 items-center justify-between my-4'>
          <div className='flex flex-col border-b border-white pb-2'>
            <h1 className='text-lg font-bold text-white'>4.000</h1>
            <h1 className='text-sm text-white'>UREA</h1>
          </div>
          <div className='w-full h-full border-b border-white pb-2'>
            <h1 className='text-lg font-bold text-white'>4.000</h1>
            <h1 className='text-sm text-white'>NPK</h1>
          </div>
          <div className='w-full h-full border-b border-white pb-2'>
            <h1 className='text-lg font-bold text-white'>2.000</h1>
            <h1 className='text-sm text-white'>KHUSUS</h1>
          </div>
        </div>
        <h6 className='text-sm text-white/70 mt-4'>Satuan dalam (Ton).</h6>
      </div>
    </div>
  )
}

export default CardOverall