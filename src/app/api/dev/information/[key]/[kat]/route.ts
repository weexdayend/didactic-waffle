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
    let ids = key.toString()

    let data;
    const load = await prisma.profile.findMany({
      where: {
        kode: key,
        status: true
      },
      include: {
        [kat]: {
          where: {
            kategori: kat,
            status: true
          },
          include: {
            Provinsi: true,
            Kotakab: true,
            Kecamatan: true,
          }
        }
      }
    });

    const transformedData = load.flatMap((profile: any) => {
      if (profile[kat] && profile[kat].length > 0) {
        return profile[kat].map((item: any) => {
          return {
            // Spread profile properties
            id: profile.id,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
            deleted_at: profile.deleted_at,
            kategori: profile.kategori,
            kode: profile.kode,
            nama: profile.nama,
            long: profile.long,
            lat: profile.lat,
            alamat: profile.alamat,
            status: profile.status,
            provinsi: item.Provinsi.nama,
            kabupaten: item.Kotakab.nama,
            kecamatan: item.Kecamatan.nama
          };
        });
      } else {
        // If no data for the specified category, return an empty array
        return {
          // Spread profile properties
          id: profile.id,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          deleted_at: profile.deleted_at,
          kategori: profile.kategori,
          kode: profile.kode,
          nama: profile.nama,
          long: profile.long,
          lat: profile.lat,
          alamat: profile.alamat,
          status: profile.status,
          provinsi: null,
          kabupaten: null,
          kecamatan: null
        };
      }
    });

    data = transformedData

    let distribusi: any;
    if ( kat === 'Distributor' ) {
      distribusi = await prisma.mart_accumulation_products_f5_distributor.findMany({
        where: {
          kode_distributor: ids
        },
        select: {
          nama_produk: true,
          besaran: true,
          total: true,
          keterangan: true,
          bulan: true,
          tahun: true
        }
      })
    } else if ( kat === 'Kios' ) {
      distribusi = await prisma.mart_accumulation_products_f6_kios.findMany({
        where: {
          kode_pengecer: ids
        },
        select: {
          nama_produk: true,
          besaran: true,
          total: true,
          keterangan: true,
          bulan: true,
          tahun: true
        }
      })
    } else {
      distribusi = [];
    }

    const serializeBigInt = (items: any[]) => {
      return distribusi.map((item: any) => ({
        ...item,
        bulan: item.bulan.toString(),
        tahun: item.tahun.toString(),
      }));
    };

    const result = {
      data,
      distribusi: serializeBigInt(distribusi)
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
