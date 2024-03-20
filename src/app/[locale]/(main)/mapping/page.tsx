import React from 'react'
import Map from '@/components/map';

import { useTranslations } from 'next-intl';

import { SelectDemo } from '@/components/mapping/combobox';

const Page = () => {
  const t = useTranslations('Home');

  return (
    <div className='flex flex-col items-center pb-20 pt-14'>
      <div className='z-[40]'>
        <Map />
      </div>
      <div className='absolute top-[70vh] z-[45] flex flex-col px-6 py-6 w-full h-fit rounded-t-3xl bg-background'>
        <SelectDemo />
      </div>
    </div>
  )
}

export default Page