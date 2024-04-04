import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const NullDistribusi = () => {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <div>
          <h1 className='text-lg'>Distribusi</h1>
          <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>alokasi</span> dan <span className='font-bold'>realisasi</span> pupuk.</p>
        </div>
      </CardHeader>
      <CardContent>
        <h1>Belum ada data pendistribusian.</h1>
      </CardContent>
    </Card>
  )
}

export default NullDistribusi