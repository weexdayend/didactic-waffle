import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const TitleCard = () => {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Fertilizer Monitoring area Jawa Barat dan Banten.</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className='text-xs'>Last updated 20 Maret 2024, 03.39 WIB.</h1>
      </CardContent>
    </Card>
  )
}

export default TitleCard