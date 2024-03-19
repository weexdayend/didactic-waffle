import React from 'react'

import CardOverall from '@/components/home/card-overall';
import CardAch from '@/components/home/card-ach';
import CardDistribution from '@/components/home/card-distribution';

const Page = () => {

  return (
    <div className='flex flex-col items-center py-20'>
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4'>
        <CardOverall />
        <div className='flex flex-col gap-4 w-full h-full'>
          <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-2xl xl:rounded-3xl h-full flex flex-row items-center justify-between px-6 py-4'>
            <h1 className='text-white'>Distributor</h1>
            <h1 className='text-xl font-bold text-white'>17</h1>
          </div>

          <div className='bg-gradient-to-br from-blue-500 via-blue-400 to-purple-500 rounded-2xl xl:rounded-3xl h-full flex flex-row items-center justify-between px-6 py-4'>
            <h1 className='text-white'>Kios</h1>
            <h1 className='text-xl font-bold text-white'>901</h1>
          </div>

          <div className='bg-gradient-to-br from-purple-500 via-blue-400 to-indigo-500 rounded-2xl xl:rounded-3xl h-full flex flex-row items-center justify-between px-6 py-4'>
            <h1 className='text-white'>Gudang Lini III</h1>
            <h1 className='text-xl font-bold text-white'>5</h1>
          </div>
        </div>
        <CardAch />
        <CardDistribution />
      </div>
    </div>
  )
}

export default Page