import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const DetailInformasi = () => {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <CardTitle>
          Realisasi
        </CardTitle>
        <CardDescription>
          Detail informasi realisasi.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full flex flex-col items-center gap-6 py-6'>
          <div className='w-full flex flex-col items-center gap-4 justify-between'>
            <div className='w-full flex flex-col gap-2'>
              <div className='w-full flex flex-col'>
                <h1>UREA</h1>
              </div>
              <div className='w-full flex flex-row items-center justify-between'>
                <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                  <h1 className='text-base font-bold'>1.000</h1>
                </div>
                <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                  <h1 className='text-base font-bold'>2.750.000</h1>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <div className='w-full flex flex-col'>
                <h1>NPK</h1>
              </div>
              <div className='w-full flex flex-row items-center justify-between'>
                <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                  <h1 className='text-base font-bold'>1.000</h1>
                </div>
                <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                  <h1 className='text-base font-bold'>2.750.000</h1>
                </div>
              </div>
            </div>
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

export default DetailInformasi