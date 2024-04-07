import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const Other = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Other</h1>
          <h1 className='text-sm opacity-70'>OS Pengambilan prod di Lini III.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Other