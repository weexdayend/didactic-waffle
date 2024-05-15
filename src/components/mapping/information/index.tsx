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
        dataF5.length > 0 && dataAlokasi.length > 0 && (
          <div className='w-full h-fit flex flex-col border rounded-2xl px-4 py-5 gap-4'>
            <h1 className='text-base'>Realisasi</h1>
            {
              dataF5
              .filter((item: any) => item.keterangan === 'Penyaluran')
              .sort((a: any, b: any) => b.nama_produk.localeCompare(a.nama_produk))
              .map((item: any, index: number) => {
                const allocation = (dataAlokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
                const total = allocation ? allocation.total : 0;
                const ratio = allocation ? ((parseFloat(item._sum.besaran.toFixed(2)) / allocation.total) * 100) : 0;
                
                return(
                  <div key={index} className='w-full flex flex-col'>
                    <div className='w-full flex flex-col'>
                      <h1 className='text-sm opacity-80'>Alokasi {item.nama_produk}</h1>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between'>
                      <div className='flex flex-col pb-2 border-b-4 border-amber-500'>
                        <h1 className='text-base font-bold'>{formatIDR(total)}</h1>
                      </div>
                      <div className='flex flex-col pb-2 border-b-4 border-indigo-500'>
                        <h1 className='text-base font-bold'>{ratio.toFixed(2)} %</h1>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
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