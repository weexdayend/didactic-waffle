import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  key: any;
  kat: any;
  sMonth: string;
  sYear: string;
  eMonth: string;
  eYear: string;
}
  
export async function GET(req: Request, context: { params: Params }) {
  try {
    const { key, kat, sMonth, sYear, eMonth, eYear } = context.params
    let ids = key.toString()

    let distribusi: any;
    if ( kat === 'distributor' ) {
      distribusi = await prisma.mart_accumulation_products_f5_distributor.groupBy({
        by: ['nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          bulan: {
            gte: Number(sMonth),
            lte: Number(eMonth),
          },
          tahun: {
            gte: Number(sYear),
            lte: Number(eYear),
          },
          kode_distributor: ids
        },
      })
    } else if ( kat === 'kios' ) {
      distribusi = await prisma.mart_accumulation_products_f6_kios.groupBy({
        by: ['nama_produk', 'keterangan'],
        _sum: {
          besaran: true,
          total: true,
        },
        where: {
          bulan: {
            gte: Number(sMonth),
            lte: Number(eMonth),
          },
          tahun: {
            gte: Number(sYear),
            lte: Number(eYear),
          },
          kode_pengecer: ids
        },
      })
    } else {
      distribusi = [];
    }

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response
    return new NextResponse(JSON.stringify(distribusi), {
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
