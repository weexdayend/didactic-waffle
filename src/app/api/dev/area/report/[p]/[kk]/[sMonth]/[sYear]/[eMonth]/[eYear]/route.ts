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
  try {

    const { p, kk, sMonth, sYear, eMonth, eYear } = context.params;

    let whereClause: any = {
      bulan: {
        gte: Number(sMonth),
        lte: Number(eMonth),
      },
      tahun: {
        gte: Number(sYear),
        lte: Number(eYear),
      },
      OR: [],
    };
    
    // Add kode_provinsi condition to OR clause if p is not 'all'
    if (p !== 'all') {
      whereClause.OR.push({
        kode_provinsi: p,
      });
    }
    
    // Add kode_kab_kota condition to OR clause if kk is not 'all'
    if (kk !== 'all') {
      whereClause.OR.push({
        kode_kab_kota: {
          contains: kk,
        },
      });
    }
    
    // If OR array is empty, remove it from the whereClause
    if (whereClause.OR.length === 0) {
      delete whereClause.OR;
    }

    const f5 = await prisma.mart_accumulation_products_f5_wilayah.groupBy({
      by: ['nama_produk', 'keterangan'],
      _sum: {
        besaran: true,
        total: true,
      },
      where: whereClause,
    });

    const f6 = await prisma.mart_accumulation_products_f6_wilayah.groupBy({
      by: ['nama_produk', 'keterangan'],
      _sum: {
        besaran: true,
        total: true,
      },
      where: whereClause,
    });

    let data = {
      f5: f5,
      f6: f6,
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
