"use client"

import dynamic from "next/dynamic"

import React, { useEffect, useState } from 'react'
import { useMemo } from "react";

import Image from 'next/image'

import MyListbox from '@/components/mapping/select-filter'
import ComboboxDemo from '@/components/mapping/combobox'

import axios from 'axios'

import {
  ArrowLeftIcon,
  ArrowRightIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"

import Information from "@/components/detail/information"
import Index from '@/components/mapping/information'

const pageSize = 10

const Page = () => {
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null)
  
  const [information, setInformation] = useState<any>(null)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [resetLocation, setResetLocation] = useState(false)
  const [selectFilter, setSelectFilter] = useState<any[]>([])

  const [loadData, setLoadData] = useState(false)

  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const [error, setError] = useState<any>()

  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet/'),
    { ssr: false }
  ), [])

  const handleSelected = (information: any, value: [number, number]) => {
    setSelected(value)
    setInformation(information)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearInformation = () => {
    setInformation(null)
    setResetLocation(!resetLocation)
    setCurrentPage(1)
  }

  useEffect(() => {
    handleLocationDetection()
  }, [])

  useEffect(() => {
    if(resetLocation === true){
      setResetLocation(false)
    }
  }, [resetLocation])

  const handleLocationDetection = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation([position.coords.longitude, position.coords.latitude])
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }

  // Calculate the index range of items to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  // Get the current page's data based on the index range
  const currentPageData = (data || [])
    .slice(startIndex, endIndex);

  // Function to handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = (profile: any) => {
    setData(profile)
  }

  return (
    <div className='flex flex-col items-center pb-20 pt-20'>
      <div className='absolute w-full px-6 pt-6 z-[45] top-20'>
      {myLocation && (
        <div className='flex flex-row items-basline'>
          <ComboboxDemo data={currentPageData} handle={handleSelected} clearInformation={clearInformation} />
        </div>
      )}
      </div>
      <div className='z-[40]'>
        {/* <Map data={data} myLocation={myLocation} selectedPosition={selected} resetLocation={resetLocation} information={information} filter={selectFilter} /> */}
        {
          (
            <Map 
              posix={[-6.3021906, 107.3046116]} 
              data={currentPageData} 
              selectedPosition={selected} 
              resetLocation={resetLocation} 
              information={information} 
              filter={selectFilter}
              handleSelectMarker={handleSelected}
            />
          )
        }
      </div>
      {myLocation && (
      <div className='absolute top-[70vh] z-[45] flex flex-col px-6 py-6 w-full h-fit rounded-t-3xl bg-background gap-6'>
        {information ? (
          <>
            <div 
              onClick={() => clearInformation()}
              className='rounded-full p-2 border w-fit cursor-pointer active:scale-95'
            >
              <ArrowLeftIcon className='w-6 h-6' />
            </div>
            <Information id={information.kode} kategori={information.kategori} />
            {/* <CardInformation data={information} /> */}
          </>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-2'>
            <Index handle={handleFilter} />
            {
              data.length > 0 && (
                <>
                  <div className="w-full flex flex-row items-center justify-between">
                    <Button 
                      variant={'outline'}
                      size={'icon'}
                      onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                    </Button>
                    <span>{currentPage}</span>
                    <Button 
                      variant={'outline'}
                      size={'icon'}
                      onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / pageSize)}
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  {
                    currentPageData
                    .map((airport: any, index: number) => {
                      return(
                        <div 
                          key={index} 
                          className='flex flex-row px-6 py-6 border rounded-xl gap-1.5 hover:cursor-pointer hover:border-blue-500'
                          onClick={() => handleSelected(airport, [airport.long, airport.lat])}
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
                            <div className='flex flex-col'>
                              <h1 className='text-xs text-zinc-800/85 dark:text-white/70 font-bold uppercase'>{airport.kategori} - {airport.kode}</h1>
                              <h1 className='text-base font-bold uppercase'>{airport.nama}</h1>
                              <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>{airport.alamat}</h1>
                            </div>
                            <div className='flex flex-col gap-2'>
                              <div className="flex flex-col">
                                <h1 className="text-xs opacity-70">Provinsi</h1>
                                <h1 className="text-sm">{airport.provinsi}</h1>
                              </div>
                              <div className="flex flex-col">
                                <h1 className="text-xs opacity-70">Wilayah Kerja</h1>
                                {
                                  airport.wilker && airport.wilker.map((item: any, index: number) => (
                                    <h1 key={index} className="text-sm">{item.nama}</h1>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="w-full flex flex-row items-center justify-between">
                    <Button 
                      variant={'outline'}
                      size={'icon'}
                      onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                    </Button>
                    <span>{currentPage}</span>
                    <Button 
                      variant={'outline'}
                      size={'icon'}
                      onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / pageSize)}
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )
            }
          </div>
        )}
      </div>
      )}
    </div>
  )
}

export default Page