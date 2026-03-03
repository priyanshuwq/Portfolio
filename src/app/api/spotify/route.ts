import { getNowScrobbling } from '@/lib/lastfm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const track = await getNowScrobbling();

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error('[Last.fm API] Error:', error);
    return NextResponse.json({ isPlaying: false });
  }
}
