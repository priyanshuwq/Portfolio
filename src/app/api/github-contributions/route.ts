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
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
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
    const contributionsCollection = payload?.data?.user?.contributionsCollection;
    const calendar = contributionsCollection?.contributionCalendar;

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

    // GitHub's contribution calendar includes more than just commits/issues/PRs
    // It also counts: discussions, repositories created, etc.
    // Use totalContributions from the calendar as it matches the profile display
    const totalFromCalendar = calendar.totalContributions ?? 0;
    
    // Get individual contribution types for breakdown
    const commits = contributionsCollection.totalCommitContributions ?? 0;
    const issues = contributionsCollection.totalIssueContributions ?? 0;
    const prs = contributionsCollection.totalPullRequestContributions ?? 0;
    const reviews = contributionsCollection.totalPullRequestReviewContributions ?? 0;

    return NextResponse.json({
      values,
      total: totalFromCalendar, // Use calendar total as it matches GitHub profile
      breakdown: { commits, issues, prs, reviews, calendarTotal: totalFromCalendar },
    });
  } catch (error) {
    console.error("[github-contributions]", error);
    return NextResponse.json(
      { error: "Unable to load contributions." },
      { status: 500 }
    );
  }
}

