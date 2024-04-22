import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'

interface Props {
  handleChange: (startMonth: string, startYear: string, endMonth: string, endYear: string) => void;
}

function FilterDate({ handleChange }: Props) {
  const [startMonth, setStartMonth] = useState<string | null>(null);
  const [startYear, setStartYear] = useState<string | null>(null);
  const [endMonth, setEndMonth] = useState<string | null>(null);
  const [endYear, setEndYear] = useState<string | null>(null);

  const handleStartMonthChange = (value: string) => {
    setStartMonth(value);
  }
  const handleStartYearChange = (value: string) => {
    setStartYear(value);
  }

  const handleEndMonthChange = (value: string) => {
    setEndMonth(value);
  }
  const handleEndYearChange = (value: string) => {
    setEndYear(value);
  }

  useEffect(() => {
    if(startMonth && startYear && endMonth && endYear) {
      if (endMonth < startMonth) {
        setEndMonth(startMonth);
      }
      if (endYear < startYear) {
        setEndYear(startYear);
      }

      handleChange(startMonth, startYear, endMonth, endYear);
    }
  }, [startMonth, startYear, endMonth, endYear]);
  
  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col w-full gap-1'>
          <h1 className='text-sm'>Start date :</h1>
          <div className='flex flex-row gap-2'>
            <Select value={startMonth || ''} onValueChange={(e) => handleStartMonthChange(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih bulan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bulan</SelectLabel>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={ startYear || '' } onValueChange={(e) => handleStartYearChange(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tahun..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tahun</SelectLabel>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col w-full gap-1'>
          <h1 className='text-sm'>End date :</h1>
          <div className='flex flex-row gap-2'>
            <Select value={endMonth || ''} onValueChange={(e) => handleEndMonthChange(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih bulan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bulan</SelectLabel>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={endYear || ''} onValueChange={(e) => handleEndYearChange(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tahun..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tahun</SelectLabel>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterDate