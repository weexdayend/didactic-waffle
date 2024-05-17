'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import CardFilter from '@/components/mapping/information/card-filter'
import CardDistribusi from './card-distribusi'
import CardReport from '@/components/home/card-report'
import { formatIDR } from '@/lib/functions'

type FilterProps = {
  provinsi: string,
  kabupaten: string,
  tahun: string,
}

interface AllocationItem {
  kode_produk: string;
  total: number;
}

type Props = {
  handle: (profile: any, prov: string, kab: string) => void;
}

function Index({ handle }: Props) {
  const [dataF5, setDataF5] = useState([])
  const [dataF6, setDataF6] = useState([])
  const [dataAlokasi, setDataAlokasi] = useState([])
  const [dataHarga, setDataHarga] = useState([])

  const handleFilterChange = (value: any, prov: string, kab: string, f5: any, f6: any, alokasi: any, harga: any) => {
    handle(value, prov, kab)

    setDataF5(f5)
    setDataF6(f6)
    setDataAlokasi(alokasi)
    setDataHarga(harga)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <CardFilter handleChange={handleFilterChange} />
      {
        dataF5.length > 0 && (<CardReport data={dataF5} alokasi={dataAlokasi} harga={dataHarga} title={'F5'} />)
      }
      {
        dataF6.length > 0 && (<CardReport data={dataF6} alokasi={dataAlokasi} harga={dataHarga} title={'F6'} />)
      }
    </div>
  )
}

export default Index