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
  harga: any
}

const CardHarga = ({ harga }: ParamsProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <Card className='w-full h-fit'>
        <CardHeader>
          <div className='flex flex-col'>
            <h1 className='text-sm'>Harga Tebus Distributor ke Produsen</h1>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='w-full h-fit flex flex-row items-center justify-between gap-4'>
            {
              harga
              .filter((item: any) => item.keterangan === 'Tebus')
              .sort((a: any, b: any) => b.kode_produk.localeCompare(a.kode_produk))
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.kode_produk == 'P01' ? 'UREA' : 'NPK'}</h1>
                  </div>
                  <div className='w-full flex flex-row items-center justify-between'>
                    <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                      <h1 className='text-base font-bold'>{item.besaran ? formatIDR(parseFloat(item.besaran.toFixed(2))) : 0}</h1>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>

      <Card className='w-full h-fit'>
        <CardHeader>
          <div className='flex flex-col'>
            <h1 className='text-sm'>Harga Jual Distributor ke Kios</h1>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='w-full h-fit flex flex-row items-center justify-between gap-4'>
            {
              harga
              .filter((item: any) => item.keterangan === 'Jual')
              .sort((a: any, b: any) => b.kode_produk.localeCompare(a.kode_produk))
              .map((item: any, index: number) => (
                <div key={index} className='w-full flex flex-col'>
                  <div className='w-full flex flex-col'>
                    <h1 className='text-sm opacity-80'>{item.kode_produk == 'P01' ? 'UREA' : 'NPK'}</h1>
                  </div>
                  <div className='w-full flex flex-row items-center justify-between'>
                    <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                      <h1 className='text-base font-bold'>{item.besaran ? formatIDR(parseFloat(item.besaran.toFixed(2))) : 0}</h1>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardHarga