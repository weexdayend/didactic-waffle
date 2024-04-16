import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatIDR } from '@/lib/functions'

type ParamsProps = {
  data: any,
  title: any,
}

const CardReport = ({ data, title }: ParamsProps) => {
  const filteredItem = data.find((item: any) => item.keterangan === 'Stok Awal');

  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <div>
          <p className='text-sm opacity-75'>Bulan {filteredItem && `${filteredItem.bulan}, Tahun ${filteredItem.tahun}`}</p>
          <h1 className='text-lg'>Distribusi {title}</h1>
          <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>alokasi</span> dan <span className='font-bold'>realisasi</span> pupuk.</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className='w-full flex flex-col items-center gap-4 justify-between'>
          <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
            <h1 className='text-base'>Stok Awal</h1>
            {
              data
              .filter((item: any) => item.keterangan === 'Stok Awal')
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
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
          <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
            <h1 className='text-base'>Penebusan</h1>
            {
              data
              .filter((item: any) => item.keterangan === 'Penebusan')
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
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
          <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
            <h1 className='text-base'>Penyaluran</h1>
            {
              data
              .filter((item: any) => item.keterangan === 'Penyaluran')
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
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
          <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
            <h1 className='text-base'>Stok Akhir</h1>
            {
              data
              .filter((item: any) => item.keterangan === 'Stok Akhir')
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.nama_produk}</h1>
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

export default CardReport