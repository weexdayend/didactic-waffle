import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button'  
import {
  MapPinIcon
} from 'lucide-react'

  const DetailProfile = () => {
    return (
      <Card className='w-full h-fit'>
        <CardHeader>
          <CardTitle>
            <div className='flex flex-row justify-between items-center'>
              <h1>Contoh Data Profile</h1>
              <Button
                variant="outline"
                size="icon"
              >
                <MapPinIcon className='h-4 w-4' />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Detail informasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='w-full flex flex-col items-center gap-6 pt-6'>
            <div className='flex flex-row items-center w-full gap-4 justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-xs opacity-70'>Provinsi</h1>
                <h1 className='text-xs font-bold'>Jawa Barat</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='text-xs opacity-70'>Kota/Kabupaten</h1>
                <h1 className='text-xs font-bold'>Kota Bandung</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='text-xs opacity-70'>Kecamatan</h1>
                <h1 className='text-xs font-bold'>Cidadap</h1>
              </div>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xs opacity-70'>Alamat</h1>
              <h1 className='text-xs font-bold'>Jl. Hegarmanah No.12, Hegarmanah, Cidadap, Kota Bandung, 40141.</h1>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

export default DetailProfile