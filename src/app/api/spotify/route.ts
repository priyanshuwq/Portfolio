import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { readCache, writeCache } from '@/lib/spotify-cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Fetch fresh data every time for real-time play/pause updates
  try {
    const response = await getNowPlaying();

    // Nothing playing, try recently played
    if (response.status === 204 || response.status > 400) {
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
              isPlaying: false,
              songUrl: track.external_urls.spotify,
              title: track.name,
              playedAt: recentData.items[0].played_at,
              progress: 0,
              duration: track.duration_ms,
              cachedAt: Date.now(),
            };
            
            writeCache(trackData);
            return NextResponse.json(trackData);
          }
        }
      } catch (error) {
        // Silent fallback to cache
      }
      
      return NextResponse.json(cached || { isPlaying: false });
    }

    const song = await response.json();

    if (!song.item) {
      return NextResponse.json(cached || { isPlaying: false });
    }

    const trackData = {
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
      progress: song.progress_ms,
      duration: song.item.duration_ms,
      cachedAt: Date.now(),
    };
    
    writeCache(trackData);
    return NextResponse.json(trackData);
  } catch (error) {
    // Return cached data on any error
    if (cached) {
      return NextResponse.json({ ...cached, isPlaying: false });
    }
    
    return NextResponse.json({ isPlaying: false });
  }
}
