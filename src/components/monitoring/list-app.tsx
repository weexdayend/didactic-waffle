"use client"

import axios from 'axios'
import React, { useState, useEffect } from 'react'

import {
  CheckCircle2Icon,
  LinkIcon,
  Link2OffIcon,
  XCircleIcon
} from 'lucide-react'

type Props = {}

function ListApp({}: Props) {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.greatjbb.com/app-relation');
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-2 px-4 pb-6'>
      {
        data && data.filter((tx: any) => tx.app_name !== 'Fermon').map((item: any, index: number ) => (
          <div key={index} className='border-2 rounded-xl xl:rounded-xl h-fit flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row px-3 py-3 gap-2'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-lg'>{item.app_name}</h1>
            </div>
            <div className='flex flex-row w-full justify-between items-center'>
              <h1 className='text-xs'>{item.app_status == '200' ? 'UP' : 'DOWN'}</h1>
              {
                item.app_status == '200' ? <CheckCircle2Icon className='w-6 h-6 text-green-500' /> : <XCircleIcon className='w-6 h-6 text-red-500' />
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ListApp