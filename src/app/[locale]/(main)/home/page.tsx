import React from 'react'

import CardOverall from '@/components/home/card-overall';
import CardAch from '@/components/home/card-ach';

import Image from 'next/image'
import Example from '@/components/home/charts/line-chart';

const Page = () => {

  return (
    <div className='flex flex-col items-center pb-20 pt-14'>
      <Image
        src={'/assets/image/fertilizer-home.jpg'}
        alt="banner image"
        height={1200}
        width={1200}
        className="md:hidden lg:hidden xl:hidden rounded-bl-3xl rounded-br-3xl"
      />
      <div className='flex items-center justify-center w-full px-4 py-4 my-6'>
        <div className='px-6 py-4 w-full rounded-2xl border'>
          <h1 className='text-xs'>Last updated 20 Maret 2024, 03.39 WIB.</h1>
        </div>
      </div>
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4'>  
        <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-6'>
          <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
            <h1 className='text-sm text-white'>Kecamatan</h1>
            <h1 className='text-3xl font-bold text-white'>30</h1>
          </div>
          
          <div className='bg-gradient-to-br from-purple-500 via-blue-400 to-indigo-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
            <h1 className='text-sm text-white'>Gd. Lini III</h1>
            <h1 className='text-3xl font-bold text-white'>3</h1>
          </div>

          <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
            <h1 className='text-sm text-white'>Distributor</h1>
            <h1 className='text-3xl font-bold text-white'>17</h1>
          </div>

          <div className='bg-gradient-to-br from-blue-500 via-blue-400 to-purple-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
            <h1 className='text-sm text-white'>Kios</h1>
            <h1 className='text-3xl font-bold text-white'>400</h1>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 xl:grid-cols-4 lg:col-span-4 xl:col-span-4 gap-6'>
          <CardOverall />
          <div className='w-full grid md:col-span-2 lg:col-span-2 xl:col-span-2 gap-6'>
            <Example title='Alokasi' colorAlokasi='#60a5fa' colorRealisasi='#4ade80' alokasi={[800, 1000, 500]} realisasi={[800, 1000, 500]} />
          </div>
        </div>
        <CardAch />
      </div>
    </div>
  )
}

export default Page