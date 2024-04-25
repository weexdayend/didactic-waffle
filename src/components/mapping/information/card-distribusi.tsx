'use client'

import React, { useState } from 'react'
import axios from 'axios'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatIDR } from '@/lib/functions'
import FilterDate from '@/components/home/filter/filter-date'
import { Button } from '@/components/ui/button'

type ParamsProps = {
  id: any,
  kategori: any
}

const CardDistribusi = ({ id, kategori }: ParamsProps) => {
  const [loadData, setLoadData] = useState(false)
  const [data, setData] = useState<any>([])
  const [error, setError] = useState<any>()

  const [date, setDate] = useState<{
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
  }>({
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
  })

  const filterDate = (startMonth: string, startYear: string, endMonth: string, endYear: string) => {
    setDate({
      startMonth,
      startYear,
      endMonth,
      endYear,
    })
  }

  const submitFilter = () => {
    if (date?.startMonth === '' || date?.startYear === '' || date?.endMonth === '' || date?.endYear === '') {
      alert('Tanggal awal dan akhir tidak boleh kosong')
      return;
    }

    const promises = [
      axios.get(`/api/dev/information/${id}/${kategori}/${date.startMonth}/${date.startYear}/${date.endMonth}/${date.endYear}`),
    ];
  
    Promise.all(promises)
      .then(responses => {
        const [distribusi] = responses;
  
        if (!distribusi.data) {
          throw new Error('No data received');
        }
  
        setData(distribusi.data)
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadData(false);
        }, 2500);
      }
    );
  }

  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <div>
          <h1 className='text-lg'>Distribusi</h1>
          <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>alokasi</span> dan <span className='font-bold'>realisasi</span> pupuk.</p>
        </div>
        <div className='flex flex-col gap-4 pt-4'>
          <FilterDate handleChange={filterDate} />
          <Button className='bg-blue-500 text-white hover:bg-blue-400 w-full' onClick={submitFilter}>
            Apply filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {
          data && data.length > 0 ? (
            <div className='w-full flex flex-col items-center gap-4 justify-between'>
              <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
                <h1 className='text-base'>Stok Awal</h1>
                {
                  data
                  .filter((item: any) => item.keterangan === 'Stok Awal')
                  .sort((a: any, b: any) => b.nama_produk.localeCompare(a.nama_produk))
                  .map((item: any, index: number) => (
                    <div key={index} className='w-full flex flex-col'>
                      <div className='w-full flex flex-col'>
                        <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
                      </div>
                      <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                          <h1 className='text-base font-bold'>{item._sum.besaran ? formatIDR(parseFloat(item._sum.besaran.toFixed(2))) : 0}</h1>
                        </div>
                        <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                          <h1 className='text-base font-bold'>{item._sum.total ? formatIDR(item._sum.total) : 0}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
                <h1 className='text-base'>Penebusan</h1>
                {
                  data
                  .filter((item: any) => item.keterangan === 'Penebusan')
                  .sort((a: any, b: any) => b.nama_produk.localeCompare(a.nama_produk))
                  .map((item: any, index: number) => (
                    <div key={index} className='w-full flex flex-col'>
                      <div className='w-full flex flex-col'>
                        <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
                      </div>
                      <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                          <h1 className='text-base font-bold'>{item._sum.besaran ? formatIDR(parseFloat(item._sum.besaran.toFixed(2))) : 0}</h1>
                        </div>
                        <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                          <h1 className='text-base font-bold'>{item._sum.total ? formatIDR(item._sum.total) : 0}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
                <h1 className='text-base'>Penyaluran</h1>
                {
                  data
                  .filter((item: any) => item.keterangan === 'Penyaluran')
                  .sort((a: any, b: any) => b.nama_produk.localeCompare(a.nama_produk))
                  .map((item: any, index: number) => (
                    <div key={index} className='w-full flex flex-col'>
                      <div className='w-full flex flex-col'>
                        <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
                      </div>
                      <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                          <h1 className='text-base font-bold'>{item._sum.besaran ? formatIDR(parseFloat(item._sum.besaran.toFixed(2))) : 0}</h1>
                        </div>
                        <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                          <h1 className='text-base font-bold'>{item._sum.total ? formatIDR(item._sum.total) : 0}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
                <h1 className='text-base'>Stok Akhir</h1>
                {
                  data
                  .filter((item: any) => item.keterangan === 'Stok Akhir')
                  .sort((a: any, b: any) => b.nama_produk.localeCompare(a.nama_produk))
                  .map((item: any, index: number) => (
                    <div key={index} className='w-full flex flex-col'>
                      <div className='w-full flex flex-col'>
                        <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
                      </div>
                      <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                          <h1 className='text-base font-bold'>{item._sum.besaran ? formatIDR(parseFloat(item._sum.besaran.toFixed(2))) : 0}</h1>
                        </div>
                        <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                          <h1 className='text-base font-bold'>{item._sum.total ? formatIDR(item._sum.total) : 0}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : (
            <div className='w-full flex flex-col items-center gap-4 justify-between'>
              <h1>Filter terlebih dahulu untuk melihat data.</h1>
            </div>
          )
        }
      </CardContent>
      <CardFooter>
        <div className='flex flex-row w-full items-center justify-center gap-8'>
        <div className='flex flex-row items-center gap-2'>
            <div className='w-6 h-3 rounded-full bg-amber-500' />
            <h6 className='text-sm'>(Ton)</h6>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <div className='w-6 h-3 rounded-full bg-indigo-500' />
            <h6 className='text-sm'>(Rp)</h6>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardDistribusi