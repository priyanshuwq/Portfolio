import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const VISITORS_FILE = path.join(process.cwd(), 'visitors-count.json');
const KV_STORAGE_URL = process.env.VISITOR_COUNT_API_URL; // External storage API URL
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface VisitorData {
  count: number;
  lastUpdated: string;
}

// File-based storage (local development fallback)
function readVisitorCountFromFile(): VisitorData {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = fs.readFileSync(VISITORS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('[Visitors] File read error:', error);
  }
  return { count: 0, lastUpdated: new Date().toISOString() };
}

function writeVisitorCountToFile(data: VisitorData): void {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('[Visitors] File write error:', error);
  }
}

// External persistent storage (production)
async function readVisitorCountFromKV(): Promise<VisitorData> {
  try {
    if (!KV_STORAGE_URL) {
      throw new Error('KV_STORAGE_URL not configured');
    }
    
    const response = await fetch(`${KV_STORAGE_URL}/get`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('[Visitors] KV read error:', error);
  }
  
  // Fallback to file if KV fails
  return readVisitorCountFromFile();
}

async function writeVisitorCountToKV(data: VisitorData): Promise<void> {
  try {
    if (!KV_STORAGE_URL) {
      throw new Error('KV_STORAGE_URL not configured');
    }
    
    await fetch(`${KV_STORAGE_URL}/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store'
    });
  } catch (error) {
    console.error('[Visitors] KV write error:', error);
    // Fallback to file if KV fails
    writeVisitorCountToFile(data);
  }
}

// Unified interface
async function readVisitorCount(): Promise<VisitorData> {
  if (IS_PRODUCTION && KV_STORAGE_URL) {
    return await readVisitorCountFromKV();
  }
  return readVisitorCountFromFile();
}

async function writeVisitorCount(data: VisitorData): Promise<void> {
  if (IS_PRODUCTION && KV_STORAGE_URL) {
    await writeVisitorCountToKV(data);
  } else {
    writeVisitorCountToFile(data);
  }
}

export async function GET() {
  const data = await readVisitorCount();
  return NextResponse.json({ count: data.count });
}

export async function POST() {
  const data = await readVisitorCount();
  data.count += 1;
  data.lastUpdated = new Date().toISOString();
  await writeVisitorCount(data);
  
  return NextResponse.json({ count: data.count });
}
