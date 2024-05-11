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

type Props = {
  prov: any[]
  kab: any[]
}

const CardPerson = ({ prov, kab }: Props) => {
  return (
    <Card className='w-full h-fit'>
      <CardHeader>
        <CardTitle>Penanggung Jawab</CardTitle>
        <CardDescription>Daftar penanggung jawab wilayah.</CardDescription>
      </CardHeader>
      <CardContent>
        {prov.length > 0 &&
          prov.map((item: any, index: number) => (
            <div key={index} className='w-full h-fit flex flex-col border rounded-xl px-4 py-6 gap-4'>
              <div className='w-full h-fit flex flex-row gap-4'>
                <Avatar>
                  <AvatarImage src={item.foto ? item.foto : 'https://github.com/shadcn.png'} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='w-full flex flex-col gap-4'>
                  <div className='flex flex-col'>
                    <h1 className='text-sm opacity-55'>{item.jabatan}</h1>
                    <h1 className='text-lg'>{item.nama_petugas}</h1>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-sm opacity-70'>Wilayah Kerja</h1>
                    <div className='grid grid-cols-2 gap-2'>
                      {item.wilker.map((wil: any) => (
                        <div key={wil.kode} className='px-4 py-2 border rounded-mg'>
                          <h1 className='text-xs'>{wil.nama}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-sm opacity-70'>Contact</h1>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='px-4 py-2 border rounded-mg'>
                        <h1 className='text-xs'>{item.contact}</h1>
                      </div>
                      <div className='px-4 py-2 border rounded-mg'>
                        <h1 className='text-xs'>{item.contact_wa} - Whatsapp</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        
      </CardContent>
    </Card>
  )
}

export default CardPerson