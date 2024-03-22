"use client"

import React, { useEffect, useState } from 'react'
import Map from '@/components/map'
import Image from 'next/image'

import MyListbox from '@/components/mapping/select-filter'
import ComboboxDemo from '@/components/mapping/combobox'

import airports from '@/components/map/dummy.json'

import {
  ArrowLeftIcon
} from 'lucide-react'

const Page = () => {
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null)
  
  const [information, setInformation] = useState<any>(null)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [resetLocation, setResetLocation] = useState(false)
  const [selectFilter, setSelectFilter] = useState<any[]>([])

  const handleSelected = (information: any, value: [number, number]) => {
    setSelected(value)
    setInformation(information)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  const clearInformation = () => {
    setInformation(null)
    setResetLocation(!resetLocation)
  }

  useEffect(() => {
    handleLocationDetection()
  }, []);

  useEffect(() => {
    if(resetLocation === true){
      setResetLocation(false)
    }
  }, [resetLocation])

  const handleLocationDetection = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // setMyLocation([position.coords.latitude, position.coords.longitude])
        setMyLocation([37.7119886, 138.0722558])
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const handleFiltered = (value: any[]) => {
    setSelectFilter(value)
  }

  return (
    <div className='flex flex-col items-center pb-20 pt-20'>
      <div className='absolute w-full px-6 pt-6 z-[45] top-20'>
      {myLocation && (
        <div className='flex flex-row items-basline'>
          <MyListbox filtered={handleFiltered} />
          <ComboboxDemo filter={selectFilter} handle={handleSelected} clearInformation={clearInformation} />
        </div>
      )}
      </div>
      <div className='z-[40]'>
        <Map myLocation={myLocation} selectedPosition={selected} resetLocation={resetLocation} information={information} filter={selectFilter} />
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
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              <div className='flex flex-row px-6 py-6 border rounded-2xl gap-4'>
                <div className='flex flex-col'>
                  <h1 className='text-base font-bold uppercase'>{information.name}</h1>
                  <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Distributor</h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {
                selectFilter.length > 0 ? (
                  airports
                  .filter((airport) => {
                    return selectFilter.includes(airport.cat)
                  })
                  .map((airport, index) => {
                    return(
                      <div 
                        key={index} 
                        className='flex flex-row px-6 py-6 border rounded-3xl gap-4 hover:cursor-pointer hover:border-blue-500'
                        onClick={() => handleSelected(airport, [Number(airport.lat), Number(airport.lon)])}
                      >
                        <div className='px-2 py-2 h-fit w-fit bg-blue-100 rounded-full'>
                          <Image
                            src={'/assets/icons/warehouses.png'}
                            height={16}
                            width={16}
                            alt='warehouses icon'
                          />
                        </div>
                        <div className='flex w-full h-full flex-col gap-4'>
                          <div className='flex flex-col'>
                            <h1 className='text-base font-bold uppercase'>{airport.name}</h1>
                            <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>{airport.cat}</h1>
                          </div>
                          <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col w-full h-full'>
                              <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Alokasi</h1>
                              <h1 className='text-base font-bold uppercase'>2.250</h1>
                            </div>
                            <div className='flex flex-col w-full h-full'>
                              <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>Realisasi</h1>
                              <h1 className='text-base font-bold uppercase'>0.562</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='w-full h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:col-span-4 lg:grid-cols-4 lg:col-span-4 xl:grid-cols-4 xl:col-span-4 gap-6'>
                    <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
                      <h1 className='text-sm text-white'>Kecamatan</h1>
                      <h1 className='text-3xl font-bold text-white'>30</h1>
                    </div>
                    
                    <div className='bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
                      <h1 className='text-sm text-white'>Distributor</h1>
                      <h1 className='text-3xl font-bold text-white'>17</h1>
                    </div>

                    <div className='bg-gradient-to-br from-blue-500 via-blue-400 to-purple-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
                      <h1 className='text-sm text-white'>Kios</h1>
                      <h1 className='text-3xl font-bold text-white'>400</h1>
                    </div>

                    <div className='bg-gradient-to-br from-purple-500 via-blue-400 to-indigo-500 rounded-3xl xl:rounded-3xl h-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center justify-between px-6 py-6'>
                      <h1 className='text-sm text-white'>Gd. Lini III</h1>
                      <h1 className='text-3xl font-bold text-white'>3</h1>
                    </div>
                  </div>
                )
              }
            </div>
          </>
        )}
      </div>
      )}
    </div>
  )
}

export default Page