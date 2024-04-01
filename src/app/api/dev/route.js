// Import the necessary modules
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Fetch profiles from the database
    const profile = await prisma.profile.findMany();

    // Initialize arrays to hold completed, error, and not defined data
    const data_completed= [];
    const data_error = [];
    const data_notvalid = [];

    // Iterate through the profile data and categorize based on long and lat values
    profile.forEach((profileItem) => {
      const lat = parseFloat(profileItem.lat);
      const long = parseFloat(profileItem.long);
      // Check if long and lat are valid numbers and not equal to 0
      if (isNaN(lat) && isNaN(long)) {
        data_error.push(profileItem);
      } else if (
        profileItem.long === '0' &&
        profileItem.lat === '0' ||
        (typeof profileItem.long === 'string' && profileItem.long.includes('.')) ||
        (typeof profileItem.lat === 'string' && profileItem.lat.includes('.'))
      ) {
        data_notvalid.push(profileItem);
      } else {
        data_completed.push(profileItem);
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

    // Return the response
    return Response.json(response);
  } catch (error) {
    console.log('🔴 Error', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
