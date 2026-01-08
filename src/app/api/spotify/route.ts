import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { readCache, writeCache } from '@/lib/spotify-cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Fetch fresh data every time for real-time play/pause updates
  try {
    const response = await getNowPlaying();

    // Nothing playing (204) or error, try recently played
    if (response.status === 204 || response.status > 400) {
      console.log('[Spotify API] No active playback, fetching recently played');
      try {
        const recentResponse = await getRecentlyPlayed();
        
        if (recentResponse.status === 200) {
          const recentData = await recentResponse.json();
          
          if (recentData.items?.length > 0) {
            const track = recentData.items[0].track;
            
            const trackData = {
              album: track.album.name,
              albumImageUrl: track.album.images[0].url,
              artist: track.artists.map((artist: any) => artist.name).join(', '),
              isPlaying: false, // Explicitly mark as not playing
              songUrl: track.external_urls.spotify,
              title: track.name,
              playedAt: recentData.items[0].played_at,
              progress: 0,
              duration: track.duration_ms,
              cachedAt: Date.now(),
            };
            
            writeCache(trackData);
            console.log('[Spotify API] Returning recently played:', track.name);
            return NextResponse.json(trackData);
          }
        }
      } catch (error) {
        console.error('[Spotify API] Error fetching recently played:', error);
      }
      
      // Fallback to cache but mark as not playing
      const cached = readCache();
      if (cached) {
        const notPlayingCache = { ...cached, isPlaying: false };
        return NextResponse.json(notPlayingCache);
      }
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (!song.item) {
      console.log('[Spotify API] No item in response');
      const cached = readCache();
      if (cached) {
        return NextResponse.json({ ...cached, isPlaying: false });
      }
      return NextResponse.json({ isPlaying: false });
    }

    // Always respect the is_playing status from Spotify API
    const trackData = {
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
      isPlaying: song.is_playing, // Use actual playback status
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
      progress: song.progress_ms || 0,
      duration: song.item.duration_ms,
      cachedAt: Date.now(),
    };
    
    console.log('[Spotify API] Current track:', song.item.name, 'Playing:', song.is_playing);
    writeCache(trackData);
    return NextResponse.json(trackData);
  } catch (error) {
    console.error('[Spotify API] Error:', error);
    // Return cached data but mark as not playing on error
    const cached = readCache();
    if (cached) {
      return NextResponse.json({ ...cached, isPlaying: false });
    }
    
    return NextResponse.json({ isPlaying: false });
  }
}
