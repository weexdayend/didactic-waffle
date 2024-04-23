import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string
}

function NilDistribusi({ title }: Props) {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-sm opacity-80'>Data distribusi {title} belum tersedia.</h1>
        </div>
      </CardHeader>
    </Card>
  )
}

export default NilDistribusi