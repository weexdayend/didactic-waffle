import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  p: string;
  kk: string;
  sMonth: string;
  sYear: string;
  eMonth: string;
  eYear: string;
}
  
export async function GET(req: Request, context: { params: Params }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString(); // getMonth() is zero-based

  // Prepare string representations for month range queries
  const startOfYearMonth = '1';  // January
  const endOfCurrentMonth = currentMonth;  // Current month

  try {

    const { p, kk, sMonth, sYear, eMonth, eYear } = context.params;

    const today = new Date();
    const formatbulan = (today.getMonth() + 1).toString();

    let whereClause: any = {
      tahun: {
        gte: Number(sYear),
        lte: Number(eYear),
      },
      kode_provinsi: p,
      kode_kab_kota: kk
    };

    const yearly = await prisma.$transaction(async (tx) => {
      const f5 = await prisma.mart_accumulation_products_f5_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: whereClause,
      });
  
      const f6 = await prisma.mart_accumulation_products_f6_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: whereClause,
      });

      return { f5, f6 }
    })
  
    const currmonth = await prisma.$transaction(async (tx) => {
      const f5 = await tx.mart_accumulation_products_f5_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          ...whereClause,
          bulan: currentMonth,
          tahun: currentYear,
        },
      })

      const f6 = await tx.mart_accumulation_products_f6_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          ...whereClause,
          bulan: currentMonth,
          tahun: currentYear,
        },
      })

      return { f5, f6 }
    });
  
    const mtm = await prisma.$transaction(async (tx) => {
      const f5 = await prisma.mart_accumulation_products_f5_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          ...whereClause,
          bulan: {
            gte: startOfYearMonth,
            lte: endOfCurrentMonth,
          },
          tahun: currentYear,
        },
      }); 

      const f6 = await prisma.mart_accumulation_products_f6_wilayah.groupBy({
        by: ['kode_produk', 'nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          ...whereClause,
          bulan: {
            gte: startOfYearMonth,
            lte: endOfCurrentMonth,
          },
          tahun: currentYear,
        },
      });

      return { f5, f6 }
    })

    let data = {
      yearly: yearly,
      currmonth: currmonth,
      mtm: mtm,
    };

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log('🔴 Error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
