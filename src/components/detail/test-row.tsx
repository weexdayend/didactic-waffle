'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'

const TestRow = ({ params }: { params: { area: string, resource: string } }) => {
  const [loadData, setLoadData] = useState(false) // Set initial state to true

  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    setLoadData(true); // Set loadData to true before fetching data
    axios.get(`/api/dev/area/detail/${params.area}/${params.resource}`) // Make a POST request with the area parameter
      .then(response => {
        if (!response.data) {
          throw new Error('No data received');
        }
        setData(response.data);
      })
      .catch(error => {
        setError(error.response.data.error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadData(false);
        }, 5000);
      });
  }, [params.area]); 

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <Skeleton key={index} className="h-28 w-full rounded-3xl" />
  ));

  if (loadData) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data received</div>;
  }
    
  return (
    <div className='w-full h-fit grid grid-cols-1 gap-6'>
      {
        data.map((item: any, index: number) => (
          <div 
            key={index} 
            className='flex flex-row px-6 py-6 border rounded-3xl gap-4 hover:cursor-pointer hover:border-blue-500'
          >
            <div>
              <Image
                src={'/assets/icons/warehouses.png'}
                height={42}
                width={42}
                alt='warehouses icon'
              />
            </div>
            <div className='flex w-full h-full flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <h1 className='text-base font-bold uppercase'>{item.nama}</h1>
                {
                  params.area !== 'provinsi' && params.area !== 'kotakab' && params.area !== 'kecamatan' && (
                    <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>{ item.alamat ? item.alamat : `Alamat ${params.area} belum di input.`}</h1>
                  )
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TestRow
