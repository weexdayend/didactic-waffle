import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'

const CardPerson = () => {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <CardTitle>Penanggung Jawab</CardTitle>
        <CardDescription>Daftar penanggung jawab wilayah.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full h-fit flex flex-col border rounded-xl px-4 py-4 gap-4'>
          <div className='w-full h-fit flex flex-row gap-4'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col'>
                <h1 className='text-sm opacity-55'>Jabatan</h1>
                <h1 className='text-lg'>Nama Lengkap</h1>
              </div>
            </div>
          </div>
          <Button variant={'outline'} className='w-full'>
            Kontak
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardPerson