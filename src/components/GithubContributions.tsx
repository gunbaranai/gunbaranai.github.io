import React, { useEffect, useMemo, useState } from "react";

type DayCell = {
  date: string; // YYYY-MM-DD
  count: number;
};

type Props = {
  username: string;
  days?: number; // default 30
  className?: string;
};

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

function generateDateRange(days: number): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date(today);
    dt.setDate(today.getDate() - i);
    result.push(formatDate(dt));
  }
  return result;
}

function bucketColor(count: number): string {
  if (count <= 0) return "bg-gray-800";
  if (count <= 1) return "bg-green-900";
  if (count <= 3) return "bg-green-700";
  if (count <= 6) return "bg-green-500";
  return "bg-green-400";
}

// Resolve token without referencing process.env in the browser bundle
function resolveGithubToken(): string {
  // 1) window.GITHUB_TOKEN (set in index.html or elsewhere)
  const win: any = typeof window !== "undefined" ? (window as any) : null;
  if (win && typeof win.GITHUB_TOKEN === "string" && win.GITHUB_TOKEN.length > 0) {
    return win.GITHUB_TOKEN as string;
  }
  // 2) <meta name="github-token" content="ghp_xxx" />
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="github-token"]') as HTMLMetaElement | null;
    if (meta && meta.content) return meta.content;
  }
  return "";
}

async function fetchViaGraphQL(username: string, fromISO: string, toISO: string, token: string): Promise<Record<string, number>> {
  const query = `
		query($login: String!, $from: DateTime!, $to: DateTime!) {
			user(login: $login) {
				contributionsCollection(from: $from, to: $to) {
					contributionCalendar {
						weeks { contributionDays { date contributionCount } }
					}
				}
			}
		}
	`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from: fromISO, to: toISO },
    }),
  });
  if (!res.ok) throw new Error(`GraphQL error: ${res.status}`);
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const counts: Record<string, number> = {};
  for (const w of weeks) {
    for (const day of w.contributionDays) {
      if (day?.date) counts[day.date.slice(0, 10)] = day.contributionCount ?? 0;
    }
  }
  return counts;
}

async function fetchRecentEventCounts(username: string, sinceISO: string, maxPages = 3): Promise<Record<string, number>> {
  const base = `https://api.github.com/users/${username}/events/public`;
  const headers: HeadersInit = {};
  const counts: Record<string, number> = {};
  let page = 1;
  const since = new Date(sinceISO);

  while (page <= maxPages) {
    const res = await fetch(`${base}?per_page=100&page=${page}`, { headers });
    if (!res.ok) break;
    const events: Array<{ created_at: string } & Record<string, unknown>> = await res.json();
    if (!Array.isArray(events) || events.length === 0) break;

    let anyWithinRange = false;
    for (const ev of events) {
      const created = new Date(ev.created_at);
      if (created >= since) {
        anyWithinRange = true;
        const day = formatDate(created);
        counts[day] = (counts[day] ?? 0) + 1;
      }
    }
    if (!anyWithinRange) break;
    page += 1;
  }
  return counts;
}

export default function GithubContributions({ username, days = 30, className }: Props) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dates = useMemo(() => generateDateRange(days), [days]);
  const { fromISO, toISO, sinceISO } = useMemo(() => {
    const to = new Date();
    to.setHours(23, 59, 59, 999);
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    from.setDate(from.getDate() - (days - 1));
    return { fromISO: from.toISOString(), toISO: to.toISOString(), sinceISO: from.toISOString() };
  }, [days]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const token = process.env.BUN_PUBLIC_GITHUB_TOKEN ? String(process.env.BUN_PUBLIC_GITHUB_TOKEN) : "";
        // console.log(process.env.BUN_PUBLIC_GITHUB_TOKEN, token)
        let data: Record<string, number>;
        if (token) {
          data = await fetchViaGraphQL(username, fromISO, toISO, token);
        } else {
          data = await fetchRecentEventCounts(username, sinceISO);
        }
        if (!cancelled) {
          setCounts(data);
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load contributions");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username, fromISO, toISO, sinceISO]);

  // Build grid with proper chronological order (left to right, top to bottom)
  const grid = useMemo(() => {
    if (dates.length === 0) return [];

    const start = new Date(dates[0]!);
    const end = new Date(dates[dates.length - 1]!);

    // Find the first Sunday before or on the start date
    const firstSunday = new Date(start);
    const dayOfWeek = start.getDay(); // 0 = Sunday, 1 = Monday, etc.
    firstSunday.setDate(start.getDate() - dayOfWeek);

    // Calculate total weeks needed
    const totalDays = Math.ceil((end.getTime() - firstSunday.getTime()) / 86400000) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);

    // Build the grid
    const byWeek: Array<Array<DayCell | null>> = [];
    for (let week = 0; week < totalWeeks; week++) {
      byWeek[week] = new Array(7).fill(null);
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const currentDate = new Date(firstSunday);
        currentDate.setDate(firstSunday.getDate() + (week * 7) + dayOfWeek);
        const dateStr = formatDate(currentDate);

        // Only fill in dates that are within our range
        if (dates.includes(dateStr)) {
          byWeek[week]![dayOfWeek] = {
            date: dateStr,
            count: counts?.[dateStr] ?? 0
          };
        }
      }
    }
    return byWeek;
  }, [dates, counts]);

  return (
    <div className={className}>
      {/* <div className="flex items-center justify-between mb-2">
				<p className="portfolio-text">Last {days} days</p>
			</div> */}
      {loading && <span className="text-xs text-gray-400">Loading…</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
      {!loading && !error && <div className="flex gap-1 justify-center items-center">
        {grid.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((dow) => {
              const cell = week?.[dow] ?? null;
              const count = cell?.count ?? 0;
              const title = cell ? `${cell.date}: ${count} contributions` : "";
              return (
                <div
                  key={dow}
                  title={title}
                  className={`h-3 w-3 rounded-sm ${bucketColor(count)}`}
                />
              );
            })}
          </div>
        ))}
      </div>}
      {/* <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
        <span>Less</span>
        <span className="h-3 w-3 rounded-sm bg-gray-800" />
        <span className="h-3 w-3 rounded-sm bg-green-900" />
        <span className="h-3 w-3 rounded-sm bg-green-700" />
        <span className="h-3 w-3 rounded-sm bg-green-500" />
        <span className="h-3 w-3 rounded-sm bg-green-400" />
        <span>More</span>
      </div> */}
    </div>
  );
}
