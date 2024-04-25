// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Params = {
  prov: string;
  kab: string;
}

export async function GET(req: NextRequest, context: { params: Params }): Promise<NextResponse> {
  try {

    const { prov, kab } = context.params

    let whereClause: any = {
      kategori: {
        in: ['Gudang', 'Distributor', 'Kios'],
      },
      OR: [],
    };
    
    // Add kode_provinsi condition to OR clause if p is not 'all'
    if (prov !== 'all') {
      whereClause.OR.push({
        id_provinsi: prov,
      });
    }
    
    // Add kode_kab_kota condition to OR clause if kk is not 'all'
    if (kab !== 'all') {
      whereClause.OR.push({
        id_kabupaten: {
          contains: kab,
        },
      });
    }

    if (whereClause.OR.length === 0) {
      delete whereClause.OR;
    }

    let data;
    if ( prov === 'all' && kab === 'all') {
      data = await prisma.mapping_profile.findMany({
        where: whereClause,
        include: {
          Gudang: true,
          Distributor: true,
          Kios: true,
          Kecamatan: true,
          Provinsi: true,
        }
      })
    } else {
      data = await prisma.mapping_profile.findMany({
        where: whereClause,
        include: {
          Gudang: true,
          Distributor: true,
          Kios: true,
          Kecamatan: true,
          Provinsi: true,
        }
      })
    }

    let transformedData = data.map(item => {
      let transformedItem: any = {
        id: item.id,
        id_provinsi: item.id_provinsi,
        id_kabupaten: item.id_kabupaten,
        id_kecamatan: item.id_kecamatan,
        id_gudang: item.Gudang ? item.Gudang.id : null,
        id_distributor: item.Distributor ? item.Distributor.kode : null,
        id_kios: item.Kios ? item.Kios.id : null,
        status: item.status,
        kategori: item.kategori,
      };
      
      if (item.Provinsi) {
        transformedItem.provinsi = item.Provinsi.nama;
      }
    
      if (item.Gudang) {
        transformedItem.kode = item.Gudang.kode;
        transformedItem.nama = item.Gudang.nama;
        transformedItem.long = item.Gudang.long;
        transformedItem.lat = item.Gudang.lat;
        transformedItem.alamat = item.Gudang.alamat;

        if (item.Kecamatan && item.Gudang.kode === item.Gudang.kode) {
          transformedItem.kecamatan = item.Kecamatan.nama;     
        }
      }
    
      if (item.Distributor) {
        transformedItem.kode = item.Distributor.kode;
        transformedItem.nama = item.Distributor.nama;
        transformedItem.long = item.Distributor.long;
        transformedItem.lat = item.Distributor.lat;
        transformedItem.alamat = item.Distributor.alamat;

        if (item.Kecamatan && item.Distributor.kode === item.Distributor.kode) {
          transformedItem.kecamatan = item.Kecamatan.nama;        
        }
      }

      if (item.Kios) {
        transformedItem.kode = item.Kios.kode;
        transformedItem.nama = item.Kios.nama;
        transformedItem.long = item.Kios.long;
        transformedItem.lat = item.Kios.lat;
        transformedItem.alamat = item.Kios.alamat;

        if (item.Kecamatan && item.Kios.kode === item.Kios.kode) {
          transformedItem.kecamatan = item.Kecamatan.nama;        
        }
      }
    
      return transformedItem;
    });

    const groupedData = transformedData.reduce((acc: { [key: string]: any }, item: any) => {
      const key = `${item.kode}-${item.nama}`;
      
      if (!acc[key]) {
        acc[key] = {
          id: item.id,
          id_provinsi: item.id_provinsi,
          id_kabupaten: item.id_kabupaten,
          id_kecamatan: item.id_kecamatan,
          id_gudang: item.id_gudang,
          id_distributor: item.id_distributor,
          id_kios: item.id_kios,
          status: item.status,
          provinsi: item.provinsi,
          kategori: item.kategori,
          kode: item.kode,
          nama: item.nama,
          long: item.long,
          lat: item.lat,
          alamat: item.alamat,
          wilker: [],
        };
      }
    
      if (item.kecamatan && !acc[key].wilker.includes(item.kecamatan)) {
        acc[key].wilker.push({nama: item.kecamatan});
      }
    
      return acc;
    }, {});
    
    const transform = Object.values(groupedData);    
    
    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(transform), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log('🔴 Error', error)
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
