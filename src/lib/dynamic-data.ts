// Dynamic data fetcher with caching for chatbot
import { getNowPlaying, getRecentlyPlayed } from './spotify';

interface CachedData {
  spotify: any | null;
  github: any | null;
  visitors: any | null;
  timestamp: number;
}

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let dataCache: CachedData = {
  spotify: null,
  github: null,
  visitors: null,
  timestamp: 0,
};

// Check if cache is still valid
const isCacheValid = () => {
  return Date.now() - dataCache.timestamp < CACHE_DURATION;
};

// Fetch Spotify data (current or recent track)
export async function getSpotifyData() {
  // Return cached data if valid
  if (isCacheValid() && dataCache.spotify) {
    return dataCache.spotify;
  }

  try {
    const response = await getNowPlaying();
    
    // If playing something
    if (response.status === 200) {
      const data = await response.json();
      const track = data.item;
      
      const spotifyData = {
        isPlaying: data.is_playing,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        album: track.album.name,
        songUrl: track.external_urls.spotify,
        albumImageUrl: track.album.images[0]?.url,
        progress: data.progress_ms,
        duration: track.duration_ms,
      };
      
      dataCache.spotify = spotifyData;
      dataCache.timestamp = Date.now();
      return spotifyData;
    }
    
    // Nothing playing, get recently played
    const recentResponse = await getRecentlyPlayed();
    if (recentResponse.status === 200) {
      const recentData = await recentResponse.json();
      
      if (recentData.items?.length > 0) {
        const track = recentData.items[0].track;
        
        const spotifyData = {
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: any) => a.name).join(', '),
          album: track.album.name,
          songUrl: track.external_urls.spotify,
          albumImageUrl: track.album.images[0]?.url,
          playedAt: recentData.items[0].played_at,
        };
        
        dataCache.spotify = spotifyData;
        dataCache.timestamp = Date.now();
        return spotifyData;
      }
    }
    
    return null;
  } catch (error) {
    console.error('[Dynamic Data] Spotify error:', error);
    return null;
  }
}

// Fetch GitHub stats + contributions
export async function getGitHubData() {
  // Return cached data if valid
  if (isCacheValid() && dataCache.github) {
    return dataCache.github;
  }

  try {
    const username = 'priyanshuwq';
    const token = process.env.GITHUB_CONTRIB_TOKEN;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    const userData = await userResponse.json();
    
    // Fetch recent repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      { headers, next: { revalidate: 300 } }
    );
    
    const repos = await reposResponse.json();

    // Fetch contribution data via GraphQL
    let contributions = null;
    if (token) {
      const today = new Date();
      const start = new Date(today);
      start.setDate(start.getDate() - 364);

      const contribQuery = `
        query ($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar { totalContributions }
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
            }
          }
        }
      `;

      try {
        const contribResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: contribQuery,
            variables: { login: username, from: start.toISOString(), to: today.toISOString() },
          }),
        });

        if (contribResponse.ok) {
          const contribData = await contribResponse.json();
          const collection = contribData?.data?.user?.contributionsCollection;
          if (collection) {
            contributions = {
              totalContributions: collection.contributionCalendar?.totalContributions || 0,
              commits: collection.totalCommitContributions || 0,
              issues: collection.totalIssueContributions || 0,
              pullRequests: collection.totalPullRequestContributions || 0,
              reviews: collection.totalPullRequestReviewContributions || 0,
            };
          }
        }
      } catch (e) {
        console.error('[Dynamic Data] GitHub contributions error:', e);
      }
    }
    
    const githubData = {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      bio: userData.bio,
      contributions,
      recentRepos: repos.slice(0, 3).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      })),
    };
    
    dataCache.github = githubData;
    dataCache.timestamp = Date.now();
    return githubData;
  } catch (error) {
    console.error('[Dynamic Data] GitHub error:', error);
    return null;
  }
}

// Fetch visitor count
export async function getVisitorData() {
  // Return cached data if valid
  if (isCacheValid() && dataCache.visitors) {
    return dataCache.visitors;
  }

  try {
    const response = await fetch('https://shekhr.dev/api/visitors', {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      dataCache.visitors = data;
      dataCache.timestamp = Date.now();
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('[Dynamic Data] Visitor counter error:', error);
    return null;
  }
}

// Get all dynamic data at once
export async function getAllDynamicData() {
  const [spotify, github, visitors] = await Promise.allSettled([
    getSpotifyData(),
    getGitHubData(),
    getVisitorData(),
  ]);
  
  return {
    spotify: spotify.status === 'fulfilled' ? spotify.value : null,
    github: github.status === 'fulfilled' ? github.value : null,
    visitors: visitors.status === 'fulfilled' ? visitors.value : null,
  };
}

// Format dynamic data for AI context
export function formatDynamicDataForAI(data: {
  spotify: any;
  github: any;
  visitors: any;
}) {
  let context = '\n\n## Real-Time Data (Last Updated: ' + new Date().toLocaleString() + ')\n\n';
  
  // Spotify
  if (data.spotify) {
    context += '### Current Music Activity\n';
    if (data.spotify.isPlaying) {
      context += `- Currently listening to: **${data.spotify.title}** by ${data.spotify.artist}\n`;
      context += `- Album: ${data.spotify.album}\n`;
      context += `- Listen: [${data.spotify.title}](${data.spotify.songUrl})\n`;
    } else {
      context += `- Last played: **${data.spotify.title}** by ${data.spotify.artist}\n`;
      if (data.spotify.playedAt) {
        const playedDate = new Date(data.spotify.playedAt);
        context += `- Played at: ${playedDate.toLocaleString()}\n`;
      }
    }
    context += '\n';
  }
  
  // GitHub
  if (data.github) {
    context += '### GitHub Activity\n';
    context += `- Public Repositories: ${data.github.publicRepos}\n`;
    context += `- Followers: ${data.github.followers}\n`;
    context += `- Following: ${data.github.following}\n`;
    
    // Contribution stats (last 365 days)
    if (data.github.contributions) {
      const c = data.github.contributions;
      context += `\n**Contributions (Last Year):**\n`;
      context += `- Total: ${c.totalContributions} contributions\n`;
      context += `- Commits: ${c.commits} | PRs: ${c.pullRequests} | Issues: ${c.issues} | Reviews: ${c.reviews}\n`;
    }
    
    if (data.github.recentRepos && data.github.recentRepos.length > 0) {
      context += '\n**Recent Projects:**\n';
      data.github.recentRepos.forEach((repo: any) => {
        context += `- [${repo.name}](${repo.url}) - ${repo.description || 'No description'}\n`;
        context += `  - Language: ${repo.language || 'N/A'} | Stars: ${repo.stars}\n`;
      });
    }
    context += '\n';
  }
  
  // Visitors
  if (data.visitors && data.visitors.count) {
    context += '### Portfolio Engagement\n';
    context += `- Total Visitors: ${data.visitors.count}\n\n`;
  }
  
  return context;
}
