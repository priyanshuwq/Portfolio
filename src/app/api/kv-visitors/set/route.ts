import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

export async function POST(request: Request) {
  try {
    if (!BIN_ID || !API_KEY) {
      throw new Error('JSONbin credentials not configured');
    }

    const body = await request.json();
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`JSONbin API error: ${response.status}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[KV Visitors] Set error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save' },
      { status: 500 }
    );
  }
}
