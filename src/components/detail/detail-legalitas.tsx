import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from '../ui/button'

import { BookOpenIcon } from 'lucide-react'

const legalitas = [
  {
    id: 0,
    nama: 'SPJB'
  },
  {
    id: 1,
    nama: 'NIB'
  },
  {
    id: 2,
    nama: 'SIUP'
  },
  {
    id: 3,
    nama: 'TDP'
  },
  {
    id: 4,
    nama: 'Surat rekomendasi dinas perdagangan'
  },
]

const DetailLegalitas = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Legalitas</h1>
          <h1 className='text-sm opacity-70'>Daftar dokumen legalitas terkait.</h1>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          {
            legalitas.map((item: any, index: number) => (
              <div key={index+item.id} className='flex flex-row items-center justify-between py-4 border-b'>
                <h1 className='text-sm'>{item.nama}</h1>
                <Button
                  variant={'outline'}
                  size={'icon'}
                >
                  <BookOpenIcon className='w-4 h-4' />
                </Button>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default DetailLegalitas