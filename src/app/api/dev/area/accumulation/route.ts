import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TotalAreaItem {
  total: number;
  key: string;
  name: string;
  resource: string;
}

interface TotalAreaResponse {
  total_area: TotalAreaItem[];
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Fetch profiles from the database
    const wilayah = await prisma.wilayah.findMany();
    const profile = await prisma.profile.findMany();
    
    // Count occurrences of categories in the wilayah table
    const wilayahCategoriesCount: Record<string, number> = wilayah.reduce((acc: any, curr: any) => {
      if (curr && curr.kategori) {
        acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
      }
      return acc;
    }, {});

    // Count occurrences of categories in the profile table
    const profileCategoriesCount: Record<string, number> = profile.reduce((acc: any, curr: any) => {
      if (curr && curr.kategori) {
        acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
      }
      return acc;
    }, {});

    // Merge the counts from both tables into one object
    const totalCategoriesCount: Record<string, number> = { ...wilayahCategoriesCount, ...profileCategoriesCount };

    // Merge counts of Kota and Kabupaten
    const kotaKabupatenCount = (totalCategoriesCount['Kota'] || 0) + (totalCategoriesCount['Kabupaten'] || 0);

    // Remove separate counts for Kota and Kabupaten
    delete totalCategoriesCount['Kota'];
    delete totalCategoriesCount['Kabupaten'];

    // Add merged count of Kota and Kabupaten
    totalCategoriesCount['Kota/Kab'] = kotaKabupatenCount;

    const response: TotalAreaResponse = {
      total_area: Object.keys(totalCategoriesCount).map((category: string) => {
        let key = category.toLowerCase();
        if (category === 'Kota/Kab') {
          key = 'kotakab';
        }
        const name = category; // Assuming name is the same as category
    
        // Determine the resource based on the category
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
        };
      })
    };

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response
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
