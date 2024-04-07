import React from 'react'

import DetailPoktan from '../detail-poktan'
import DetailPetani from '../detail-petani'
import DetailPenyaluran from '../detail-penyaluran'
import DetailLegalitas from '../detail-legalitas'

const Kios = () => {
  return (
    <div className='flex flex-col gap-4'>
      <DetailPoktan />
      <DetailPetani />
      <DetailPenyaluran />
      <DetailLegalitas />
    </div>
  )
}

export default Kios