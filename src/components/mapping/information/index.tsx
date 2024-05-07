'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import CardFilter from '@/components/mapping/information/card-filter'

type FilterProps = {
  provinsi: string,
  kabupaten: string,
  tahun: string,
}

type Props = {
  handle: (profile: any) => void;
}

function Index({ handle }: Props) {
  const [loadData, setLoadData] = useState(false)
  const [list, setList] = useState<any>([])
  const [error, setError] = useState<any>()
  const [filter, setFilter] = useState<FilterProps | null>(null)

  useEffect(() => {
    if (filter) {
      setLoadData(true); // Set loadData to true before fetching data
  
      // Define array of promises for API requests
      const promises = [
        axios.get(`/api/dev/mapping/${filter.provinsi}/${filter.kabupaten}/${filter.tahun}`),
      ];
    
      Promise.all(promises)
        .then(responses => {
          const [list, report] = responses;
    
          if (!list.data && !report.data) {
            throw new Error('No data received');
          }
    
          setList(list.data);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoadData(false);
        });
    }
  }, [filter])

  useEffect(() => {
    if (list) {
      handle(list)
    }
  }, [list])

  const handleFilterChange = (value: FilterProps) => {
    setFilter(value)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <CardFilter handleChange={handleFilterChange} loading={loadData} />
    </div>
  )
}

export default Index