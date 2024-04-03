import React from 'react'

import Image from 'next/image'



import TitleCard from '@/components/home/card-title';

import CardOverall from '@/components/home/card-overall';
import CardAch from '@/components/home/card-ach';
import Example from '@/components/home/charts/line-chart';
import CumArea from '@/components/home/cum-area';

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
      <div className='flex flex-col items-center justify-center w-full px-4 py-4 my-6 gap-6'>
        <TitleCard />
      </div>
      <div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4'>  
        <CumArea />
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