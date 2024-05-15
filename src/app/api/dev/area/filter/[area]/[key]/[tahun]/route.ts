import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  area: string;
  tahun: string;
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    let area = context.params.area || '';
    area = area.charAt(0).toUpperCase() + area.slice(1);

    let data;
    if ( area === 'Provinsi') {
      const load = await prisma.fact_map_area.findMany({
        where: {
          kategori: 'Provinsi',
        },
        include: {
          Provinsi: true
        },
      })
      
      const transformedData = load.map((profile: any) => {
        if (profile['Provinsi']) {
          return {
              id_provinsi: profile.kode_provinsi,
              kategori: profile.kategori,
              kode: profile['Provinsi'].kode_provinsi,
              nama: profile['Provinsi'].nama_provinsi,
          };
        }
      })
      data = transformedData

    } else {
      const load = await prisma.fact_map_area.findMany({
        where: {
          OR: [
            { kategori: 'Kota' },
            { kategori: 'Kabupaten' }
          ]
        },
        include: {
          Kotakab: true
        }
      })

      const transformedData = load.map((profile: any) => {
        if (profile['Kotakab']) {
          return {
              id_provinsi: profile.kode_provinsi,
              kategori: profile.kategori,
              kode: profile['Kotakab'].kode_kab_kota,
              nama: profile['Kotakab'].nama_kab_kota,
          };
        }
      })
      data = transformedData
    }

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
