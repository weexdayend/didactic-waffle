import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  area: string;
}
  
export async function GET(req: Request, context: { params: Params }) {
  try {
    const f5 = await prisma.mart_accumulation_products_f5_global.findMany({
      select: {
        nama_produk: true,
        bulan: true,
        tahun: true,
        besaran: true,
        total: true,
        keterangan: true,
      }
    })
    const f6 = await prisma.mart_accumulation_products_f6_global.findMany({
      select: {
        nama_produk: true,
        bulan: true,
        tahun: true,
        besaran: true,
        total: true,
        keterangan: true,
      }
    })

    // Serialize BigInt to string for bulan and tahun
    const serializeBigInt = (items: any[]) => {
      return items.map((item) => ({
        ...item,
        bulan: item.bulan.toString(),
        tahun: item.tahun.toString(),
      }));
    };

    let data = {
      f5: serializeBigInt(f5),
      f6: serializeBigInt(f6),
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
