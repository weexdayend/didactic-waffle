"use client"

import dynamic from "next/dynamic";

import React, { useEffect, useState } from 'react'
import { useMemo } from "react";

import Image from 'next/image'

import MyListbox from '@/components/mapping/select-filter'
import ComboboxDemo from '@/components/mapping/combobox'

import axios from 'axios'

import {
  ArrowLeftIcon
} from 'lucide-react'
import CardInformation from "@/components/mapping/card-information";

const Page = () => {
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null)
  
  const [information, setInformation] = useState<any>(null)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [resetLocation, setResetLocation] = useState(false)
  const [selectFilter, setSelectFilter] = useState<any[]>([])

  const [loadData, setLoadData] = useState(false)

  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()

  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet/'),
    { ssr: false }
  ), [])

  useEffect(() => {
    axios.get('/api/dev')
      .then(response => {
        if (!response.data) {
          throw new Error('No data received');
        }
        setLoadData(true);
        setData(response.data.data_completed);
      })
      .catch(error => {
        setLoadData(false);
        setError(error.message);
      });
  }, []);

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
        setMyLocation([position.coords.longitude, position.coords.latitude])
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
    <>
      {
        loadData == true && (
          <div className='flex flex-col items-center pb-20 pt-20'>
            <div className='absolute w-full px-6 pt-6 z-[45] top-20'>
            {myLocation && (
              <div className='flex flex-row items-basline'>
                <MyListbox filtered={handleFiltered} />
                <ComboboxDemo data={data} filter={selectFilter} handle={handleSelected} clearInformation={clearInformation} />
              </div>
            )}
            </div>
            <div className='z-[40]'>
              {/* <Map data={data} myLocation={myLocation} selectedPosition={selected} resetLocation={resetLocation} information={information} filter={selectFilter} /> */}
              {
                data && (
                  <Map 
                    posix={[-6.898678903936348, 107.6190306816882]} 
                    data={data} 
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
                  <CardInformation data={information} />
                  {/* <div 
                    onClick={() => clearInformation()}
                    className='rounded-full p-2 border w-fit cursor-pointer active:scale-95'
                  >
                    <ArrowLeftIcon className='w-6 h-6' />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                    <div className='flex flex-row px-6 py-6 border rounded-2xl gap-4'>
                      <div className='flex flex-col'>
                        <h1 className='text-base font-bold uppercase'>{information.nama}</h1>
                        <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>{information.kategori}</h1>
                      </div>
                    </div>
                  </div> */}
                </>
              ) : (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {
                      selectFilter.length > 0 ? (
                        data
                        .filter((airport: any) => {
                          return selectFilter.includes(airport.kategori)
                        })
                        .map((airport: any, index: number) => {
                          return(
                            <div 
                              key={index} 
                              className='flex flex-row px-6 py-6 border rounded-3xl gap-4 hover:cursor-pointer hover:border-blue-500'
                              onClick={() => handleSelected(airport, [airport.long, airport.lat])}
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
                                  <h1 className='text-base font-bold uppercase'>{airport.nama}</h1>
                                  <h1 className='text-xs text-zinc-800/70 dark:text-white/70'>{airport.kategori}</h1>
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
                        <>
                          <div className='w-full grid grid-cols-1 md:col-span-4 lg:col-span-4 xl:col-span-4 gap-6'>
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
                          </div>
                        </>
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
    </>
  )
}

export default Page