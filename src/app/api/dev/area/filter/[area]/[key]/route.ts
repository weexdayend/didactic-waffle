import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  area: string;
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    let area = context.params.area || '';
    area = area.charAt(0).toUpperCase() + area.slice(1);

    let data;
    if ( area === 'Provinsi') {
      data = await prisma.fact_wilayah.findMany({
        where: {
          kategori: area,
          status: true
        }
      })
    } else {
      const load = await prisma.mapping_profile.findMany({
        where: {
          OR: [
            { kategori: 'Kota' },
            { kategori: 'Kabupaten' }
          ],
          status: true
        },
        include: {
          Kotakab: true
        }
      })

      const transformedData = load.map((profile: any) => {
        if (profile['Kotakab']) {
          return {
              id: profile.id,
              id_provinsi: profile.id_provinsi,
              kategori: profile['Kotakab'].kategori,
              kode: profile['Kotakab'].kode,
              nama: profile['Kotakab'].nama,
              long: profile['Kotakab'].long,
              lat: profile['Kotakab'].lat,
              alamat: profile['Kotakab'].alamat,
              status: profile['Kotakab'].status_mapping
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
