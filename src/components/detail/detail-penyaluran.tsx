import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const DetailPenyaluran = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Penyaluran</h1>
          <h1 className='text-sm opacity-70'>Detail informasi data wilayah penyaluran.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default DetailPenyaluran