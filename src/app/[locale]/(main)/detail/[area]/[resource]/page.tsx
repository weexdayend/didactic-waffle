import React from 'react'

import TestRow from '@/components/detail/test-row'

async function Page({ params }: { params: { area: string, resource: string } }) {

  let area = params.area || '';
  area = area.charAt(0).toUpperCase() + area.slice(1);

  return (
    <div className='flex flex-col items-center pb-20 pt-14 px-4'>
      <div className='w-full h-fit pt-12 mb-6'>
        <h1>Daftar {area}</h1>
      </div>
      <TestRow params={params} />
    </div>
  )
}

export default Page