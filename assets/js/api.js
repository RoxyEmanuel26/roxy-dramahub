/**
 * DramaHub — TMDB API Wrapper
 * All API communication goes through this module.
 * Includes sessionStorage caching (5 min) and error handling.
 */

const API = (() => {
  /**
   * Base fetch with caching & error handling
   */
  async function tmdbFetch(endpoint, params = {}) {
    const url = new URL(`${CONFIG.TMDB_BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', CONFIG.TMDB_API_KEY);
    url.searchParams.set('language', CONFIG.DEFAULT_LANGUAGE);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, v);
      }
    });

    const cacheKey = `dramahub_${url.toString()}`;

    // Check cache
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CONFIG.CACHE_DURATION) {
          return data;
        }
        sessionStorage.removeItem(cacheKey);
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }

    // Fetch
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Cache result
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {
      // sessionStorage full — clear old entries
      sessionStorage.clear();
    }

    return data;
  }

  /**
   * Filter results to Korean content only
   */
  function filterKorean(results) {
    return results.filter(item => {
      const countries = item.origin_country || [];
      return countries.includes('KR');
    });
  }

  /**
   * Get poster URL (with fallback)
   */
  function posterURL(path, size) {
    if (!path) return null;
    return `${CONFIG.TMDB_IMAGE_BASE}${size || CONFIG.TMDB_POSTER_SIZE}${path}`;
  }

  /**
   * Get backdrop URL
   */
  function backdropURL(path) {
    if (!path) return null;
    return `${CONFIG.TMDB_IMAGE_BASE}${CONFIG.TMDB_BACKDROP_SIZE}${path}`;
  }

  /**
   * Get profile URL
   */
  function profileURL(path) {
    if (!path) return null;
    return `${CONFIG.TMDB_IMAGE_BASE}${CONFIG.TMDB_PROFILE_SIZE}${path}`;
  }

  /**
   * Still image URL (episode thumbnails)
   */
  function stillURL(path) {
    if (!path) return null;
    return `${CONFIG.TMDB_IMAGE_BASE}${CONFIG.TMDB_STILL_SIZE}${path}`;
  }

  // ─── PUBLIC API ───

  return {
    posterURL,
    backdropURL,
    profileURL,
    stillURL,

    /** Trending TV (week) — filtered to Korean */
    async getTrendingTV() {
      const data = await tmdbFetch('/trending/tv/week');
      data.results = filterKorean(data.results);
      return data;
    },

    /** Trending Movies (week) — filtered to Korean */
    async getTrendingMovies() {
      const data = await tmdbFetch('/trending/movie/week');
      data.results = filterKorean(data.results);
      return data;
    },

    /** On Air TV (Korean) */
    async getOnAir(page = 1) {
      const data = await tmdbFetch('/tv/on_the_air', {
        with_origin_country: 'KR',
        page
      });
      return data;
    },

    /** Discover TV (Korean) */
    async discoverTV(params = {}) {
      const defaults = {
        with_origin_country: 'KR',
        sort_by: 'first_air_date.desc',
        'vote_count.gte': 10,
        page: 1
      };
      return tmdbFetch('/discover/tv', { ...defaults, ...params });
    },

    /** Discover Movie (Korean) */
    async discoverMovie(params = {}) {
      const defaults = {
        with_origin_country: 'KR',
        sort_by: 'release_date.desc',
        'vote_count.gte': 5,
        page: 1
      };
      return tmdbFetch('/discover/movie', { ...defaults, ...params });
    },

    /** Top Rated TV (Korean) */
    async topRatedTV(page = 1) {
      return tmdbFetch('/discover/tv', {
        with_origin_country: 'KR',
        sort_by: 'vote_average.desc',
        'vote_count.gte': 200,
        page
      });
    },

    /** Top Rated Movies (Korean) */
    async topRatedMovies(page = 1) {
      return tmdbFetch('/discover/movie', {
        with_origin_country: 'KR',
        sort_by: 'vote_average.desc',
        'vote_count.gte': 200,
        page
      });
    },

    /** Get TV Detail */
    async getTVDetail(id) {
      return tmdbFetch(`/tv/${id}`);
    },

    /** Get Movie Detail */
    async getMovieDetail(id) {
      return tmdbFetch(`/movie/${id}`);
    },

    /** Get Credits (TV or Movie) */
    async getCredits(type, id) {
      return tmdbFetch(`/${type}/${id}/credits`);
    },

    /** Get Videos (trailers etc.) */
    async getVideos(type, id) {
      return tmdbFetch(`/${type}/${id}/videos`);
    },

    /** Get Recommendations */
    async getRecommendations(type, id) {
      const data = await tmdbFetch(`/${type}/${id}/recommendations`);
      return data;
    },

    /** Get Similar */
    async getSimilar(type, id) {
      return tmdbFetch(`/${type}/${id}/similar`);
    },

    /** Get Season Episodes */
    async getSeasonEpisodes(tvId, seasonNumber) {
      return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}`);
    },

    /** Multi Search */
    async searchMulti(query, page = 1) {
      return tmdbFetch('/search/multi', { query, page });
    },

    /** Search TV */
    async searchTV(query, page = 1) {
      return tmdbFetch('/search/tv', { query, page });
    },

    /** Search Movie */
    async searchMovie(query, page = 1) {
      return tmdbFetch('/search/movie', { query, page });
    },

    /** Get Genre List for TV */
    async getGenresTV() {
      return tmdbFetch('/genre/tv/list');
    },

    /** Get Genre List for Movies */
    async getGenresMovie() {
      return tmdbFetch('/genre/movie/list');
    }
  };
})();
