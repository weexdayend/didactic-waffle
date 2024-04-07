import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const DetailPetani = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Petani</h1>
          <h1 className='text-sm opacity-70'>Detail informasi data petani.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default DetailPetani