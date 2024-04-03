// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { getMatch, populateGroupedData, populatedKiosData } from '@/lib/functions';
import { GroupedData } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const wilayah = await prisma.wilayah.findMany();
    const profile = await prisma.profile.findMany();
    const mapping = await prisma.mapping_profile.findMany();

    const provinsiIds = wilayah
      .filter(entry => entry.kategori === 'Provinsi')
      .map(entry => entry.kode)
    const matchProvinsi = getMatch(wilayah, mapping, provinsiIds, 'id_provinsi')

    const kotakabIds = wilayah
      .filter(entry => entry.kategori === 'Kota' || 'Kabupaten')
      .map(entry => entry.kode);
    const matchKotaKabupaten = getMatch(wilayah, mapping, kotakabIds, 'id_kabupaten');

    const kecamatanIds = wilayah
      .filter(entry => entry.kategori === 'Kecamatan')
      .map(entry => entry.kode);
    const matchKecamatan = getMatch(wilayah, mapping, kecamatanIds, 'id_kecamatan');

    const gudangIds = profile
      .filter(entry => entry.kategori === 'Gudang')
      .map(entry => entry.kode)
    const matchGudang = getMatch(profile, mapping, gudangIds, 'id_gudang');

    const distributorIds = profile
      .filter(entry => entry.kategori === 'Distributor')
      .map(entry => entry.kode)
    const matchDistributor = getMatch(profile, mapping, distributorIds, 'id_distributor');

    const kiosIds = profile
      .filter(entry => entry.kategori === 'Kios')
      .map(entry => entry.kode)
    const matchKios = getMatch(profile, mapping, kiosIds, 'id_kios');

    // const populatedData = populatedKiosData(matchDistributor, matchKios);
    // const populatedArray = Object.values(populatedData);

    const groupedData: GroupedData = populateGroupedData(matchProvinsi, matchKotaKabupaten, matchKecamatan, matchGudang, matchDistributor, matchKios);
    const groupedArray = Object.values(groupedData);

    // // Fetch profiles from the database
    // const profile = await prisma.profile.findMany();

    // // Initialize arrays to hold completed, error, and not valid data
    // const data_completed: any[] = [];
    // const data_error: any[] = [];
    // const data_notvalid: any[] = [];

    // // Iterate through the profile data and categorize based on long and lat values
    // profile.forEach((profileItem) => {
    //   const lat = parseFloat(profileItem.lat as string);
    //   const long = parseFloat(profileItem.long as string);
    //   // Check if long and lat are valid numbers and not equal to 0
    //   if (isNaN(lat) && isNaN(long)) {
    //     data_error.push(profileItem);
    //   } else if (
    //     profileItem.long === '0' &&
    //     profileItem.lat === '0' ||
    //     (typeof profileItem.long === 'string' && profileItem.long.includes('.')) ||
    //     (typeof profileItem.lat === 'string' && profileItem.lat.includes('.'))
    //   ) {
    //     data_notvalid.push(profileItem);
    //   } else {
    //     data_completed.push(profileItem);
    //   }
    // });

    // // Construct the response object
    // const response = {
    //   data_completed: data_completed,
    //   data_error: data_error,
    //   data_notvalid: data_notvalid
    // };

    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', '*');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(JSON.stringify(groupedArray), {
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
