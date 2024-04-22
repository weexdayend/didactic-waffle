'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SelectButton from './select-button'
import { Button } from '@/components/ui/button'
import FilterDate from './filter-date'

type FilterOption = {
  provinsi: string | 'all',
  kabupaten: string | 'all',
  date: {
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
  }
}

type FilterProps = {
  handleChange: (value: FilterOption) => void
}

const CardFilter = ({ handleChange }: FilterProps) => {
  const [loadData, setLoadData] = useState(false) // Set initial state to true

  const [dataProvinsi, setDataProvinsi] = useState<any>()
  const [dataKabupaten, setDataKabupaten] = useState<any>()

  const [error, setError] = useState<any>()

  const [selectProvinsi, setSelectProvinsi] = useState<string | null>(null)
  const [selectKabupaten, setSelectKabupaten] = useState<string| null>(null)

  const [date, setDate] = useState<{
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
  }>({
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
  })

  useEffect(() => {
    setLoadData(true); // Set loadData to true before fetching data
  
    // Define array of promises for API requests
    const promises = [
      axios.get('/api/dev/area/filter/provinsi/all'),
      axios.get('/api/dev/area/filter/kabupaten/all')
    ];
  
    Promise.all(promises)
      .then(responses => {
        const [provinsiResponse, kabupatenResponse] = responses;
  
        if (!provinsiResponse.data || !kabupatenResponse.data) {
          throw new Error('No data received');
        }
  
        setDataProvinsi(provinsiResponse.data);
        setDataKabupaten(kabupatenResponse.data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadData(false);
        }, 2500);
      });
  }, []);

  const filterProvinsi = (value: any) => {
    setSelectProvinsi(value);
  }

  const filterKabupaten = (value: any) => {
    setSelectKabupaten(value);
  }

  const filterDate = (startMonth: string, startYear: string, endMonth: string, endYear: string) => {
    setDate({
      startMonth,
      startYear,
      endMonth,
      endYear,
    })
  }

  const submitFilter = () => {
    if (date?.startMonth === '' || date?.startYear === '' || date?.endMonth === '' || date?.endYear === '') {
      alert('Tanggal awal dan akhir tidak boleh kosong')
      return;
    }

    if (selectProvinsi === null || selectKabupaten === null) {
      alert('Provinsi dan Kabupaten tidak boleh kosong')
      return;
    }

    handleChange({
      provinsi: selectProvinsi,
      kabupaten: selectKabupaten,
      date: {
        startMonth: date?.startMonth,
        startYear: date?.startYear,
        endMonth: date?.endMonth,
        endYear: date?.endYear,
      }
    })
  }

  const filteredKabupaten = dataKabupaten && selectProvinsi !== 'all' ? dataKabupaten.filter((item: any) => item.id_provinsi === selectProvinsi) : dataKabupaten;

  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Filter data fertilizer monitoring.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <FilterDate handleChange={filterDate} />
        {
          date?.startMonth && date?.startYear && date?.endMonth && date?.endYear && (
            <div className='w-full flex flex-col items-center justify-between gap-4'>
              {
                dataProvinsi && (<SelectButton holder='Provinsi' data={dataProvinsi} handleChange={filterProvinsi} />)
              }
              {
                dataKabupaten && (<SelectButton holder='Kabupaten' data={filteredKabupaten} handleChange={filterKabupaten} />)
              }
            </div>
          )
        }
      </CardContent>
      <CardFooter>
        <Button className='bg-blue-500 text-white hover:bg-blue-400 w-full' onClick={submitFilter}>
          Apply filter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardFilter