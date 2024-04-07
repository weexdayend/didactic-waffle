import React from 'react'

import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"

const DetailPoktan = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Poktan</h1>
          <h1 className='text-sm opacity-70'>Detail informasi data poktan.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default DetailPoktan