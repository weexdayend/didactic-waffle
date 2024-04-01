'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'

const CumArea = () => {
  const [loadData, setLoadData] = useState(false) // Set initial state to true

  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    setLoadData(true); // Set loadData to true before fetching data
    axios.get('/api/dev/area/accumulation')
      .then(response => {
        if (!response.data) {
          throw new Error('No data received');
        }
        setData(response.data.total_area);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadData(false);
        }, 5000);
      });
  }, []);

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <Skeleton key={index} className="h-28 w-full rounded-3xl" />
  ));
    
  return (
    <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-6'>
      {
        loadData ? (
          <>
            {skeletonCards}
          </>
        ) : (
          data && data.map((value: any, index: number) => (
            <Link key={index} href={`/detail/${value.key}/${value.resource}`}>
              <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
                <h1 className='text-sm text-white'>{value.name}</h1>
                <h1 className='text-3xl font-bold text-white'>{value.total}</h1>
              </div>
            </Link>
          ))
        )
      }
    </div>
  )
}

export default CumArea
