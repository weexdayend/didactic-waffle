'use client'

import React, { useState } from 'react'

import CardFilter from '@/components/mapping/information/card-filter'
import CardReport from '@/components/mapping/information/card-report'
import CardHarga from './card-harga'

type Props = {
  handle: (profile: any, prov: string, kab: string) => void;
}

function Index({ handle }: Props) {
  const [showInfo, setShowInfo] = useState(false)

  const [dataYearly, setDataYearly] = useState<{ f5: any[], f6: any[]}>({ f5: [], f6: [] })
  const [dataMonthly, setDataMonthly] = useState<{ f5: any[], f6: any[]}>({ f5: [], f6: [] })
  const [dataMonthToMonth, setDataMonthToMonth] = useState<{ f5: any[], f6: any[]}>({ f5: [], f6: [] })

  const [dataAlokasi, setDataAlokasi] = useState([])
  const [dataHarga, setDataHarga] = useState([])

  const handleFilterChange = (
    value: any, 
    prov: string, 
    kab: string, 
    yearly: any,
    currMonth: any,
    mtm: any, 
    alokasi: any, 
    harga: any
  ) => {
    handle(value, prov, kab)

    setDataYearly(yearly)
    setDataMonthly(currMonth)
    setDataMonthToMonth(mtm)
    setDataAlokasi(alokasi)
    setDataHarga(harga)

    setShowInfo(true)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <CardFilter handleChange={handleFilterChange} />
      {
        showInfo && dataHarga.length > 0 && (
          <CardHarga 
            harga={dataHarga}
          />
        )
      }
      {
        showInfo &&
        dataYearly &&
        dataMonthly &&
        dataMonthToMonth &&
        dataAlokasi && (
          <CardReport 
            yearly={dataYearly} 
            currmonth={dataMonthly} 
            mtm={dataMonthToMonth}
            alokasi={dataAlokasi} 
          />
        )
      }
    </div>
  )
}

export default Index