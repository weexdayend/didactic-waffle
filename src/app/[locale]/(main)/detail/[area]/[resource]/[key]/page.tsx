import React from 'react'

import DetailProfile from '@/components/detail/detail-profile'
import DetailInformasi from '@/components/detail/detail-informasi'

async function Page({ params }: { params: { area: string, resource: string, key: number } }) {
  return (
    <div className='flex flex-col items-center pb-20 pt-14 px-4'>
      <div className='w-full h-fit flex flex-col gap-6 pt-12'>
        <DetailProfile />
        <DetailInformasi />
      </div>
    </div>
  )
}
export default Page