import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from '../ui/button'

import { BookOpenIcon } from 'lucide-react'

const DetailDocument = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col'>
          <h1 className='text-lg'>Dokumen</h1>
          <h1 className='text-sm opacity-70'>Daftar dokumen terkait.</h1>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center justify-between py-4 border-b'>
            <h1 className='text-sm'>SPJB</h1>
            <Button
              variant={'outline'}
              size={'icon'}
            >
              <BookOpenIcon className='w-4 h-4' />
            </Button>
          </div>

          <div className='flex flex-row items-center justify-between py-4'>
            <h1 className='text-sm'>Bank Garansi</h1>
            <Button
              variant={'outline'}
              size={'icon'}
            >
              <BookOpenIcon className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DetailDocument