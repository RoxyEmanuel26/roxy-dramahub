import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey || apiKey === "GANTI_DENGAN_API_KEY_KAMU") {
    return NextResponse.json(
      { error: "TMDB API key not configured", results: [] },
      { status: 503 }
    );
  }

  const resolvedParams = await params;
  const pathSegments = resolvedParams.path;
  const path = pathSegments.join("/");
  const searchParams = request.nextUrl.searchParams;

  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "id-ID");
  searchParams.forEach((v, k) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from TMDB", results: [] },
      { status: 500 }
    );
  }
}
