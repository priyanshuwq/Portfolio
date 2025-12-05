import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'spotify-cache.json');

export interface CachedTrack {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  playedAt?: string;
  progress?: number;
  duration?: number;
  cachedAt: number;
}

export function readCache(): CachedTrack | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
}

export function writeCache(track: CachedTrack): void {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(track, null, 2));
    console.log('✅ Cache updated:', track.title);
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}
