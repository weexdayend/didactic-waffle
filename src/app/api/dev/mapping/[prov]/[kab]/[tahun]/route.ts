// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Params = {
  prov: string;
  kab: string;
  tahun: string;
}

export async function GET(req: NextRequest, context: { params: Params }): Promise<NextResponse> {
  try {

    const { prov, kab, tahun } = context.params

    const base_data = await prisma.fact_map_area.findMany({
      where: {
        kategori: {
          in: ['Gudang', 'Distributor', 'Pengecer'],
        },
        kode_provinsi: prov,
        kode_kab_kota: kab,
        tahun: tahun
      }
    })

    const kodeGudangs: string[] = base_data.map(entry => entry.kode_gudang).filter(Boolean) as string[];
    const data_gudang = await prisma.fact_gudang.findMany({
      where: {
        kode_gudang: {
          in: kodeGudangs
        }
      }
    });

    const kodeDistributors: string[] = base_data.map(entry => entry.kode_distributor).filter(Boolean) as string[];
    const data_distributor = await prisma.fact_distributor.findMany({
      where: {
        kode_distributor: {
          in: kodeDistributors
        }
      }
    });

    const kodePengecers: string[] = base_data.map(entry => entry.kode_pengecer).filter(Boolean) as string[];
    const data_Pengecer = await prisma.fact_kios.findMany({
      where: {
        kode_pengecer: {
          in: kodePengecers
        }
      }
    });

    const validateLongitudeLatitude = (longitude: any, latitude: any): boolean => {
      // Convert longitude and latitude strings to numbers
      const parsedLongitude = parseFloat(longitude);
      const parsedLatitude = parseFloat(latitude);
  
      // Check if the parsed values are valid numbers
      return !isNaN(parsedLongitude) && !isNaN(parsedLatitude);
    };

    const data_gudang_formatted = data_gudang.map(item => {
      const isValid = validateLongitudeLatitude(item.long, item.lat);

      const longitude = item.long ? parseFloat(item.long.replace(',', '.')) : null;
      const latitude = item.lat ? parseFloat(item.lat.replace(',', '.')) : null;

      return {
          kategori: 'Gudang', // Assuming 'Gudang' as the category for data_gudang
          kode: item.kode_gudang,
          nama: item.nama_gudang,
          longitude: longitude != null ? longitude : 0,
          lattitude: latitude != null ? latitude : 0,
          alamat: item.alamat,
          status_location: isValid ? 'valid' : 'not valid'
      };
    });
    
    const data_distributor_formatted = data_distributor.map(item => {
        const isValid = validateLongitudeLatitude(item.long, item.lat);

        const longitude = item.long ? parseFloat(item.long.replace(',', '.')) : null;
        const latitude = item.lat ? parseFloat(item.lat.replace(',', '.')) : null;

        return {
          kategori: 'Distributor', // Assuming 'Distributor' as the category for data_distributor
          kode: item.kode_distributor,
          nama: item.nama_distributor,
          longitude: longitude != null ? longitude : 0,
          lattitude: latitude != null ? latitude : 0,
          alamat: item.alamat,
          status_location: isValid ? 'valid' : 'not valid'
        };
    });
    
    const data_Pengecer_formatted = data_Pengecer.map(item => {
        const isValid = validateLongitudeLatitude(item.long, item.lat);

        const longitude = item.long ? parseFloat(item.long.replace(',', '.')) : null;
        const latitude = item.lat ? parseFloat(item.lat.replace(',', '.')) : null;

        return {
          kategori: 'Pengecer', // Assuming 'Pengecer' as the category for data_Pengecer
          kode: item.kode_pengecer,
          nama: item.nama_pengecer,
          longitude: longitude != null ? longitude : 0,
          lattitude: latitude != null ? latitude : 0,
          alamat: item.alamat,
          status_location: isValid ? 'valid' : 'not valid'
        };
    });
    
    // Merge the formatted arrays into a single array
    const combinedData = [
        ...data_gudang_formatted,
        ...data_distributor_formatted,
        ...data_Pengecer_formatted
    ];

    // let transformedData = data.map(item => {
    //   let transformedItem: any = {
    //     id: item.id,
    //     kode_provinsi: item.kode_provinsi,
    //     kode_kabupaten: item.kode_kabupaten,
    //     kode_kecamatan: item.kode_kecamatan,
    //     kode_gudang: item.Gudang ? item.Gudang.kode_gudang : null,
    //     kode_distributor: item.Distributor ? item.Distributor.kode_distributor : null,
    //     kode_kios: item.Kios ? item.Kios.kode_pengecer : null,
    //     status: item.status,
    //     kategori: item.kategori,
    //   };
      
    //   if (item.Provinsi) {
    //     transformedItem.provinsi = item.Provinsi.nama_provinsi;
    //   }
    
    //   if (item.Gudang) {
    //     transformedItem.kode = item.Gudang.kode_gudang;
    //     transformedItem.nama = item.Gudang.nama_gudang;
    //     transformedItem.long = item.Gudang.long;
    //     transformedItem.lat = item.Gudang.lat;
    //     transformedItem.alamat = item.Gudang.alamat;

    //     if (item.Kecamatan && item.Gudang.kode_gudang === item.Gudang.kode_gudang) {
    //       transformedItem.kecamatan = item.Kecamatan.nama_kecamatan;     
    //     }
    //   }
    
    //   if (item.Distributor) {
    //     transformedItem.kode = item.Distributor.kode_distributor;
    //     transformedItem.nama = item.Distributor.nama_distributor;
    //     transformedItem.long = item.Distributor.long;
    //     transformedItem.lat = item.Distributor.lat;
    //     transformedItem.alamat = item.Distributor.alamat;

    //     if (item.Kecamatan && item.Distributor.kode_distributor === item.Distributor.kode_distributor) {
    //       transformedItem.kecamatan = item.Kecamatan.nama_kecamatan;        
    //     }
    //   }

    //   if (item.Kios) {
    //     transformedItem.kode = item.Kios.kode_pengecer;
    //     transformedItem.nama = item.Kios.nama_pengecer;
    //     transformedItem.long = item.Kios.long;
    //     transformedItem.lat = item.Kios.lat;
    //     transformedItem.alamat = item.Kios.alamat;

    //     if (item.Kecamatan && item.Kios.kode_pengecer === item.Kios.kode_pengecer) {
    //       transformedItem.kecamatan = item.Kecamatan.nama_kecamatan;        
    //     }
    //   }
    
    //   return transformedItem;
    // });

    // const groupedData = transformedData.reduce((acc: { [key: string]: any }, item: any) => {
    //   const key = `${item.kode}-${item.nama}`;
      
    //   if (!acc[key]) {
      //   acc[key] = {
      //     id: item.id,
      //     kode_provinsi: item.kode_provinsi,
      //     kode_kabupaten: item.kode_kabupaten,
      //     kode_kecamatan: item.kode_kecamatan,
      //     kode_gudang: item.kode_gudang,
      //     kode_distributor: item.kode_distributor,
      //     kode_kios: item.kode_kios,
      //     status: item.status,
      //     provinsi: item.provinsi,
      //     kategori: item.kategori,
      //     kode: item.kode,
      //     nama: item.nama,
      //     long: item.long,
      //     lat: item.lat,
      //     alamat: item.alamat,
      //     wilker: [],
      //   };
      // }
    
    //   if (item.kecamatan && !acc[key].wilker.includes(item.kecamatan)) {
    //     acc[key].wilker.push({nama: item.kecamatan});
    //   }
    
    //   return acc;
    // }, {});
    
    // const transform = Object.values(groupedData);    
    
    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(combinedData), {
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
