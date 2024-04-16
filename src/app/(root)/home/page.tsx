import React from 'react'
import Image from 'next/image'
import Index from '@/components/home';

const Page = () => {
  return (
    <div className='flex flex-col items-center pb-20 pt-14'>
      <Image
        src={'/assets/image/fertilizer-home.jpg'}
        alt="banner image"
        height={1200}
        width={1200}
        className="md:hidden lg:hidden xl:hidden rounded-bl-3xl rounded-br-3xl"
      />
      <Index />
    </div>
  )
}

export default Page