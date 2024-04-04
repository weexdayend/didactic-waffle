'use client'

import axios from 'axios'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button'

import {
  AlertCircleIcon, ArrowLeftIcon, ArrowRightIcon
} from 'lucide-react'

import MenuBar from './menu-bar'
import SearchBox from './search-box'
  
const pageSize = 10; // Number of items per page

const RowProfile = ({ params }: { params: { area: string, resource: string } }) => {
  const [loadData, setLoadData] = useState(false)

  const [logData, setLogData] = useState<any>()
  const [data, setData] = useState<any>()

  const [error, setError] = useState<any>()

  useEffect(() => {
    setLoadData(true); // Set loadData to true before fetching data
    axios.get(`/api/dev/area/detail/${params.area}/${params.resource}`) // Make a POST request with the area parameter
      .then(response => {
        if (!response.data) {
          throw new Error('No data received');
        }
        setLogData(response.data);
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


  const [currentPage, setCurrentPage] = useState(1);

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

  const handleSearchData = (value: any) => {
    window.location.href=`/id/detail/${params.area}/${params.resource}/${value}`
  }

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
      <MenuBar area={params.area} />
      <SearchBox handle={handleSearchData} data={data} area={params.area} />
      {
        currentPageData.map((item: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <div className='flex flex-col'>
              {
                params.area == 'gudang' ||
                params.area == 'distributor' ||
                params.area == 'kios' ? (
                  <div className='flex flex-col'>
                    <h1 className='text-sm opacity-70 uppercase'>{params.area} - <span className='font-bold'>{item.kode}</span></h1>
                    <h1 className='text-base font-bold uppercase'>{item.nama}</h1>
                  </div>
                ) : (
                  <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-base font-bold uppercase'>{item.nama}</h1>
                  </div>
                )
              }
              </div>
              {
                params.area === 'gudang' ||
                params.area === 'distributor' ||
                params.area === 'kios' ? (
                  <div className='flex flex-col'>
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
                  </div>
                ) : (
                  <div className='flex flex-col'>
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
                  </div>
                )
              }
            </CardHeader>
            {
              params.area === 'gudang' ||
              params.area === 'distributor' ||
              params.area === 'kios' ? (
                <CardFooter className='flex flex-col'>
                  <div className='w-full flex flex-row items-center gap-4'>
                    <Link href={`/id/detail/${params.area}/${params.resource}/${item.kode}`}>
                      <Button variant={'outline'}>Detail</Button>
                    </Link>
                    <Button variant={'outline'}>Lokasi</Button>
                  </div>
                    {
                      (item.provinsi == null || 
                      item.kabupaten == null || 
                      item.kecamatan == null || 
                      item.alamat == null) && (
                        <div className='pt-4 w-full flex'>
                          <Alert>
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertDescription className='font-light'>
                              Data {params.area} memiliki beberapa informasi yang <span className='font-bold'>null</span> atau <span className='font-bold'>kosong</span>.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )
                    }
                </CardFooter>
              ) : (
                <>
                </>
              )
            }
          </Card>
        ))
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
    </div>
  )
}

export default RowProfile