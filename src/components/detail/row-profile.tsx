'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button'
import { MapPinIcon } from 'lucide-react'
import Link from 'next/link'
  
const RowProfile = ({ params }: { params: { area: string, resource: string } }) => {
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
    <div className='flex flex-col gap-6'>
    {
      data.map((item: any, index: number) => (
        <Card key={index} className='w-full h-fit'>
          <CardHeader>
            <CardTitle>
              {
                params.area == 'gudang' ||
                params.area == 'distributor' ||
                params.area == 'kios' ? (
                  <div className='flex flex-row'>
                    <h1 className='text-base font-bold uppercase'>{item.nama}</h1>
                  </div>
                ) : (
                  <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-base font-bold uppercase'>{item.nama}</h1>
                  </div>
                )
              }
            </CardTitle>
              {
                params.area === 'gudang' ||
                params.area === 'distributor' ||
                params.area === 'kios' ? (
                  <CardDescription>
                    <h1 className='text-xs font-bold opacity-70'>{item.alamat}</h1>
                    <div className='w-full flex flex-col items-center gap-6 py-6'>
                      <div className='flex flex-row items-center w-full gap-1.5 justify-between'>
                        <div className='flex flex-col'>
                          <h1 className='text-xs opacity-70'>Provinsi</h1>
                          <h1 className='text-xs font-bold'>{item.provinsi}</h1>
                        </div>

                        <div className='flex flex-col'>
                          <h1 className='text-xs opacity-70'>Kota/Kabupaten</h1>
                          <h1 className='text-xs font-bold'>{item.kabupaten}</h1>
                        </div>

                        <div className='flex flex-col'>
                          <h1 className='text-xs opacity-70'>Kecamatan</h1>
                          <h1 className='text-xs font-bold'>{item.kecamatan}</h1>
                        </div>
                      </div>
                    </div>
                  </CardDescription>
                ) : (
                  <CardDescription>
                    <div className='w-full flex flex-col items-center gap-6 pt-6'>
                      <div className='flex flex-row items-center w-full gap-4 justify-between'>
                        <div className='flex flex-col'>
                          <h1 className='text-xs opacity-70'>Provinsi</h1>
                          <h1 className='text-xs font-bold'>{item.provinsi}</h1>
                        </div>
                        {
                          params.area === 'kecamatan' && (
                            <div className='flex flex-col'>
                              <h1 className='text-xs opacity-70'>Kota/Kabupaten</h1>
                              <h1 className='text-xs font-bold'>{item.kabupaten}</h1>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </CardDescription>
                )
              }
          </CardHeader>
          {
            params.area === 'gudang' ||
            params.area === 'distributor' ||
            params.area === 'kios' ? (
              <CardFooter>
                <div className='w-full flex flex-row items-center gap-6'>
                  <Link href={`/id/detail/kios/profile/${item.kode}`}>
                    <Button variant={'outline'}>Detail</Button>
                  </Link>
                  <Button variant={'outline'}>Lokasi</Button>
                </div>
              </CardFooter>
            ) : (<></>)
          }
        </Card>
      ))
    }
    </div>
  )
}

export default RowProfile