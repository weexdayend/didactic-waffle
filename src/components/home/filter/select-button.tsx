import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  holder: string,
  data: any,
  handleChange: (value: any) => void
}
  
const SelectButton = ({ holder, data, handleChange }: Props) => {

  const handleSelect = (value: any) => {
    handleChange(value)
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={`Pilih ${holder}...`} 
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={`all`}>
            Semua {holder}
          </SelectItem>
          {data.map((item: any, index: number) => (
            <SelectItem key={item.kode + index} value={item.kode}>
              {item.nama}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectButton