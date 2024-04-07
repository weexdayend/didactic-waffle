import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const Denda = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Denda</h1>
          <h1 className='text-sm opacity-70'>Informasi denda.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Denda