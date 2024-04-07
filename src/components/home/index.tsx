'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import TitleCard from './card-title'
import CardFilter from './filter/filter-card'
import CumArea from './cum-area'
import CardPerson from './card-person'

type FilterProps = {
  provinsi: string | 'all',
  kabupaten: string | 'all',
}

const Index = () => {
  const [loadData, setLoadData] = useState(false)
  const [datas, setDatas] = useState<any>([])
  const [error, setError] = useState<any>()

  const [filter, setFilter] = useState<FilterProps>({
    provinsi: 'all',
    kabupaten: 'all'
  })

  useEffect(() => {
    if (filter) {
      setLoadData(true); // Set loadData to true before fetching data
  
    // Define array of promises for API requests
    const promises = [
      axios.get(`/api/dev/area/accumulation/${filter.provinsi}/${filter.kabupaten}`)
    ];
  
    Promise.all(promises)
      .then(responses => {
        const [res] = responses;
  
        if (!res.data) {
          throw new Error('No data received');
        }
  
        setDatas(res.data.total_area);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadData(false);
        }, 2500);
      });
    }
  }, [filter])

  const handleFilterChange = (value: FilterProps) => {
    setFilter(value)
  }

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 py-4 my-6 gap-4'>
      <TitleCard />
      <CardFilter handleChange={handleFilterChange} /> 
      {
        datas && (<CumArea provinsi={filter.provinsi} kabupaten={filter.kabupaten} data={datas} />)
      }
      {
        filter.kabupaten !== 'all' && (
          <CardPerson />
        )
      }
    </div>
  )
}

export default Index