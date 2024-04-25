'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import TitleCard from './card-title'
import CardFilter from './filter/filter-card'
import CumArea from './cum-area'
import CardPerson from './card-person'
import CardReport from './card-report'
import FilterDate from './filter/filter-date'
import NilDistribusi from './card-nil-distribusi'

type FilterProps = {
  provinsi: string | 'all',
  kabupaten: string | 'all',
  date: {
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
  }
}

const Index = () => {
  const [loadData, setLoadData] = useState(false)
  const [dataAccumulation, setDataAccumulation] = useState<any>([])
  const [dataReportF5, setDataReportF5] = useState<any>([])
  const [dataReportF6, setDataReportF6] = useState<any>([])
  const [error, setError] = useState<any>()

  const [filter, setFilter] = useState<FilterProps | null>(null)

  useEffect(() => {
    if (filter) {
      setLoadData(true); // Set loadData to true before fetching data
  
    // Define array of promises for API requests
    const promises = [
      axios.get(`/api/dev/area/accumulation/${filter.provinsi}/${filter.kabupaten}`),
      axios.get(`/api/dev/area/report/${filter.provinsi}/${filter.kabupaten}/${filter.date.startMonth}/${filter.date.startYear}/${filter.date.endMonth}/${filter.date.endYear}`),
    ];
  
    Promise.all(promises)
      .then(responses => {
        const [accumulation, report] = responses;
  
        if (!accumulation.data && !report.data) {
          throw new Error('No data received');
        }
  
        setDataAccumulation(accumulation.data.total_area);
        setDataReportF5(report.data.f5);
        setDataReportF6(report.data.f6);
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
        filter && dataAccumulation && (<CumArea provinsi={filter.provinsi} kabupaten={filter.kabupaten} data={dataAccumulation} />)
      }
      {
        filter && dataReportF5.length > 0 ? (
          <div className='w-full flex flex-col gap-4'>
            <CardReport data={dataReportF5} title='F5' />
          </div>
        ) : (
          <div className='w-full flex flex-col gap-4'>
            <NilDistribusi title='F5' />
          </div>
        )
      }
      {
        filter && dataReportF5.length > 0 ? (
          <div className='w-full flex flex-col gap-4'>
            <CardReport data={dataReportF6} title='F6' />
          </div> 
        ) : (
          <div className='w-full flex flex-col gap-4'>
            <NilDistribusi title='F6' />
          </div>
        )
      }
      {
        filter && filter.kabupaten !== 'all' && (
          <CardPerson />
        )
      }
    </div>
  )
}

export default Index