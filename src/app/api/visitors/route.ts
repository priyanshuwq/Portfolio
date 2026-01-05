import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const VISITORS_FILE = path.join(process.cwd(), 'visitors-count.json');

interface VisitorData {
  count: number;
  lastUpdated: string;
}

function readVisitorCount(): VisitorData {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = fs.readFileSync(VISITORS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('[Visitors] Read error:', error);
  }
  return { count: 0, lastUpdated: new Date().toISOString() };
}

function writeVisitorCount(data: VisitorData): void {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('[Visitors] Write error:', error);
  }
}

export async function GET() {
  const data = readVisitorCount();
  return NextResponse.json({ count: data.count });
}

export async function POST() {
  const data = readVisitorCount();
  data.count += 1;
  data.lastUpdated = new Date().toISOString();
  writeVisitorCount(data);
  
  return NextResponse.json({ count: data.count });
}
