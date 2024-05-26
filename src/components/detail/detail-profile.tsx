"use client"

import React from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button'  

import {
  AlertCircleIcon,
  MapPinIcon
} from 'lucide-react'

type ParamsProps = {
  information: any,
  wilker: any
}

const DetailProfile = ({ information, wilker }: ParamsProps) => {

  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-sm opacity-70 uppercase'>{information[0].kategori} - <span className='font-bold'>{information[0].kode}</span></h1>
            <h1 className='text-lg'>{information[0].nama}</h1>
            <h1 className='text-xs opacity-70'>Alamat, {information[0].alamat}</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='w-full flex flex-col gap-6'>
          {/* <div className='flex flex-row items-center w-full gap-4 justify-between'>
            <div className='flex flex-col'>
              <h1 className='text-xs opacity-70'>Provinsi</h1>
              <h1 className='text-xs font-bold'>{information[0].provinsi}</h1>
            </div>

            <div className='flex flex-col'>
              <h1 className='text-xs opacity-70'>Kota/Kabupaten</h1>
              <h1 className='text-xs font-bold'>{information[0].kabupaten}</h1>
            </div>
          </div> */}
          <div className='flex flex-col gap-4'>
            <h1 className='text-xs opacity-70'>Wilayah Kerja</h1>
            <div className='grid grid-cols-2 gap-4'>
              {
                wilker.map((item: any, index: number) => (
                  <div key={index} className='px-4 py-3 rounded-md border'>
                    <h1 key={index} className='text-xs font-bold'>{item.nama}</h1>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='w-full flex flex-col items-baseline gap-4'>
        {
          (
            information[0].provinsi == null || information[0].provinsi == null ||
            information[0].kabupaten == null || information[0].kabupaten == null ||
            information[0].kecamatan == null || information[0].kecamatan == null ||
            information[0].alamat == null || information[0].alamat == '') && (
            <div className='pt-4 w-full flex'>
              <Alert>
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription className='font-light'>
                  {information[0].kategori} memiliki beberapa informasi yang <span className='font-bold'>null</span> atau <span className='font-bold'>kosong</span>.
                </AlertDescription>
              </Alert>
            </div>
          )
        }
      </CardFooter>
    </Card>
  )
}

export default DetailProfile