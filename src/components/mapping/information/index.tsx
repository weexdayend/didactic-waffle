'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import CardFilter from '@/components/mapping/information/card-filter'

type FilterProps = {
  provinsi: string,
  kabupaten: string,
  tahun: string,
}

type Props = {
  handle: (profile: any) => void;
}

function Index({ handle }: Props) {

  const handleFilterChange = (value: any) => {
    handle(value)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <CardFilter handleChange={handleFilterChange} />
    </div>
  )
}

export default Index