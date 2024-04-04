"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import DetailProfile from '../detail-profile'
import DetailDistribusi from '../detail-distribusi'
import DetailDocument from '../detail-docomuent'
import NullDistribusi from '../null-distribusi'

type ParamsProps = {
  id: string,
  kategori: string,
}

const Information = ({ id, kategori }: ParamsProps) => {
  const [loadData, setLoadData] = useState(false)
  const [datas, setDatas] = useState<any>()
  const [error, setError] = useState<any>()

  let kat = kategori || '';
  kat = kat.charAt(0).toUpperCase() + kat.slice(1);

  useEffect(() => {
    setLoadData(true)
    if (id) {
      axios.get(`/api/dev/information/${id}/${kat}`) // Make a POST request with the area parameter
        .then(response => {
          if (!response.data) {
            throw new Error('No data received');
          }
          setDatas(response.data);
        })
        .catch(error => {
          setError(error.response.data.error);
        })
        .finally(() => {
          const timer = setTimeout(() => {
            setLoadData(false);
          }, 5000);

          // Clear timeout when component unmounts
          return () => clearTimeout(timer);
        });
    }
  }, [id])

  const skeletonCards = Array.from({ length: 2 }, (_, index) => (
    <Skeleton key={index} className="h-52 w-full rounded-2xl" />
  ));

  if (loadData) {
    return (
      <div className='flex flex-col gap-4'>
        {skeletonCards}
      </div>  
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!datas) {
    return <div>No data received</div>;
  }

  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <DetailProfile data={datas.data} />
      {
        datas.distribusi.length > 0 ? (
          <DetailDistribusi data={datas.distribusi} />
        ) : (
          <NullDistribusi />
        )
      }
      <DetailDocument />
    </div>
  )
}

export default Information