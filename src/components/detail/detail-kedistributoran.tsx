import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const Kedistributoran = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Kedistributoran</h1>
          <h1 className='text-sm opacity-70'>Informasi kedistributoran.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Kedistributoran