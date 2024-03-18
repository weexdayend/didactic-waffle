import React from 'react'

import CardOverall from '@/components/home/card-overall';
import CardAch from '@/components/home/card-ach';
import CardDistribution from '@/components/home/card-distribution';

const Page = () => {

  return (
    <div className='flex flex-col items-center py-20'>
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4'>
        <CardOverall />
        <CardAch />
        <div className='flex flex-col gap-4 w-full h-full'>
          <div className='bg-indigo-500 rounded-2xl h-full flex flex-row items-center justify-between px-5 py-4'>
            <h1 className='text-white'>Distributor</h1>
            <h1 className='text-xl font-bold text-white'>17</h1>
          </div>

          <div className='bg-blue-500 rounded-2xl h-full flex flex-row items-center justify-between px-5 py-4'>
            <h1 className='text-white'>Kios</h1>
            <h1 className='text-xl font-bold text-white'>901</h1>
          </div>

          <div className='bg-purple-500 rounded-2xl h-full flex flex-row items-center justify-between px-5 py-4'>
            <h1 className='text-white'>Gudang Lini III</h1>
            <h1 className='text-xl font-bold text-white'>5</h1>
          </div>
        </div>
        <CardDistribution />
      </div>
    </div>
  )
}

export default Page