"use client"

import React, { useEffect, useState } from 'react'

import axios from 'axios'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

import { formatIDR } from '@/lib/functions'

import {
  BookOpenIcon
} from 'lucide-react'

type InformationProps = {
  data: any;
}

const CardInformation = ({ data }: InformationProps) => {
  
  const [loadData, setLoadData] = useState(false)
  const [datas, setDatas] = useState<any>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    setLoadData(true)
    if (data) {
      axios.get(`/api/dev/information/${data.kode}/${data.kategori}`) // Make a POST request with the area parameter
        .then(response => {
          if (!response.data) {
            throw new Error('No data received');
          }
          setDatas(response.data);
        })
        .catch(error => {
          setError(error.response.data.error);
        })
        .finally(() => {
          const timer = setTimeout(() => {
            setLoadData(false);
          }, 5000);

          // Clear timeout when component unmounts
          return () => clearTimeout(timer);
        });
    }
  }, [data])

  const uniqueProvinsi = datas && Array.from(new Set(datas.data.map((item: any) => item.provinsi)));
  const uniqueKabupaten = datas && Array.from(new Set(datas.data.map((item: any) => item.kabupaten)));

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress increment every 500ms
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment progress by 10 until it reaches 100
        return prevProgress >= 100 ? 100 : prevProgress + 10;
      });
    }, 500);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const skeletonCards = Array.from({ length: 2 }, (_, index) => (
    <Skeleton key={index} className="h-52 w-full rounded-2xl" />
  ));

  if (loadData) {
    return (
      <div className='flex flex-col gap-4'>
        <div className="h-1.5 bg-blue-500/30 rounded-full transition-all ease-in-out" style={{ width: `${progress}%` }} />
        {skeletonCards}
      </div>  
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data received</div>;
  }

  return (
    <div className='flex flex-col gap-4 pt-2'>
      <Card className='w-full h-fit rounded-2xl'>
        <CardHeader>
          <div className='flex flex-col gap-2'>
            <h1 className='text-sm opacity-70 uppercase'>{data.kategori} - <span className='font-bold'>{data.kode}</span></h1>
            <h1 className='text-lg'>{data.nama}</h1>
            <p className='text-xs opacity-70'>{data.alamat !== null ? data.alamat : `Data ${data.kategori} belum memiliki alamat.`}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4 pt-6'>
            <h1 className='text-base'>Wilayah Kerja</h1>
            {
              datas && datas.data.map((item: any, index: any) => (
                <div key={index} className='flex flex-col gap-1'>
                  <h1 className='text-xs opacity-70'>Kecamatan</h1>
                  <h1 className='text-sm opacity-90'>{item.kecamatan}</h1>
                </div>
              ))
            }
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full flex flex-row items-center justify-between pt-6'>
            <div className='flex flex-col'>
              <h1 className='text-xs opacity-70'>Provinsi</h1>
              <h1 className='text-sm opacity-90'>{uniqueProvinsi}</h1>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xs opacity-70'>Kota/Kabupaten</h1>
              <h1 className='text-sm opacity-90'>{uniqueKabupaten}</h1>
            </div>
          </div>
        </CardFooter>
      </Card>

      {
        data.kategori === 'Distributor' || data.kategori === 'Kios' && (
        <Card className='w-full h-fit rounded-2xl'>
          <CardHeader>
            <div>
              <h1 className='text-lg'>Distribusi</h1>
              <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>alokasi</span> dan <span className='font-bold'>realisasi</span> pupuk.</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className='w-full flex flex-col items-center gap-6 py-6'>
              <div className='w-full flex flex-col items-center gap-4 justify-between'>
                {
                  datas && datas.distribusi
                  .filter((item: any) => item.keterangan === 'Penyaluran')
                  .map((item: any, index: number) => (
                    <div key={index} className='w-full flex flex-col gap-2'>
                      <div className='w-full flex flex-col'>
                        <h1>{item.nama_produk}</h1>
                      </div>
                      <div className='w-full flex flex-row items-center justify-between'>
                        <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                          <h1 className='text-base font-bold'>{item.besaran}</h1>
                        </div>
                        <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                          <h1 className='text-base font-bold'>{formatIDR(item.total)}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
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

      <Card>
        <CardHeader>
          <div className='flex flex-col'>
            <h1 className='text-lg'>Dokumen</h1>
            <h1 className='text-sm opacity-70'>Daftar dokumen terkait.</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-between py-4 border-b'>
              <h1 className='text-sm'>Kedistributoran</h1>
              <Button
                variant={'outline'}
                size={'icon'}
              >
                <BookOpenIcon className='w-4 h-4' />
              </Button>
            </div>

            <div className='flex flex-row items-center justify-between py-4'>
              <h1 className='text-sm'>OS Pengambilan Prod di Lini III</h1>
              <Button
                variant={'outline'}
                size={'icon'}
              >
                <BookOpenIcon className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardInformation