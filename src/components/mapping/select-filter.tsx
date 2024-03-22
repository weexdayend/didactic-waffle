"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full rounded-2xl">
        <SelectValue placeholder="Pilih filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="distributor">Distributor</SelectItem>
          <SelectItem value="kios">Kios</SelectItem>
          <SelectItem value="gedunglini">Gedung Lini III</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
