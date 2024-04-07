import React from 'react'

import Kedistributoran from '../detail-kedistributoran'
import Denda from '../detail-denda'
import Other from '../detail-other'
import DetailDocument from '../detail-document'

const Distributor = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Kedistributoran />
      <Denda />
      <Other />
      <DetailDocument />
    </div>
  )
}

export default Distributor