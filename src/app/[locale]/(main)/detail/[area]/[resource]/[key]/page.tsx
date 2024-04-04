import Information from '@/components/detail/information'
import React from 'react'


async function Page({ params }: { params: { area: string, resource: string, key: string } }) {
  return (
    <div className='flex flex-col items-center pb-20 pt-14 px-4'>
      <div className='w-full h-fit flex flex-col gap-6 pt-12'>
        <Information id={params.key} kategori={params.area}  />
      </div>
    </div>
  )
}
export default Page