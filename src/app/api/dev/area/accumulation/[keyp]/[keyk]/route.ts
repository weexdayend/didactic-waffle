import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  keyp: string,
  keyk: string
}

interface TotalAreaItem {
  total: number;
  key: string;
  name: string;
  resource: string;
}

interface TotalAreaResponse {
  total_area: TotalAreaItem[];
}

export async function GET(req: NextRequest, context: { params: Params }): Promise<NextResponse> {
  try {
    const { keyp, keyk } = context.params;

    let data;
    if ( keyp === 'all' && keyk === 'all') {
      data = await prisma.mapping_profile.findMany();
    } else if ( keyp !== 'all' && keyk === 'all' ) {
      data = await prisma.mapping_profile.findMany({
        where: {
          id_provinsi: keyp,
        }
      });
    } else {
      data = await prisma.mapping_profile.findMany({
        where: {
          id_provinsi: keyp,
          id_kabupaten: keyk
        }
      });
    }
    
    const wilayahCategoriesCount: Record<string, number> = data.reduce((acc: any, curr: any) => {
      if (curr && curr.kategori) {
        acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
      }
      return acc;
    }, {});

    const totalCategoriesCount: Record<string, number> = { ...wilayahCategoriesCount };

    delete totalCategoriesCount['Kota'];
    delete totalCategoriesCount['Kabupaten'];
    delete totalCategoriesCount['Provinsi'];

    let response;
    if ( data.length === 0 ) {
      response = {
        total_area: []
      }
    } else {
      const calculate: TotalAreaResponse = {
        total_area: Object.keys(totalCategoriesCount).map((category: string) => {
          let key = category.toLowerCase();
          if (category === 'Kota/Kab') {
            key = 'kotakab';
          }
          const name = category
      
          let resource = '';
          if (category === 'Provinsi') {
            resource = 'wilayah';
          } else if (category === 'Kota/Kab') {
            resource = 'wilayah';
          } else if (category === 'Kecamatan') {
            resource = 'wilayah';
          } else if (category === 'Gudang') {
            resource = 'profile';
          } else if (category === 'Distributor') {
            resource = 'profile';
          } else if (category === 'Kios') {
            resource = 'profile';
          }
      
          return {
            total: totalCategoriesCount[category],
            key,
            name,
            resource
          }
        })
      };
      
      response = calculate;
    }

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(response), {
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
