import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { formatIDR } from '@/lib/functions'

type ParamsProps = {
  yearly: { f5: any[], f6: any[] },
  currmonth: { f5: any[], f6: any[] },
  mtm: { f5: any[], f6: any[] },
  alokasi?: any,
}

interface AllocationItem {
  kode_produk: string;
  yearly: number;
  mtm: number;
  currmonth: number;
}

const CardReport = ({ yearly, currmonth, mtm, alokasi }: ParamsProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <Card className='w-full h-fit'>
        <CardHeader>
          <div className='flex flex-col'>
            <h1 className='text-lg'>Realisasi F5</h1>
            <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>realisasi</span> pupuk.</p>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Yearly</h1>
            {yearly.f5.length > 0 ? yearly.f5.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
              const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
              const total = allocation ? allocation.yearly : 0;
              const ratio = allocation ? ((parseFloat(item._sum.besaran.toFixed(2)) / allocation.yearly) * 100) : 0;

              return (
                <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                  <div className='flex flex-row items-center justify-between'>
                    <h1>{item.nama_produk}</h1>
                    <h1>{ratio.toFixed(2)} %</h1>
                  </div>
                  <div key={index} className='w-full flex flex-row items-center justify-between'>
                    <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                        {formatIDR(total)}
                      </h1>
                    </div>

                    <div className='flex flex-col'>
                      <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                        {item._sum.besaran.toLocaleString()}
                      </h1>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <p className='text-xs opacity-70'>No data available for the yearly.</p>
              </div>
            )}
          </div>

          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Current Month</h1>
            {currmonth.f5.length > 0 ? currmonth.f5.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
            const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
            const total = allocation ? allocation.yearly : 0;
            const ratio = allocation ? ((Number(item._sum.besaran.toFixed(2)) / allocation.yearly) * 100) : 0;

            return (
              <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <div className='flex flex-row items-center justify-between'>
                  <h1>{item.nama_produk}</h1>
                  <h1>{ratio.toFixed(2)} %</h1>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                      {formatIDR(total)}
                    </h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                      {item._sum.besaran.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
              <p className='text-xs opacity-70'>No data available for the current month.</p>
            </div>
          )}
          </div>
          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Month to Month</h1>
            {mtm.f5.length > 0 ? mtm.f5.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
            const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
            const total = allocation ? allocation.mtm : 0;
            const ratio = allocation ? ((Number(item._sum.besaran.toFixed(2)) / allocation.mtm) * 100) : 0;

            return (
              <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <div className='flex flex-row items-center justify-between'>
                  <h1>{item.nama_produk}</h1>
                  <h1>{ratio.toFixed(2)} %</h1>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                      {formatIDR(total)}
                    </h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                      {item._sum.besaran.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
              <p className='text-xs opacity-70'>No data available for the month to month.</p>
            </div>
          )}
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex flex-row w-full items-center justify-center gap-8'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-4 h-1.5 rounded-full bg-amber-500' />
              <h6 className='text-sm'>(Alokasi)</h6>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-4 h-1.5 rounded-full bg-indigo-500' />
              <h6 className='text-sm'>(Realisasi)</h6>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className='w-full h-fit'>
        <CardHeader>
          <div className='flex flex-col'>
            <h1 className='text-lg'>Realisasi F6</h1>
            <p className='text-xs opacity-70'>Detail informasi <span className='font-bold'>realisasi</span> pupuk.</p>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Yearly</h1>
            {yearly.f6.length > 0 ? yearly.f6.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
              const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
              const total = allocation ? allocation.yearly : 0;
              const ratio = allocation ? ((parseFloat(item._sum.besaran.toFixed(2)) / allocation.yearly) * 100) : 0;

              return (
                <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                  <div className='flex flex-row items-center justify-between'>
                    <h1>{item.nama_produk}</h1>
                    <h1>{ratio.toFixed(2)} %</h1>
                  </div>
                  <div key={index} className='w-full flex flex-row items-center justify-between'>
                    <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                        {formatIDR(total)}
                      </h1>
                    </div>

                    <div className='flex flex-col'>
                      <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                        {item._sum.besaran.toLocaleString()}
                      </h1>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <p className='text-xs opacity-70'>No data available for the yearly.</p>
              </div>
            )}
          </div>

          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Current Month</h1>
            {currmonth.f6.length > 0 ? currmonth.f6.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
            const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
            const total = allocation ? allocation.yearly : 0;
            const ratio = allocation ? ((Number(item._sum.besaran.toFixed(2)) / allocation.yearly) * 100) : 0;

            return (
              <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <div className='flex flex-row items-center justify-between'>
                  <h1>{item.nama_produk}</h1>
                  <h1>{ratio.toFixed(2)} %</h1>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                      {formatIDR(total)}
                    </h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                      {item._sum.besaran.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
              <p className='text-xs opacity-70'>No data available for the current month.</p>
            </div>
          )}
          </div>
          <div className='w-full h-fit flex flex-col gap-4'>
            <h1>Month to Month</h1>
            {mtm.f6.length > 0 ? mtm.f6.filter(item => item.keterangan === "Penyaluran").map((item, index) => {
            const allocation = (alokasi as AllocationItem[]).find((allocationItem: AllocationItem) => allocationItem.kode_produk === item.kode_produk);
            const total = allocation ? allocation.mtm : 0;
            const ratio = allocation ? ((Number(item._sum.besaran.toFixed(2)) / allocation.mtm) * 100) : 0;

            return (
              <div key={index} className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
                <div className='flex flex-row items-center justify-between'>
                  <h1>{item.nama_produk}</h1>
                  <h1>{ratio.toFixed(2)} %</h1>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='flex flex-col pb-4'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-amber-500'>
                      {formatIDR(total)}
                    </h1>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-xs opacity-70 pb-2 border-b-2 border-indigo-500'>
                      {item._sum.besaran.toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className='flex flex-col px-4 py-4 rounded-lg border gap-4'>
              <p className='text-xs opacity-70'>No data available for the month to month.</p>
            </div>
          )}
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex flex-row w-full items-center justify-center gap-8'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-4 h-1.5 rounded-full bg-amber-500' />
              <h6 className='text-sm'>(Alokasi)</h6>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-4 h-1.5 rounded-full bg-indigo-500' />
              <h6 className='text-sm'>(Realisasi)</h6>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardReport