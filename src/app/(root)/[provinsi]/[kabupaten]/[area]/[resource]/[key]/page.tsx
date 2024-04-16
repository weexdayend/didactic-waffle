import Information from '@/components/detail/information'
import React from 'react'

import Link from 'next/link'

import {
  ArrowLeftIcon
} from 'lucide-react'

async function Page(
  { params }: { params: {
    provinsi: string,
    kabupaten: string,
    area: string, 
    resource: string, 
    key: string 
  } }) {
  return (
    <div className='flex flex-col items-center pb-20 pt-14 px-4'>
      <div className='w-full h-fit flex flex-col gap-6 pt-12'>
        <Link href={`/${params.provinsi}/${params.kabupaten}/${params.area}/${params.resource}/`} className='w-fit h-fit'>
          <div className='p-2 rounded-full w-fit h-fit border'>
            <ArrowLeftIcon className='h-6 w-6' />
          </div>
        </Link>
        <Information id={params.key} kategori={params.area} />
      </div>
    </div>
  )
}
export default Page