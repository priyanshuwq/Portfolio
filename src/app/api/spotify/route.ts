import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🎵 Fetching Spotify data...');
    const response = await getNowPlaying();
    
    console.log('Spotify API Status:', response.status);

    // If nothing is currently playing, get recently played
    if (response.status === 204 || response.status > 400) {
      console.log('❌ Nothing currently playing, fetching recently played...');
      
      try {
        const recentResponse = await getRecentlyPlayed();
        
        if (recentResponse.status === 200) {
          const recentData = await recentResponse.json();
          
          if (recentData.items && recentData.items.length > 0) {
            const track = recentData.items[0].track;
            
            console.log('✅ Recently played:', track.name, 'by', track.artists[0].name);
            
            return NextResponse.json({
              album: track.album.name,
              albumImageUrl: track.album.images[0].url,
              artist: track.artists.map((artist: any) => artist.name).join(', '),
              isPlaying: false,
              songUrl: track.external_urls.spotify,
              title: track.name,
              playedAt: recentData.items[0].played_at,
              progress: 0,
              duration: track.duration_ms,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching recently played:', error);
      }
      
      console.log('❌ No recently played tracks found');
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();
    console.log('Song data:', JSON.stringify(song, null, 2));

    if (song.item === null) {
      console.log('❌ Song item is null');
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const progress = song.progress_ms;
    const duration = song.item.duration_ms;

    console.log('✅ Successfully fetched:', title, 'by', artist);

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      progress,
      duration,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false });
  }
}
