import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

export async function GET() {
  try {
    if (!BIN_ID || !API_KEY) {
      throw new Error('JSONbin credentials not configured');
    }

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`JSONbin API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data.record);
  } catch (error) {
    console.error('[KV Visitors] Get error:', error);
    return NextResponse.json(
      { count: 0, lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
