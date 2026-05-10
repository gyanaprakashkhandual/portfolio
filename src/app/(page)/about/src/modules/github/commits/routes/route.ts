import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = "gyanaprakashkhandual";

const query = `
  query {
    user(login: "${USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: "GITHUB_TOKEN is not set in environment variables" },
            { status: 500 }
        );
    }

    try {
        const res = await fetch(GITHUB_GRAPHQL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `GitHub API error: ${res.status}` },
                { status: res.status }
            );
        }

        const json = await res.json();

        if (json.errors) {
            return NextResponse.json(
                { error: json.errors[0]?.message ?? "GraphQL error" },
                { status: 400 }
            );
        }

        const calendar =
            json.data?.user?.contributionsCollection?.contributionCalendar;

        return NextResponse.json(calendar);
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}