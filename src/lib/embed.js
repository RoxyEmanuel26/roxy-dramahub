export const SERVERS = {
  tv: {
    VidSrc: (id, s, e) => `https://vidsrc.me/embed/tv/${id}/${s}/${e}`,
    "2Embed": (id, s, e) =>
      `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`,
    SuperEmbed: (id, s, e) =>
      `https://multiembed.mov/?video_id=${id}&s=${s}&e=${e}`,
  },
  movie: {
    VidSrc: (id) => `https://vidsrc.me/embed/movie/${id}`,
    "2Embed": (id) => `https://www.2embed.cc/embed/${id}`,
    SuperEmbed: (id) => `https://multiembed.mov/?video_id=${id}`,
  },
};

export function getEmbedUrl(
  type,
  id,
  server = "VidSrc",
  season = 1,
  episode = 1
) {
  if (type === "tv") return SERVERS.tv[server](id, season, episode);
  return SERVERS.movie[server](id);
}
