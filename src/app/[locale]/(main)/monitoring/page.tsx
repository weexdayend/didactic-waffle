import React from 'react'
import { useTranslations } from 'next-intl';
import Map from '@/components/map';

const Page = () => {
  const t = useTranslations('Home');

  return (
    <div className='flex flex-col items-center pt-20'>
      <div className='z-[40]'>
        <Map />
      </div>
      <div className='absolute top-[70vh] z-[45] flex flex-col px-6 py-6 w-screen h-fit min-h-screen rounded-t-3xl bg-background'>
        <h1>Initialize Design</h1>
      </div>
    </div>
  )
}

export default Page