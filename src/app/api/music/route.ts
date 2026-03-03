import { getNowScrobbling } from '@/lib/lastfm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// ── Server-side in-memory cache ──────────────────────────────────────────────
// Last.fm is only actually fetched once per TTL across ALL visitors.
// Every other request returns the cached response instantly.
const CACHE_TTL_MS = 5_000; // 5 seconds — matches client poll interval
let cachedData: Record<string, unknown> | null = null;
let cacheExpiry = 0;

export async function GET() {
  // Return cached data immediately if still fresh
  if (cachedData && Date.now() < cacheExpiry) {
    return NextResponse.json(cachedData);
  }

  try {
    const track = await getNowScrobbling();
    const payload = track ?? { isPlaying: false };

    // Update cache
    cachedData = payload as Record<string, unknown>;
    cacheExpiry = Date.now() + CACHE_TTL_MS;

    return NextResponse.json(payload);
  } catch (error) {
    console.error('[Last.fm API] Error:', error);
    // Return stale cache on error rather than empty fallback
    if (cachedData) return NextResponse.json(cachedData);
    return NextResponse.json({ isPlaying: false });
  }
}
