// Import the necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = {
  prov: string;
  kab: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {

    // Fetch profiles from the database
    const profile = await prisma.fact_profile.findMany();

    // Initialize arrays to hold completed, error, and not valid data
    const data_completed: any[] = [];

    // Iterate through the profile data and categorize based on long and lat values
    profile.forEach((profileItem: any) => {
      const lat = parseFloat(profileItem.lat.toString().replace(',', '.'));
      const long = parseFloat(profileItem.long.toString().replace(',', '.'));
      data_completed.push({ ...profileItem, lat, long });
    });

    // Construct the response object
    const response = {
      data_completed: data_completed,
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
