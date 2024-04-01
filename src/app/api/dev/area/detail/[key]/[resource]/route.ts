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
    
    let data;
    if (resource === 'wilayah') {
      data = await prisma.wilayah.findMany({
        where: {
          kategori: key,
          status: true
        }
      });
    } else if (resource === 'profile') {
      data = await prisma.profile.findMany({
        where: {
          kategori: key,
          status: true
        }
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
