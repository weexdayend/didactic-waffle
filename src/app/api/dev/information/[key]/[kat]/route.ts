import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  key: any;
  kat: any;
}
  
export async function GET(req: Request, context: { params: Params }) {
  try {
    const { key, kat } = context.params

    let detail_information;
    let wilker_information;
    
    const filterDetail = {
      [kat === 'Gudang' ? 'kode_gudang' : kat === 'Distributor' ? 'kode_distributor' : 'kode_pengecer']: key,
    };

    const filterWilker = {
      [kat === 'Gudang' ? 'kode_gudang' : kat === 'Distributor' ? 'kode_distributor' : 'kode_pengecer']: key,
      kategori: kat
    };

    [detail_information, wilker_information] = await Promise.all([
      (prisma as any)[kat === 'Gudang' ? 'fact_gudang' : kat === 'Distributor' ? 'fact_distributor' : 'fact_kios'].findMany({
        where: filterDetail
      }),
      prisma.fact_map_area.findMany({
        where: filterWilker,
        include: {
          Kecamatan: true
        }
      })
    ]);

    const propertyMap: { [key: string]: any } = {
      Gudang: { 
        kode: 'kode_gudang', 
        nama: 'nama_gudang', 
        kategori: 'Gudang' 
      },
      Distributor: { 
        kode: 'kode_distributor', 
        nama: 'nama_distributor', 
        kategori: 'Distributor',
      },
      Pengecer: { 
        kode: 'kode_pengecer', 
        nama: 'nama_pengecer',
        kategori: 'Pengecer',
      },
    };

    const formatted_information = detail_information.map((item: any) => {
      const { kode, nama, kategori } = propertyMap[kat];
      return {
        kode: item[kode],
        nama: item[nama],
        kategori,
        alamat: item.alamat
      };
    });
    
    const formatted_wilker = wilker_information.map(item => ({
      kode: item?.Kecamatan?.kode_kecamatan || null,
      nama: item?.Kecamatan?.nama_kecamatan || null
    }));

    const result = {
      information: formatted_information,
      wilker: formatted_wilker
    };

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response
    return new NextResponse(JSON.stringify(result), {
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
