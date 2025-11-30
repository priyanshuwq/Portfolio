import { NextResponse } from "next/server";

const GITHUB_TOKEN =
  process.env.GITHUB_CONTRIB_TOKEN ||
  process.env.GITHUB_TOKEN ||
  process.env.GITHUB_PAT ||
  process.env.GITHUB_API_KEY;

const CONTRIBUTION_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token is not configured on the server." },
      { status: 500 }
    );
  }

  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  try {
    const ghResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "sleek-portfolio-app",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: {
          login: username,
          from: start.toISOString(),
          to: today.toISOString(),
        },
      }),
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!ghResponse.ok) {
      const errorText = await ghResponse.text();
      throw new Error(`GitHub API error: ${ghResponse.status} ${errorText}`);
    }

    const payload = await ghResponse.json();
    const calendar =
      payload?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("Unable to read contribution data from GitHub response.");
    }

    const values =
      calendar.weeks?.flatMap((week: any) =>
        week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      ) ?? [];

    return NextResponse.json({
      values,
      total: calendar.totalContributions ?? 0,
    });
  } catch (error) {
    console.error("[github-contributions]", error);
    return NextResponse.json(
      { error: "Unable to load contributions." },
      { status: 500 }
    );
  }
}

