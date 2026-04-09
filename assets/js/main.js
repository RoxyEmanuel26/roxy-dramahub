/**
 * DramaHub — Main Application Logic
 * Page router + all page initializers + shared UI utilities
 */

/* ============================================
   UI UTILITIES
   ============================================ */
const UI = (() => {
  /** Show toast notification */
  function showToast(message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <span class="toast-close" onclick="this.parentElement.remove()">✕</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /** Create card HTML */
  function createCard(item, mediaType) {
    const type = mediaType || item.media_type || 'tv';
    const title = item.name || item.title || 'Untitled';
    const year = (item.first_air_date || item.release_date || '').substring(0, 4);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const posterSrc = API.posterURL(item.poster_path);
    const genreIds = item.genre_ids || [];
    const firstGenre = genreIds.length > 0 ? (GENRE_NAMES[genreIds[0]] || '') : '';

    const posterHTML = posterSrc
      ? `<img src="${posterSrc}" alt="${title}" loading="lazy" decoding="async" onerror="this.parentElement.innerHTML='<div class=\\'card-poster-placeholder\\'>${title}</div>'">`
      : `<div class="card-poster-placeholder">${title}</div>`;

    return `
      <a href="detail.html?type=${type}&id=${item.id}" class="card" data-id="${item.id}">
        <div class="card-poster">
          ${posterHTML}
          <span class="card-badge-type ${type}">${type === 'tv' ? 'TV' : 'Movie'}</span>
          <span class="card-badge-rating"><span class="star">★</span> ${rating}</span>
          <div class="card-poster-overlay"><span>Lihat Detail</span></div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${title}</h3>
          <div class="card-meta">
            <span>${year}</span>
            ${firstGenre ? `<span>${firstGenre}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  /** Create skeleton card HTML */
  function createSkeletonCard() {
    return `
      <div class="skeleton skeleton-card">
        <div class="skeleton-poster skeleton"></div>
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-text short skeleton"></div>
      </div>
    `;
  }

  /** Show skeletons in a container */
  function showSkeletons(container, count = 10) {
    container.innerHTML = Array(count).fill(createSkeletonCard()).join('');
  }

  /** Show error in container */
  function showError(container, message = 'Gagal memuat konten. Silakan coba lagi.') {
    container.innerHTML = `
      <div class="error-state">
        <h3>⚠️ Oops!</h3>
        <p>${message}</p>
        <button class="btn btn-outline btn-sm" onclick="location.reload()">Coba Lagi</button>
      </div>
    `;
  }

  /** Build pagination HTML */
  function buildPagination(currentPage, totalPages, onClickFn) {
    if (totalPages <= 1) return '';

    let html = '<div class="pagination">';

    // Prev button
    html += `<button class="pagination-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="${onClickFn}(${currentPage - 1})">‹</button>`;

    // Page numbers
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    if (start > 1) {
      html += `<button class="pagination-btn" onclick="${onClickFn}(1)">1</button>`;
      if (start > 2) html += '<span class="pagination-ellipsis">…</span>';
    }

    for (let i = start; i <= end; i++) {
      html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="${onClickFn}(${i})">${i}</button>`;
    }

    if (end < totalPages) {
      if (end < totalPages - 1) html += '<span class="pagination-ellipsis">…</span>';
      html += `<button class="pagination-btn" onclick="${onClickFn}(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    html += `<button class="pagination-btn" ${currentPage >= totalPages ? 'disabled' : ''} onclick="${onClickFn}(${currentPage + 1})">›</button>`;

    html += '</div>';
    return html;
  }

  /** Setup Intersection Observer for fade-in */
  function setupFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /** Setup scroll-to-top button */
  function setupScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /** Setup header scroll effect */
  function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /** Setup hamburger menu */
  function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (!hamburger || !mobileNav) return;

    function toggleMenu() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
  }

  /** Setup header search */
  function setupHeaderSearch() {
    const searchWrap = document.querySelector('.header-search');
    const searchBtn = document.querySelector('.header-search-btn');
    const searchInput = document.querySelector('.header-search-input');
    if (!searchWrap || !searchBtn || !searchInput) return;

    searchBtn.addEventListener('click', () => {
      if (searchWrap.classList.contains('open')) {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      } else {
        searchWrap.classList.add('open');
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
      if (e.key === 'Escape') {
        searchWrap.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchWrap.contains(e.target)) {
        searchWrap.classList.remove('open');
      }
    });
  }

  /** Setup theme toggle */
  function setupThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('dramahub_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(toggle, savedTheme);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dramahub_theme', next);
      updateThemeIcon(toggle, next);
    });
  }

  function updateThemeIcon(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  /** Active nav link */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header-nav a, .mobile-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /** Watchlist helpers */
  function getWatchlist() {
    try {
      return JSON.parse(localStorage.getItem('dramahub_watchlist') || '[]');
    } catch { return []; }
  }

  function isInWatchlist(type, id) {
    return getWatchlist().some(item => item.id == id && item.type === type);
  }

  function toggleWatchlist(type, id, title, poster) {
    let list = getWatchlist();
    const idx = list.findIndex(item => item.id == id && item.type === type);
    if (idx > -1) {
      list.splice(idx, 1);
      showToast('Dihapus dari Watchlist', 'info');
    } else {
      list.push({ type, id, title, poster, addedAt: Date.now() });
      showToast('Ditambahkan ke Watchlist', 'success');
    }
    localStorage.setItem('dramahub_watchlist', JSON.stringify(list));
    return idx === -1; // true = added
  }

  /** Dynamic SEO */
  function updateSEO(title, description, image) {
    document.title = title ? `${title} — ${CONFIG.SITE_NAME}` : `${CONFIG.SITE_NAME} — ${CONFIG.SITE_TAGLINE}`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || CONFIG.SITE_TAGLINE;

    // OG tags
    setMetaTag('og:title', title || CONFIG.SITE_NAME);
    setMetaTag('og:description', description || CONFIG.SITE_TAGLINE);
    if (image) setMetaTag('og:image', image);
  }

  function setMetaTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  }

  return {
    showToast, createCard, createSkeletonCard, showSkeletons, showError,
    buildPagination, setupFadeIn, setupScrollTop, setupHeaderScroll,
    setupMobileMenu, setupHeaderSearch, setupThemeToggle, setActiveNav,
    getWatchlist, isInWatchlist, toggleWatchlist, updateSEO
  };
})();


/* ============================================
   SHARED HEADER & FOOTER HTML
   ============================================ */
function getHeaderHTML(currentPage = '') {
  return `
    <header class="header">
      <div class="header-inner">
        <a href="index.html" class="header-logo">
          <img src="assets/img/logo.svg" alt="${CONFIG.SITE_NAME}">
          <span class="header-logo-text">${CONFIG.SITE_NAME}</span>
        </a>
        <nav class="header-nav">
          <a href="index.html">Beranda</a>
          <a href="tv.html">Drama</a>
          <a href="movie.html">Movie</a>
          <a href="top.html">Top Drama</a>
        </nav>
        <div class="header-actions">
          <div class="header-search">
            <input type="text" class="header-search-input" placeholder="Cari drama...">
            <button class="header-search-btn" aria-label="Search">🔍</button>
          </div>
          <button class="theme-toggle" aria-label="Toggle theme">☀️</button>
          <div class="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </header>
    <nav class="mobile-nav">
      <a href="index.html">Beranda</a>
      <a href="tv.html">Drama</a>
      <a href="movie.html">Movie</a>
      <a href="top.html">Top Drama</a>
      <a href="search.html">Pencarian</a>
    </nav>
    <div class="mobile-nav-overlay"></div>
  `;
}

function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <img src="assets/img/logo.svg" alt="${CONFIG.SITE_NAME}">
              <span class="footer-brand-name">${CONFIG.SITE_NAME}</span>
            </div>
            <p>${CONFIG.SITE_TAGLINE}. Temukan dan tonton drama Korea favorit kamu secara gratis dengan subtitle Indonesia.</p>
            <div class="footer-social">
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="Instagram">📸</a>
              <a href="#" title="YouTube">📺</a>
            </div>
          </div>
          <div class="footer-column">
            <h4>Menu</h4>
            <a href="index.html">Beranda</a>
            <a href="tv.html">Drama Korea</a>
            <a href="movie.html">Movie Korea</a>
            <a href="top.html">Top Rating</a>
            <a href="search.html">Pencarian</a>
          </div>
          <div class="footer-column">
            <h4>Genre Populer</h4>
            <a href="tv.html?genre=10749">Romance</a>
            <a href="tv.html?genre=18">Drama</a>
            <a href="tv.html?genre=35">Comedy</a>
            <a href="tv.html?genre=10765">Fantasy</a>
            <a href="tv.html?genre=9648">Thriller</a>
            <a href="tv.html?genre=10759">Action</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} ${CONFIG.SITE_NAME}. Semua data disediakan oleh <a href="https://www.themoviedb.org/" target="_blank" rel="noopener" style="color:var(--color-accent)">TMDB</a>. ${CONFIG.SITE_NAME} tidak menyimpan konten video apapun.</p>
        </div>
      </div>
    </footer>
    <button class="scroll-top" aria-label="Scroll to top">↑</button>
  `;
}


/* ============================================
   PAGE INITIALIZERS
   ============================================ */

/* ── HOMEPAGE ── */
async function initHomepage() {
  UI.updateSEO(null, CONFIG.SITE_TAGLINE);

  const heroEl = document.getElementById('hero-carousel');
  const trendingEl = document.getElementById('trending-section');
  const onAirEl = document.getElementById('onair-section');
  const newDramaEl = document.getElementById('new-drama-section');
  const newMovieEl = document.getElementById('new-movie-section');
  const topRatedEl = document.getElementById('top-rated-section');

  // Show skeletons
  [trendingEl, onAirEl, newDramaEl, newMovieEl, topRatedEl].forEach(el => {
    if (el) UI.showSkeletons(el, 6);
  });

  try {
    const [trending, onAir, newDrama, newMovie, topRated] = await Promise.all([
      API.getTrendingTV(),
      API.getOnAir(),
      API.discoverTV({ sort_by: 'first_air_date.desc', 'vote_count.gte': 10 }),
      API.discoverMovie({ sort_by: 'release_date.desc', 'vote_count.gte': 10 }),
      API.discoverTV({ sort_by: 'vote_average.desc', 'vote_count.gte': 500 })
    ]);

    // Hero Carousel
    if (heroEl && trending.results.length > 0) {
      renderHeroCarousel(heroEl, trending.results.slice(0, 10));
    }

    // Trending
    if (trendingEl) {
      trendingEl.innerHTML = trending.results.slice(0, 16).map(item => UI.createCard(item, 'tv')).join('');
    }

    // On Air
    if (onAirEl) {
      onAirEl.innerHTML = onAir.results.slice(0, 12).map(item => UI.createCard(item, 'tv')).join('');
    }

    // New Drama
    if (newDramaEl) {
      newDramaEl.innerHTML = newDrama.results.slice(0, 10).map(item => UI.createCard(item, 'tv')).join('');
    }

    // New Movie
    if (newMovieEl) {
      newMovieEl.innerHTML = newMovie.results.slice(0, 10).map(item => UI.createCard(item, 'movie')).join('');
    }

    // Top Rated
    if (topRatedEl) {
      renderRankedGrid(topRatedEl, topRated.results.slice(0, 10));
    }

  } catch (error) {
    console.error('Homepage load error:', error);
    [trendingEl, onAirEl, newDramaEl, newMovieEl, topRatedEl].forEach(el => {
      if (el) UI.showError(el);
    });
  }

  UI.setupFadeIn();
}

/** Render hero carousel */
function renderHeroCarousel(container, items) {
  let slidesHTML = '';
  let dotsHTML = '';

  items.forEach((item, idx) => {
    const backdropSrc = API.backdropURL(item.backdrop_path);
    const title = item.name || item.title;
    const genres = (item.genre_ids || []).slice(0, 3).map(id => GENRE_NAMES[id] || '').filter(Boolean);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : '';
    const overview = item.overview || '';

    slidesHTML += `
      <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <div class="hero-backdrop" style="background-image: url('${backdropSrc || ''}')"></div>
        <div class="hero-gradient"></div>
        <div class="hero-content container">
          <span class="badge trending">🔥 TRENDING</span>
          <h1 class="hero-title">${title}</h1>
          <div class="hero-genres">${genres.map(g => `<span class="badge">${g}</span>`).join('')}</div>
          <div class="hero-rating">
            <span class="star">★</span> ${rating} / 10
          </div>
          <p class="hero-overview">${overview}</p>
          <div class="hero-actions">
            <a href="watch.html?type=tv&id=${item.id}&season=1&episode=1" class="btn btn-primary btn-lg">▶ Tonton Sekarang</a>
            <a href="detail.html?type=tv&id=${item.id}" class="btn btn-outline btn-lg">ℹ Detail</a>
          </div>
        </div>
      </div>
    `;

    dotsHTML += `<button class="hero-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></button>`;
  });

  container.innerHTML = slidesHTML + `<div class="hero-dots">${dotsHTML}</div>`;

  // Auto-slide logic
  let current = 0;
  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  const total = slides.length;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
  });

  setInterval(() => {
    goToSlide((current + 1) % total);
  }, 5000);
}

/** Render ranked grid with numbers */
function renderRankedGrid(container, items) {
  container.innerHTML = items.map((item, idx) => `
    <div class="ranked-card">
      <span class="rank-number">${idx + 1}</span>
      ${UI.createCard(item, 'tv')}
    </div>
  `).join('');
}


/* ── TV LIST PAGE ── */
async function initTVPage() {
  UI.updateSEO('Drama Korea', 'Daftar lengkap drama Korea terbaru dan terpopuler');

  const grid = document.getElementById('tv-grid');
  const paginationEl = document.getElementById('tv-pagination');
  const resultInfo = document.getElementById('result-info');

  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page')) || 1;
  const genre = params.get('genre') || '';
  const year = params.get('year') || '';
  const network = params.get('network') || '';
  const sort = params.get('sort') || 'first_air_date.desc';

  // Set filter UI values
  setFilterValues(params);

  if (grid) UI.showSkeletons(grid, 20);

  try {
    const apiParams = {
      with_origin_country: 'KR',
      sort_by: sort,
      page,
      'vote_count.gte': 5
    };
    if (genre) apiParams.with_genres = genre;
    if (year) apiParams.first_air_date_year = year;
    if (network) apiParams.with_networks = network;

    const data = await API.discoverTV(apiParams);

    if (grid) {
      grid.innerHTML = data.results.map(item => UI.createCard(item, 'tv')).join('');
    }
    if (resultInfo) {
      resultInfo.textContent = `Menampilkan ${data.results.length} dari ${data.total_results.toLocaleString()} drama`;
    }
    if (paginationEl) {
      paginationEl.innerHTML = UI.buildPagination(page, Math.min(data.total_pages, 500), 'goToTVPage');
    }
  } catch (error) {
    console.error('TV page error:', error);
    if (grid) UI.showError(grid);
  }

  UI.setupFadeIn();
}

/** Navigate TV page */
function goToTVPage(page) {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.location.href = url.toString();
}

/** Apply TV filters */
function applyTVFilters() {
  const url = new URL(window.location.origin + window.location.pathname);

  const genres = Array.from(document.querySelectorAll('.filter-genre:checked')).map(el => el.value);
  if (genres.length) url.searchParams.set('genre', genres.join(','));

  const year = document.getElementById('filter-year')?.value;
  if (year) url.searchParams.set('year', year);

  const networks = Array.from(document.querySelectorAll('.filter-network:checked')).map(el => el.value);
  if (networks.length) url.searchParams.set('network', networks.join('|'));

  const sort = document.getElementById('filter-sort')?.value;
  if (sort) url.searchParams.set('sort', sort);

  url.searchParams.set('page', '1');
  window.location.href = url.toString();
}

/** Reset TV filters */
function resetTVFilters() {
  window.location.href = window.location.pathname;
}

/** Set filter checkboxes from URL params */
function setFilterValues(params) {
  const genre = params.get('genre') || '';
  const year = params.get('year') || '';
  const network = params.get('network') || '';
  const sort = params.get('sort') || '';

  if (genre) {
    genre.split(',').forEach(g => {
      const el = document.querySelector(`.filter-genre[value="${g}"]`);
      if (el) el.checked = true;
    });
  }
  if (year) {
    const el = document.getElementById('filter-year');
    if (el) el.value = year;
  }
  if (network) {
    network.split('|').forEach(n => {
      const el = document.querySelector(`.filter-network[value="${n}"]`);
      if (el) el.checked = true;
    });
  }
  if (sort) {
    const el = document.getElementById('filter-sort');
    if (el) el.value = sort;
  }
}


/* ── MOVIE LIST PAGE ── */
async function initMoviePage() {
  UI.updateSEO('Movie Korea', 'Daftar lengkap film Korea terbaru dan terpopuler');

  const grid = document.getElementById('movie-grid');
  const paginationEl = document.getElementById('movie-pagination');
  const resultInfo = document.getElementById('result-info');

  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page')) || 1;
  const genre = params.get('genre') || '';
  const year = params.get('year') || '';
  const sort = params.get('sort') || 'release_date.desc';

  setFilterValues(params);

  if (grid) UI.showSkeletons(grid, 20);

  try {
    const apiParams = {
      with_origin_country: 'KR',
      sort_by: sort,
      page,
      'vote_count.gte': 5
    };
    if (genre) apiParams.with_genres = genre;
    if (year) apiParams.primary_release_year = year;

    const data = await API.discoverMovie(apiParams);

    if (grid) {
      grid.innerHTML = data.results.map(item => UI.createCard(item, 'movie')).join('');
    }
    if (resultInfo) {
      resultInfo.textContent = `Menampilkan ${data.results.length} dari ${data.total_results.toLocaleString()} movie`;
    }
    if (paginationEl) {
      paginationEl.innerHTML = UI.buildPagination(page, Math.min(data.total_pages, 500), 'goToMoviePage');
    }
  } catch (error) {
    console.error('Movie page error:', error);
    if (grid) UI.showError(grid);
  }

  UI.setupFadeIn();
}

function goToMoviePage(page) {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.location.href = url.toString();
}

function applyMovieFilters() {
  const url = new URL(window.location.origin + window.location.pathname);

  const genres = Array.from(document.querySelectorAll('.filter-genre:checked')).map(el => el.value);
  if (genres.length) url.searchParams.set('genre', genres.join(','));

  const year = document.getElementById('filter-year')?.value;
  if (year) url.searchParams.set('year', year);

  const sort = document.getElementById('filter-sort')?.value;
  if (sort) url.searchParams.set('sort', sort);

  url.searchParams.set('page', '1');
  window.location.href = url.toString();
}

function resetMovieFilters() {
  window.location.href = window.location.pathname;
}


/* ── DETAIL PAGE ── */
async function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || 'tv';
  const id = params.get('id');

  if (!id) {
    document.querySelector('.detail-hero-inner').innerHTML = '<div class="error-state"><h3>Konten tidak ditemukan</h3><p>ID tidak valid.</p></div>';
    return;
  }

  try {
    const [detail, credits, videos, recommendations, similar] = await Promise.all([
      type === 'tv' ? API.getTVDetail(id) : API.getMovieDetail(id),
      API.getCredits(type, id),
      API.getVideos(type, id),
      API.getRecommendations(type, id),
      API.getSimilar(type, id)
    ]);

    renderDetailHero(detail, type);
    renderDetailTabs(detail, credits, videos, type, id);
    renderDetailRecommendations(recommendations, similar, type);

    const title = detail.name || detail.title;
    const overview = detail.overview || '';
    UI.updateSEO(title, overview.substring(0, 160), API.posterURL(detail.poster_path));

  } catch (error) {
    console.error('Detail page error:', error);
    const heroInner = document.querySelector('.detail-hero-inner');
    if (heroInner) UI.showError(heroInner);
  }
}

function renderDetailHero(detail, type) {
  const heroInner = document.querySelector('.detail-hero-inner');
  const heroBg = document.querySelector('.detail-hero-bg');
  if (!heroInner) return;

  const title = detail.name || detail.title;
  const originalTitle = detail.original_name || detail.original_title || '';
  const posterSrc = API.posterURL(detail.poster_path);
  const backdropSrc = API.backdropURL(detail.backdrop_path);
  const rating = detail.vote_average ? detail.vote_average.toFixed(1) : 'N/A';
  const voteCount = detail.vote_count || 0;
  const year = (detail.first_air_date || detail.release_date || '').substring(0, 4);
  const genres = (detail.genres || []).map(g => g.name);
  const overview = detail.overview || 'Sinopsis belum tersedia.';
  const status = detail.status || '';
  const episodes = detail.number_of_episodes || '';
  const seasons = detail.number_of_seasons || '';
  const runtime = type === 'movie' ? (detail.runtime || 0) : (detail.episode_run_time?.[0] || 0);
  const networks = (detail.networks || []).map(n => n.name).join(', ') || '-';
  const companies = (detail.production_companies || []).map(c => c.name).join(', ') || '-';
  const inWatchlist = UI.isInWatchlist(type, detail.id);

  if (heroBg) heroBg.style.backgroundImage = `url('${backdropSrc || ''}')`;

  const statusBadge = status === 'Returning Series' || status === 'In Production'
    ? '<span class="badge" style="background:var(--badge-episode);color:#fff;border-color:var(--badge-episode)">ONGOING</span>'
    : '<span class="badge" style="background:var(--color-text-faint);color:#fff;border-color:var(--color-text-faint)">COMPLETED</span>';

  heroInner.innerHTML = `
    <div class="detail-poster">
      ${posterSrc ? `<img src="${posterSrc}" alt="${title}">` : `<div class="card-poster-placeholder" style="height:420px">${title}</div>`}
      <div class="detail-poster-actions">
        <a href="watch.html?type=${type}&id=${detail.id}&season=1&episode=1" class="btn btn-primary">▶ Mulai Nonton</a>
        <button class="btn btn-outline" id="watchlist-btn" onclick="toggleDetailWatchlist('${type}', ${detail.id}, '${title.replace(/'/g, "\\'")}', '${detail.poster_path || ''}')">
          ${inWatchlist ? '♥ Hapus dari Watchlist' : '♡ Tambah ke Watchlist'}
        </button>
      </div>
      <div class="detail-share">
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" title="Share Facebook">📘</a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}" target="_blank" title="Share Twitter">🐦</a>
        <a href="https://wa.me/?text=${encodeURIComponent(title + ' — ' + window.location.href)}" target="_blank" title="Share WhatsApp">💬</a>
        <a href="#" onclick="navigator.clipboard.writeText(window.location.href);UI.showToast('Link disalin!','success');return false;" title="Copy Link">🔗</a>
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-badges">
        <span class="badge" style="background:var(--color-accent);color:#fff;border-color:var(--color-accent)">${type === 'tv' ? 'TV SERIES' : 'MOVIE'}</span>
        ${statusBadge}
      </div>
      <h1 class="detail-title">${title}</h1>
      ${originalTitle && originalTitle !== title ? `<p class="detail-original-title">${originalTitle}</p>` : ''}
      <div class="detail-rating-row">
        <span class="detail-rating-score">${rating} <span>/ 10</span></span>
        <div class="star-rating static">${renderStars(detail.vote_average)}</div>
        <span class="detail-rating-votes">${voteCount.toLocaleString()} votes</span>
      </div>
      <div class="detail-meta-grid">
        <div class="detail-meta-item"><span class="label">Tahun:</span><span class="value">${year}</span></div>
        <div class="detail-meta-item"><span class="label">Durasi:</span><span class="value">${runtime ? runtime + ' menit' : '-'}${type === 'tv' ? '/ep' : ''}</span></div>
        ${type === 'tv' && episodes ? `<div class="detail-meta-item"><span class="label">Episode:</span><span class="value">${episodes} Episode${seasons > 1 ? ` (${seasons} Season)` : ''}</span></div>` : ''}
        <div class="detail-meta-item"><span class="label">Network:</span><span class="value">${networks}</span></div>
        <div class="detail-meta-item"><span class="label">Negara:</span><span class="value">${(detail.origin_country || []).join(', ') || 'South Korea'}</span></div>
        <div class="detail-meta-item"><span class="label">Studio:</span><span class="value">${companies}</span></div>
      </div>
      <div class="detail-genres">${genres.map(g => `<a href="tv.html?genre=${g}" class="badge clickable">${g}</a>`).join('')}</div>
      <div class="detail-overview">
        <p id="overview-text">${overview}</p>
      </div>
    </div>
  `;
}

function renderStars(score) {
  const stars = Math.round((score || 0) / 2);
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star ${i < stars ? 'filled' : ''}">★</span>`
  ).join('');
}

function renderDetailTabs(detail, credits, videos, type, id) {
  const tabContent = document.getElementById('detail-tab-content');
  if (!tabContent) return;

  // Episodes tab (TV only)
  let episodesHTML = '';
  if (type === 'tv' && detail.seasons && detail.seasons.length > 0) {
    const seasons = detail.seasons.filter(s => s.season_number > 0);
    episodesHTML = `
      <div id="tab-episode" class="tab-content">
        <select id="season-select" onchange="loadSeasonEpisodes(${id}, this.value)" class="filter-select" style="max-width:200px;margin-bottom:var(--space-lg)">
          ${seasons.map(s => `<option value="${s.season_number}">Season ${s.season_number} (${s.episode_count} ep)</option>`).join('')}
        </select>
        <div id="episode-list" class="episode-list"></div>
      </div>
    `;
  }

  // Cast tab
  const cast = (credits.cast || []).slice(0, 20);
  const castHTML = `
    <div id="tab-cast" class="tab-content">
      <div class="cast-grid">
        ${cast.map(c => `
          <div class="cast-card">
            ${c.profile_path ? `<img src="${API.profileURL(c.profile_path)}" alt="${c.name}" loading="lazy">` : '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect fill=\'%23222\'/%3E%3C/svg%3E" alt="">'}
            <div class="name">${c.name}</div>
            <div class="character">${c.character || ''}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Trailer tab
  const trailers = (videos.results || []).filter(v => v.site === 'YouTube').slice(0, 8);
  const trailerHTML = `
    <div id="tab-trailer" class="tab-content">
      ${trailers.length > 0 ? `
        <div class="trailer-grid">
          ${trailers.map(v => `
            <div class="trailer-card" onclick="openTrailerModal('${v.key}')">
              <div class="trailer-card-thumb">
                <img src="https://img.youtube.com/vi/${v.key}/mqdefault.jpg" alt="${v.name}" loading="lazy">
                <div class="play-icon">▶</div>
              </div>
              <div class="trailer-card-info"><h4>${v.name}</h4></div>
            </div>
          `).join('')}
        </div>
      ` : '<div class="empty-state"><p>Tidak ada trailer tersedia.</p></div>'}
    </div>
  `;

  // Build tabs
  let tabButtons = '<button class="tab-btn active" data-tab="tab-info">INFO</button>';
  if (type === 'tv') tabButtons += '<button class="tab-btn" data-tab="tab-episode">EPISODE</button>';
  tabButtons += '<button class="tab-btn" data-tab="tab-cast">CAST</button>';
  tabButtons += '<button class="tab-btn" data-tab="tab-trailer">TRAILER</button>';

  tabContent.innerHTML = `
    <div class="detail-tabs">
      <div class="tabs container">${tabButtons}</div>
    </div>
    <div class="container" style="padding-bottom:var(--space-2xl)">
      <div id="tab-info" class="tab-content active">
        <div class="detail-meta-grid" style="margin-top:var(--space-lg)">
          <div class="detail-meta-item"><span class="label">TMDB Score:</span><span class="value">${detail.vote_average?.toFixed(1) || 'N/A'}</span></div>
          <div class="detail-meta-item"><span class="label">Popularity:</span><span class="value">${detail.popularity?.toFixed(0) || 'N/A'}</span></div>
          ${detail.created_by?.length ? `<div class="detail-meta-item"><span class="label">Creator:</span><span class="value">${detail.created_by.map(c => c.name).join(', ')}</span></div>` : ''}
        </div>
      </div>
      ${episodesHTML}
      ${castHTML}
      ${trailerHTML}
    </div>
  `;

  // Tab switching
  tabContent.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabContent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabContent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Auto-load first season episodes
  if (type === 'tv' && detail.seasons?.length > 0) {
    const firstSeason = detail.seasons.find(s => s.season_number > 0);
    if (firstSeason) loadSeasonEpisodes(id, firstSeason.season_number);
  }
}

async function loadSeasonEpisodes(tvId, seasonNumber) {
  const container = document.getElementById('episode-list');
  if (!container) return;
  container.innerHTML = '<div class="skeleton" style="height:80px;margin-bottom:8px"></div>'.repeat(5);

  try {
    const data = await API.getSeasonEpisodes(tvId, seasonNumber);
    const episodes = data.episodes || [];

    container.innerHTML = episodes.map(ep => {
      const thumbSrc = API.stillURL(ep.still_path);
      const date = ep.air_date || '';
      const epRating = ep.vote_average ? ep.vote_average.toFixed(1) : 'N/A';
      return `
        <div class="episode-item" onclick="window.location.href='watch.html?type=tv&id=${tvId}&season=${seasonNumber}&episode=${ep.episode_number}'">
          <div class="episode-thumb">
            ${thumbSrc ? `<img src="${thumbSrc}" alt="Ep ${ep.episode_number}" loading="lazy">` : ''}
          </div>
          <div class="episode-info">
            <h4>Ep ${ep.episode_number} — ${ep.name || 'Episode ' + ep.episode_number}</h4>
            <p>${date} · ★ ${epRating}</p>
          </div>
          <a href="watch.html?type=tv&id=${tvId}&season=${seasonNumber}&episode=${ep.episode_number}" class="btn btn-primary btn-sm">▶ Tonton</a>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Episode load error:', error);
    container.innerHTML = '<div class="error-state"><p>Gagal memuat episode.</p></div>';
  }
}

function renderDetailRecommendations(recommendations, similar, type) {
  const recsEl = document.getElementById('detail-recommendations');
  const similarEl = document.getElementById('detail-similar');

  if (recsEl && recommendations.results?.length > 0) {
    recsEl.innerHTML = recommendations.results.slice(0, 10).map(item => UI.createCard(item, type)).join('');
  } else if (recsEl) {
    recsEl.closest('.section')?.remove();
  }

  if (similarEl && similar.results?.length > 0) {
    similarEl.innerHTML = similar.results.slice(0, 10).map(item => UI.createCard(item, type)).join('');
  } else if (similarEl) {
    similarEl.closest('.section')?.remove();
  }
}

function toggleDetailWatchlist(type, id, title, posterPath) {
  const added = UI.toggleWatchlist(type, id, title, posterPath);
  const btn = document.getElementById('watchlist-btn');
  if (btn) {
    btn.innerHTML = added ? '♥ Hapus dari Watchlist' : '♡ Tambah ke Watchlist';
  }
}

function openTrailerModal(youtubeKey) {
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" style="padding:0;overflow:hidden;background:#000">
        <button class="modal-close" onclick="closeTrailerModal()">✕</button>
        <div style="position:relative;padding-top:56.25%">
          <iframe id="trailer-iframe" style="position:absolute;inset:0;width:100%;height:100%" frameborder="0" allowfullscreen allow="autoplay"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeTrailerModal();
    });
  }

  document.getElementById('trailer-iframe').src = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.getElementById('trailer-iframe').src = '';
    document.body.style.overflow = '';
  }
}


/* ── WATCH PAGE ── */
async function initWatchPage() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || 'tv';
  const id = params.get('id');

  if (!id) return;

  Player.init();

  try {
    const [detail, recommendations] = await Promise.all([
      type === 'tv' ? API.getTVDetail(id) : API.getMovieDetail(id),
      API.getRecommendations(type, id)
    ]);

    const title = detail.name || detail.title;
    UI.updateSEO(`Nonton ${title}`, detail.overview?.substring(0, 160), API.posterURL(detail.poster_path));

    // Breadcrumb
    const breadcrumb = document.getElementById('watch-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="index.html">Beranda</a><span class="separator">›</span>
        <a href="${type}.html">${type === 'tv' ? 'Drama' : 'Movie'}</a><span class="separator">›</span>
        <a href="detail.html?type=${type}&id=${id}">${title}</a><span class="separator">›</span>
        <span class="current" id="current-ep-title">Season ${Player.currentSeason} Episode ${Player.currentEpisode}</span>
      `;
    }

    // Watch Info
    const watchInfo = document.getElementById('watch-info');
    if (watchInfo) {
      const rating = detail.vote_average ? detail.vote_average.toFixed(1) : 'N/A';
      const year = (detail.first_air_date || detail.release_date || '').substring(0, 4);
      const genres = (detail.genres || []).map(g => `<span class="badge">${g.name}</span>`).join('');
      const inWatchlist = UI.isInWatchlist(type, detail.id);

      watchInfo.innerHTML = `
        <h3>${title}</h3>
        <div class="watch-info-meta">
          <span>★ ${rating}</span>
          <span>${year}</span>
          <span>${(detail.networks || []).map(n => n.name).join(', ') || ''}</span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${genres}</div>
        <div class="watch-info-actions">
          <button class="btn btn-outline btn-sm" id="watch-watchlist-btn" onclick="toggleDetailWatchlist('${type}', ${detail.id}, '${title.replace(/'/g, "\\'")}', '${detail.poster_path || ''}')">
            ${inWatchlist ? '♥ Dalam Watchlist' : '♡ Tambah Watchlist'}
          </button>
          <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(window.location.href);UI.showToast('Link disalin!','success')">🔗 Share</button>
        </div>
        <p class="line-clamp-3">${detail.overview || ''}</p>
      `;
    }

    // Episode list sidebar (TV only)
    if (type === 'tv') {
      await loadWatchEpisodeList(detail, id);
    } else {
      const sidebar = document.querySelector('.watch-sidebar-col');
      if (sidebar) sidebar.style.display = 'none';
    }

    // Recommendations
    const recsEl = document.getElementById('watch-recommendations');
    if (recsEl && recommendations.results?.length > 0) {
      recsEl.innerHTML = recommendations.results.slice(0, 6).map(item => UI.createCard(item, type)).join('');
    }

  } catch (error) {
    console.error('Watch page error:', error);
  }
}

async function loadWatchEpisodeList(detail, id) {
  const listContainer = document.getElementById('watch-episode-list');
  const seasonSelect = document.getElementById('watch-season-select');
  if (!listContainer) return;

  const seasons = (detail.seasons || []).filter(s => s.season_number > 0);
  const currentSeason = Player.currentSeason;
  const currentEpisode = Player.currentEpisode;

  if (seasonSelect && seasons.length > 0) {
    seasonSelect.innerHTML = seasons.map(s =>
      `<option value="${s.season_number}" ${s.season_number === currentSeason ? 'selected' : ''}>Season ${s.season_number}</option>`
    ).join('');

    seasonSelect.addEventListener('change', async () => {
      await loadWatchSeasonEpisodes(id, parseInt(seasonSelect.value), listContainer);
    });
  }

  await loadWatchSeasonEpisodes(id, currentSeason, listContainer);
}

async function loadWatchSeasonEpisodes(tvId, seasonNumber, container) {
  container.innerHTML = '<div class="skeleton" style="height:60px;margin-bottom:4px"></div>'.repeat(8);

  try {
    const data = await API.getSeasonEpisodes(tvId, seasonNumber);
    const episodes = data.episodes || [];
    Player.setTotalEpisodes(episodes.length);
    const currentEp = Player.currentEpisode;
    const currentSeason = Player.currentSeason;

    container.innerHTML = episodes.map(ep => {
      const thumbSrc = API.stillURL(ep.still_path);
      const isActive = ep.episode_number === currentEp && seasonNumber === currentSeason;
      return `
        <div class="watch-episode-item ${isActive ? 'active' : ''}" data-episode="${ep.episode_number}" data-season="${seasonNumber}"
          onclick="Player.switchEpisode(${seasonNumber}, ${ep.episode_number})">
          <div class="ep-thumb">
            ${thumbSrc ? `<img src="${thumbSrc}" alt="Ep ${ep.episode_number}" loading="lazy">` : ''}
          </div>
          <div class="ep-info">
            <span class="ep-number">Ep ${ep.episode_number}</span>
            <span class="ep-date">${ep.air_date || ''}</span>
          </div>
        </div>
      `;
    }).join('');

    Player.scrollToActiveEpisode();
  } catch (error) {
    console.error('Episode list error:', error);
    container.innerHTML = '<p style="color:var(--color-text-faint);padding:16px">Gagal memuat daftar episode.</p>';
  }
}


/* ── SEARCH PAGE ── */
async function initSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  const typeFilter = params.get('type') || 'all';

  const searchInput = document.getElementById('search-main-input');
  const clearBtn = document.getElementById('search-clear');
  const grid = document.getElementById('search-grid');
  const resultInfo = document.getElementById('search-result-info');

  if (searchInput) {
    searchInput.value = query;
    if (query) clearBtn?.classList.add('visible');
  }

  // Set active tab
  document.querySelectorAll('.search-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === typeFilter);
  });

  if (query) {
    UI.updateSEO(`Cari: ${query}`);
    if (grid) UI.showSkeletons(grid, 12);

    try {
      const data = await API.searchMulti(query);
      let results = (data.results || []).filter(r => r.media_type === 'tv' || r.media_type === 'movie');

      // Filter Korean
      results = results.filter(r => {
        if (r.origin_country && r.origin_country.includes('KR')) return true;
        if (r.original_language === 'ko') return true;
        return false;
      });

      // Type filter
      if (typeFilter === 'tv') results = results.filter(r => r.media_type === 'tv');
      if (typeFilter === 'movie') results = results.filter(r => r.media_type === 'movie');

      if (resultInfo) {
        resultInfo.textContent = `Hasil pencarian untuk: '${query}' — ${results.length} hasil ditemukan`;
      }

      if (grid) {
        if (results.length > 0) {
          grid.innerHTML = results.map(item => UI.createCard(item)).join('');
        } else {
          grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1">
              <div class="empty-state-icon">🔍</div>
              <h3>Tidak ada hasil untuk '${query}'</h3>
              <p>Coba kata kunci lain atau periksa ejaan</p>
              <a href="index.html" class="btn btn-primary">Kembali ke Beranda</a>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      if (grid) UI.showError(grid);
    }
  } else {
    UI.updateSEO('Pencarian');
    if (resultInfo) resultInfo.textContent = 'Masukkan kata kunci untuk mencari drama atau movie Korea.';
  }

  // Search input events
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim();
      clearBtn?.classList.toggle('visible', val.length > 0);

      clearTimeout(debounceTimer);
      if (val.length >= 2) {
        debounceTimer = setTimeout(() => showSearchSuggestions(val), 500);
      } else {
        hideSearchSuggestions();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = searchInput.value.trim();
        if (val) {
          window.location.href = `search.html?q=${encodeURIComponent(val)}&type=${typeFilter}`;
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
      hideSearchSuggestions();
    });
  }
}

async function showSearchSuggestions(query) {
  const container = document.getElementById('search-suggestions');
  if (!container) return;

  try {
    const data = await API.searchMulti(query);
    let results = (data.results || []).filter(r =>
      (r.media_type === 'tv' || r.media_type === 'movie') &&
      (r.original_language === 'ko' || (r.origin_country && r.origin_country.includes('KR')))
    ).slice(0, 5);

    if (results.length > 0) {
      container.innerHTML = results.map(item => {
        const title = item.name || item.title;
        const year = (item.first_air_date || item.release_date || '').substring(0, 4);
        const posterSrc = API.posterURL(item.poster_path, 'w92');
        return `
          <a href="detail.html?type=${item.media_type}&id=${item.id}" class="search-suggestion-item">
            ${posterSrc ? `<img src="${posterSrc}" alt="">` : ''}
            <div class="sugg-info">
              <h4>${title}</h4>
              <p>${item.media_type === 'tv' ? 'Drama' : 'Movie'} · ${year}</p>
            </div>
          </a>
        `;
      }).join('');
      container.classList.add('open');
    } else {
      hideSearchSuggestions();
    }
  } catch (error) {
    hideSearchSuggestions();
  }
}

function hideSearchSuggestions() {
  const container = document.getElementById('search-suggestions');
  if (container) {
    container.classList.remove('open');
    container.innerHTML = '';
  }
}

function switchSearchTab(type) {
  const query = document.getElementById('search-main-input')?.value.trim();
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}&type=${type}`;
  }
}


/* ── TOP PAGE ── */
async function initTopPage() {
  UI.updateSEO('Top Drama & Movie Korea', 'Top 100 drama dan movie Korea dengan rating tertinggi');

  const list = document.getElementById('top-list');
  const loadMoreBtn = document.getElementById('load-more-btn');

  let currentTab = 'tv';
  let currentPage = 1;
  let allItems = [];

  // Tab switching
  document.querySelectorAll('.top-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.top-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.type;
      currentPage = 1;
      allItems = [];
      loadTopItems();
    });
  });

  async function loadTopItems() {
    if (currentPage === 1 && list) {
      list.innerHTML = '<div class="skeleton" style="height:80px;margin-bottom:8px"></div>'.repeat(10);
    }

    try {
      const data = currentTab === 'tv'
        ? await API.topRatedTV(currentPage)
        : await API.topRatedMovies(currentPage);

      allItems = allItems.concat(data.results);

      if (list) {
        list.innerHTML = allItems.map((item, idx) => {
          const title = item.name || item.title;
          const year = (item.first_air_date || item.release_date || '').substring(0, 4);
          const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
          const votes = item.vote_count || 0;
          const posterSrc = API.posterURL(item.poster_path, 'w92');
          const genres = (item.genre_ids || []).slice(0, 3).map(id => GENRE_NAMES[id] || '').filter(Boolean);
          const barColor = getRatingColor(item.vote_average || 0);
          const barWidth = ((item.vote_average || 0) / 10) * 100;

          return `
            <div class="rank-item">
              <span class="rank-num">${idx + 1}</span>
              <div class="rank-poster">
                ${posterSrc ? `<img src="${posterSrc}" alt="${title}" loading="lazy">` : ''}
              </div>
              <div class="rank-info">
                <h4><a href="detail.html?type=${currentTab}&id=${item.id}">${title}</a></h4>
                <div class="rank-meta">${year}${item.number_of_episodes ? ` · ${item.number_of_episodes} Episode` : ''}</div>
                <div class="rank-genres">${genres.map(g => `<span class="badge" style="font-size:10px;padding:2px 8px">${g}</span>`).join('')}</div>
              </div>
              <div class="rank-rating">
                <div style="flex:1">
                  <div class="rank-rating-bar"><div class="rank-rating-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
                  <div class="rank-rating-votes">${votes.toLocaleString()} votes</div>
                </div>
                <span class="rank-rating-score" style="color:${barColor}">${rating}</span>
              </div>
            </div>
          `;
        }).join('');
      }

      // Show/hide load more
      if (loadMoreBtn) {
        loadMoreBtn.style.display = allItems.length < 100 && currentPage < data.total_pages ? '' : 'none';
      }

    } catch (error) {
      console.error('Top page error:', error);
      if (list && currentPage === 1) UI.showError(list);
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      loadTopItems();
    });
  }

  loadTopItems();
}

function getRatingColor(rating) {
  if (rating >= 8) return '#2ecc71';
  if (rating >= 7) return '#f5a623';
  if (rating >= 5) return '#f39c12';
  return '#e74c3c';
}


/* ── MOBILE FILTER TOGGLE ── */
function toggleMobileFilter() {
  const sidebar = document.querySelector('.filter-sidebar');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (overlay) {
      overlay.classList.toggle('open');
      overlay.onclick = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      };
    }
  }
}


/* ============================================
   PAGE ROUTER — Auto-detect & Init
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Inject header & footer if placeholders exist
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.outerHTML = getHeaderHTML();
  if (footerSlot) footerSlot.outerHTML = getFooterHTML();

  // Shared setup
  UI.setupHeaderScroll();
  UI.setupMobileMenu();
  UI.setupHeaderSearch();
  UI.setupThemeToggle();
  UI.setupScrollTop();
  UI.setActiveNav();

  // Page routing
  const page = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');

  switch (page) {
    case 'index':
    case '':
      initHomepage();
      break;
    case 'tv':
      initTVPage();
      break;
    case 'movie':
      initMoviePage();
      break;
    case 'detail':
      initDetailPage();
      break;
    case 'watch':
      initWatchPage();
      break;
    case 'search':
      initSearchPage();
      break;
    case 'top':
      initTopPage();
      break;
  }
});
