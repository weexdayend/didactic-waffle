'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import TitleCard from './card-title'
import CardFilter from './filter/filter-card'
import CumArea from './cum-area'
import CardPerson from './card-person'
import CardReport from './card-report'
import FilterDate from './filter/filter-date'

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
      {/* <div className='w-full grid grid-cols-1 md:col-span-4 lg:col-span-4 xl:col-span-4 gap-6'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4'>
          <div className='flex flex-col w-full h-full'>
            <div className='flex flex-col'>
              <h4 className='text-xl'>UREA</h4>
              <h4 className='text-sm text-zinc-800/70 dark:text-white/70 pb-2'>Harga tebus dan jual pupuk.</h4>
            </div>
            <div className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2'>
              <div className='flex flex-col w-full border rounded-xl p-3'>
                <h6 className='text-base pb-2'>Tebus</h6>
                <div className='flex flex-row w-full items-center justify-between'>
                  <div className='flex flex-row border-b-2 border-amber-500'>
                    <h6 className='text-sm font-bold'>Distributor &rarr; Produsen</h6>
                  </div>
                  <div className='flex flex-row border-b-2 border-indigo-500'>
                    <h6 className='text-sm font-bold'>2.782.000</h6>
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full border rounded-xl p-3'>
                <h6 className='text-base pb-2'>Jual</h6>
                <div className='flex flex-row w-full items-center justify-between'>
                  <div className='flex flex-row border-b-2 border-amber-500'>
                    <h6 className='text-sm font-bold'>Distributor &rarr; Kios</h6>
                  </div>
                  <div className='flex flex-row border-b-2 border-indigo-500'>
                    <h6 className='text-sm font-bold'>2.782.000</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
                
          <div className='flex flex-col w-full h-full'>
            <div className='flex flex-col'>
              <h4 className='text-xl'>NPK</h4>
              <h4 className='text-sm text-zinc-800/70 dark:text-white/70 pb-2'>Harga tebus dan jual pupuk.</h4>
            </div>
            <div className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2'>
              <div className='flex flex-col w-full border rounded-xl p-3'>
                <h6 className='text-base pb-2'>Tebus</h6>
                <div className='flex flex-row w-full items-center justify-between'>
                  <div className='flex flex-row border-b-2 border-amber-500'>
                    <h6 className='text-sm font-bold'>Distributor &rarr; Produsen</h6>
                  </div>
                  <div className='flex flex-row border-b-2 border-indigo-500'>
                    <h6 className='text-sm font-bold'>2.782.000</h6>
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full border rounded-xl p-3'>
                <h6 className='text-base pb-2'>Jual</h6>
                <div className='flex flex-row w-full items-center justify-between'>
                  <div className='flex flex-row border-b-2 border-amber-500'>
                    <h6 className='text-sm font-bold'>Distributor &rarr; Kios</h6>
                  </div>
                  <div className='flex flex-row border-b-2 border-indigo-500'>
                    <h6 className='text-sm font-bold'>2.782.000</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row w-full items-center justify-center gap-8'>
          <div className='flex flex-row items-center gap-2'>
            <div className='w-6 h-3 rounded-full bg-indigo-500' />
            <h6 className='text-sm'>(Rp)</h6>
          </div>
        </div>
      </div> */}
      {
        filter && dataReportF5 && (
          <div className='w-full flex flex-col gap-4'>
            <CardReport data={dataReportF5} title='F5' />
          </div>
        )
      }
      {
        filter && dataReportF6 && (
          <div className='w-full flex flex-col gap-4'>
            <CardReport data={dataReportF6} title='F6' />
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