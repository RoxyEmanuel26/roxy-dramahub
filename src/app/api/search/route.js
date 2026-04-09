import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey || apiKey === "GANTI_DENGAN_API_KEY_KAMU") {
    return NextResponse.json({ results: [] });
  }

  const q = request.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ results: [] });

  const url = new URL("https://api.themoviedb.org/3/search/multi");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "id-ID");
  url.searchParams.set("query", q);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [] });
  }
}
