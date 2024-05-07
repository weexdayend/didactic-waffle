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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SelectButton from '@/components/home/filter/select-button'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type FilterOption = {
  provinsi: string,
  kabupaten: string,
  tahun: string,
}

type FilterProps = {
  handleChange: (value: FilterOption) => void
  loading: boolean
}

const CardFilter = ({ handleChange, loading }: FilterProps) => {
  const [loadData, setLoadData] = useState(false) // Set initial state to true

  const [dataProvinsi, setDataProvinsi] = useState<any>()
  const [dataKabupaten, setDataKabupaten] = useState<any>()

  const [error, setError] = useState<any>()

  const [selectTahun, setSelectTahun] = useState<string>('')
  const [selectProvinsi, setSelectProvinsi] = useState<string | null>(null)
  const [selectKabupaten, setSelectKabupaten] = useState<string| null>(null)

  const fetchData = async () => {
    setLoadData(true); // Set loadData to true before fetching data
  
    // Define array of promises for API requests
    const promises = [
      axios.get(`/api/dev/area/filter/provinsi/all/${selectTahun}`),
      axios.get(`/api/dev/area/filter/kabupaten/all/${selectTahun}`),
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
        setLoadData(false);
      });
  }

  useEffect(() => {
    if (selectTahun) {
      fetchData();
    }
  }, [selectTahun])

  const handleSelectTahun = (value: any) => {
    setSelectTahun(value);
  }

  const filterProvinsi = (value: any) => {
    setSelectProvinsi(value);
  }

  const filterKabupaten = (value: any) => {
    setSelectKabupaten(value);
  }

  const submitFilter = () => {

    if (selectProvinsi === null || selectKabupaten === null) {
      alert('Provinsi dan Kabupaten tidak boleh kosong')
      return;
    }

    handleChange({
      provinsi: selectProvinsi,
      kabupaten: selectKabupaten,
      tahun: selectTahun
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
        <div className='w-full flex flex-col items-center justify-between gap-4'>
          <Select onValueChange={(e) => handleSelectTahun(e)}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={`Pilih tahun...`} 
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='2022'>2022</SelectItem>
                <SelectItem value='2023'>2023</SelectItem>
                <SelectItem value='2024'>2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {
            dataProvinsi && (<SelectButton holder='Provinsi' data={dataProvinsi} handleChange={filterProvinsi} />)
          }
          {
            dataKabupaten && (<SelectButton holder='Kabupaten' data={filteredKabupaten} handleChange={filterKabupaten} />)
          }
        </div>
      </CardContent>
      <CardFooter>
        <Button className='bg-blue-500 text-white hover:bg-blue-400 w-full gap-1.5' onClick={submitFilter}>
          {
            loading || loadData && (
              <Spinner size="small" className='text-white' />
            )
          }
          Apply filter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardFilter