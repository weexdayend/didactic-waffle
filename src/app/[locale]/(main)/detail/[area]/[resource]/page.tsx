import React from 'react'

import RowProfile from '@/components/detail/row-profile';

async function Page({ params }: { params: { area: string, resource: string, page: number } }) {

  let area = params.area || '';
  area = area.charAt(0).toUpperCase() + area.slice(1);

  return (
    <div className='flex flex-col items-center pb-20 pt-14 px-4'>
      <div className='w-full h-fit pt-12 mb-6'>
        <RowProfile params={params} />
      </div>
    </div>
  )
}

export default Page