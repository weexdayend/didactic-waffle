import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  key: string;
  resource: string;
}
  
export async function GET(req: Request, context: { params: Params }) {
  try {    
    const { resource } = context.params

    let key = context.params.key || '';
    key = key.charAt(0).toUpperCase() + key.slice(1);

    let mapping = key
    
    let data;
    let load;
    if (resource === 'wilayah') {
      if (key === 'Provinsi') {
        load = await prisma.wilayah.findMany({
          where: {
            kategori: key,
            status_wilayah: true
          },
        });
  
        data = load

      } else if (key === 'Kotakab') {
        load = await prisma.wilayah.findMany({
          where: {
            OR: [
              {kategori: 'Kota'},
              {kategori: 'Kabupaten'}
            ],
            status_wilayah: true
          },
          include: {
            Kotakab: {
              include: {
                Provinsi: true
              }
            }
          }
        });
        const transformedData = load.map((profile: any) => {
          // Check if map_keca exists and has at least one element
          if (profile[mapping]) {
              // Destructure map_keca from profile
              const {
                  id_provinsi,
                  Provinsi,
              } = profile[mapping];
      
              return {
                  // Spread profile properties
                  id: profile.id,
                  created_at: profile.created_at,
                  updated_at: profile.updated_at,
                  deleted_at: profile.deleted_at,
                  kategori: profile.kategori,
                  kode: profile.kode,
                  nama: profile.nama,
                  longitude: profile.longitude,
                  lattitude: profile.lattitude,
                  alamat: profile.alamat,
                  status: profile.status,
                  // Spread map_keca properties
                  id_provinsi,
                  provinsi: Provinsi.nama
              };
          } else {
              // If map_keca does not exist or is empty, return an object with default values
              return {
                  id: profile.id,
                  created_at: profile.created_at,
                  updated_at: profile.updated_at,
                  deleted_at: profile.deleted_at,
                  kategori: profile.kategori,
                  kode: profile.kode,
                  nama: profile.nama,
                  longitude: profile.longitude,
                  lattitude: profile.lattitude,
                  alamat: profile.alamat,
                  status: profile.status,
                  id_provinsi: null,
                  provinsi: null,
              };
            }
        });
  
        data = transformedData
        
        data.sort((a: any, b: any) => {
          const namaA = a.nama.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
          const namaB = b.nama.toUpperCase();
        
          if (namaA < namaB) {
            return -1;
          }
          if (namaA > namaB) {
            return 1;
          }
          return 0;
        });
      } else {
        load = await prisma.wilayah.findMany({
          where: {
            kategori: key,
            status_wilayah: true
          },
          include: {
            [mapping]: {
              where: {
                kategori: key,
                status: true
              },
              include: {
                Provinsi: true,
                Kotakab: true,
                Kecamatan: true
              }
            }
          }
        });

        const transformedData = load.map((profile: any) => {
          // Check if map_keca exists and has at least one element
          if (profile[mapping]) {
              // Destructure map_keca from profile
              const {
                  id_provinsi,
                  id_kabupaten,
                  id_kecamatan,
                  Provinsi,
                  Kotakab,
              } = profile[mapping];
      
              return {
                  // Spread profile properties
                  id: profile.id,
                  created_at: profile.created_at,
                  updated_at: profile.updated_at,
                  deleted_at: profile.deleted_at,
                  kategori: profile.kategori,
                  kode: profile.kode,
                  nama: profile.nama,
                  longitude: profile.longitude,
                  lattitude: profile.lattitude,
                  alamat: profile.alamat,
                  status: profile.status,
                  // Spread map_keca properties
                  id_provinsi,
                  id_kabupaten,
                  id_kecamatan,
                  provinsi: Provinsi.nama,
                  kabupaten: Kotakab.nama
              };
          } else {
              // If map_keca does not exist or is empty, return an object with default values
              return {
                  id: profile.id,
                  created_at: profile.created_at,
                  updated_at: profile.updated_at,
                  deleted_at: profile.deleted_at,
                  kategori: profile.kategori,
                  kode: profile.kode,
                  nama: profile.nama,
                  longitude: profile.longitude,
                  lattitude: profile.lattitude,
                  alamat: profile.alamat,
                  status: profile.status,
                  id_provinsi: null,
                  id_kabupaten: null,
                  id_kecamatan: null,
                  provinsi: null,
                  kabupaten: null,
              };
            }
        });
  
        data = transformedData
        
        data.sort((a: any, b: any) => {
          const namaA = a.nama.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
          const namaB = b.nama.toUpperCase();
        
          if (namaA < namaB) {
            return -1;
          }
          if (namaA > namaB) {
            return 1;
          }
          return 0;
        });
      }
    } else if (resource === 'profile') {
      const load = await prisma.profile.findMany({
        where: {
          kategori: key,
          status_profile: true
        },
        include: {
          [mapping]: {
            where: {
              kategori: key,
              status: true
            },
            include: {
              Provinsi: true,
              Kotakab: true,
              Kecamatan: true,
              Gudang: true,
              Distributor: true,
              Kios: true
            }
          }
        }
      });

      const transformedData = load.map((profile: any) => {
        // Check if map_dist exists and has at least one element
        if (profile[mapping] && profile[mapping].length > 0) {
          // Destructure map_dist from profile
          const {
            id_provinsi,
            id_kabupaten,
            id_kecamatan,
            id_gudang,
            id_distributor,
            id_kios,
            Provinsi,
            Kotakab,
            Kecamatan
          } = profile[mapping][0];
      
          return {
            // Spread profile properties
            id: profile.id,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
            deleted_at: profile.deleted_at,
            kategori: profile.kategori,
            kode: profile.kode,
            nama: profile.nama,
            longitude: profile.longitude,
            lattitude: profile.lattitude,
            alamat: profile.alamat,
            status: profile.status_wilayah,
            // Spread map_dist properties
            id_provinsi,
            id_kabupaten,
            id_kecamatan,
            id_gudang,
            id_distributor,
            id_kios,
            provinsi: Provinsi.nama,
            kabupaten: Kotakab.nama,
            kecamatan: Kecamatan.nama
          };
        } else {
          // If map_dist does not exist or is empty, return an object with default values
          return {
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
            id_provinsi: null,
            id_kabupaten: null,
            id_kecamatan: null,
            id_gudang: null,
            id_distributor: null,
            id_kios: null,
            provinsi: null,
            kabupaten: null,
            kecamatan: null
          };
        }
      });

      data = transformedData
      
      data.sort((a: any, b: any) => {
        const namaA = a.nama.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
        const namaB = b.nama.toUpperCase();
      
        if (namaA < namaB) {
          return -1;
        }
        if (namaA > namaB) {
          return 1;
        }
        return 0;
      });
    } else {
      // Handle invalid or unsupported resource
      return new NextResponse(JSON.stringify({ error: 'Invalid resource: ' + context.params.resource }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
