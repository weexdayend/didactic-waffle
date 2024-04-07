import React from 'react'

import Kedistributoran from '../detail-kedistributoran'
import Denda from '../detail-denda'
import Other from '../detail-other'

const Gudang = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Kedistributoran />
      <Denda />
      <Other />
    </div>
  )
}

export default Gudang