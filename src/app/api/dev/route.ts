// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getMatch(wilayah: any[], mapping: any[], provinsiIds: string[], id: string) {
  return mapping
    .filter(entry => {
        // Check if the dynamic ID exists and is included in provinsiIds
        return entry[id] && provinsiIds.includes(entry[id]);
    })
    .filter(entry => {
        // Check if the kategori from wilayah and mapping entries are the same
        const wilayahEntry = wilayah.find(w => w.id === entry[id]);
        return wilayahEntry?.kategori === entry.kategori;
    })
    .map(entry => {
        // Find the corresponding wilayah entry
        const wilayahEntry = wilayah.find(w => w.id === entry[id]);
        // Return the merged entry with additional properties
        return {
            ...entry,
            name: wilayahEntry?.nama,
        };
    });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {

    // Fetch profiles from the database
    const profile = await prisma.profile.findMany({
      where: {
        OR: [
          { longitude: { not: null } },
          { lattitude: { not: null } },
        ],
      },
    });

    // Initialize arrays to hold completed, error, and not valid data
    const data_completed: any[] = [];
    const data_error: any[] = [];
    const data_notvalid: any[] = [];

    // Iterate through the profile data and categorize based on long and lat values
    profile.forEach((profileItem: any) => {
      const lattitude = parseFloat(profileItem.lattitude as string);
      const longitude = parseFloat(profileItem.longitude as string);
      // Check if long and lat are valid numbers and not equal to 0
      if (isNaN(lattitude) && isNaN(longitude)) {
        data_error.push(profileItem);
      } else if (
        profileItem.longitude === '0' &&
        profileItem.lattitude === '0' ||
        (typeof profileItem.longitude === 'string' && profileItem.longitude.includes('.')) ||
        (typeof profileItem.lattitude === 'string' && profileItem.lattitude.includes('.'))
      ) {
        data_notvalid.push(profileItem);
      } else {
        if (profileItem.lattitude && profileItem.longitude){
          // Refactor latitude and longitude format
          const lat = parseFloat(profileItem.lattitude.toString().replace(',', '.'));
          const long = parseFloat(profileItem.longitude.toString().replace(',', '.'));
          data_completed.push({ ...profileItem, lat, long });
        }
      }
    });

    // Construct the response object
    const response = {
      data_completed: data_completed,
      data_error: data_error,
      data_notvalid: data_notvalid
    };

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
    console.log('🔴 Error', error)
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
