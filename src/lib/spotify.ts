import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const credentialsAvailable = !!(client_id && client_secret && refresh_token);

if (!credentialsAvailable) {
  console.warn('[Spotify] Missing credentials - Spotify features will be disabled');
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// Cache access token to reduce API calls
let tokenCache: { token: string; expiresAt: number } | null = null;

const getAccessToken = async () => {
  // Check if credentials are available
  if (!credentialsAvailable) {
    throw new Error('SPOTIFY_CREDENTIALS_MISSING');
  }

  // Return cached token if still valid
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
      signal: controller.signal,
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('[Spotify] Token error:', data.error);
      throw new Error(data.error);
    }

    // Cache token (expires in 1 hour, cache for 50 minutes)
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + 50 * 60 * 1000,
    };

    return data.access_token;
  } finally {
    clearTimeout(timeout);
  }
};

export const getNowPlaying = async () => {
  const access_token = await getAccessToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    return await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

export const getRecentlyPlayed = async () => {
  const access_token = await getAccessToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    return await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};
