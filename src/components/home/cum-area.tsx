'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  provinsi: string,
  kabupaten: string,
  data: any
}

const CumArea = ({ provinsi, kabupaten, data }: Props) => {    
  return (
    <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-6'>
      {
        data && data.map((value: any, index: number) => (
          <Link key={index} href={`/${provinsi}/${kabupaten}/${value.key}/${value.resource}`}>
            <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
              <h1 className='text-sm text-white'>{value.name}</h1>
              <h1 className='text-3xl font-bold text-white'>{value.total}</h1>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default CumArea
