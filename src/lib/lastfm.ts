const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;

export interface LastFmTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt?: string;
}

export async function getNowScrobbling(): Promise<LastFmTrack | null> {
  if (!API_KEY || !USERNAME) {
    throw new Error("LASTFM_CREDENTIALS_MISSING");
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

  const res = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`Last.fm API error: ${res.status}`);

  const json = await res.json();
  const tracks = json.recenttracks?.track;
  if (!tracks || tracks.length === 0) return null;

  const track = Array.isArray(tracks) ? tracks[0] : tracks;

  const isPlaying = track["@attr"]?.nowplaying === "true";

  // Pick largest image available
  const images: { "#text": string; size: string }[] = track.image ?? [];
  const albumImageUrl =
    images.find((i) => i.size === "extralarge")?.["#text"] ||
    images.find((i) => i.size === "large")?.["#text"] ||
    images.find((i) => i.size === "medium")?.["#text"] ||
    "";

  return {
    isPlaying,
    title: track.name ?? "",
    artist: track.artist?.["#text"] ?? "",
    album: track.album?.["#text"] ?? "",
    albumImageUrl,
    songUrl: track.url ?? "",
    playedAt: track.date?.["#text"],
  };
}
