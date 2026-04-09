/**
 * DramaHub — Embed Player Logic
 * Server switching, episode navigation, keyboard shortcuts
 */

const Player = (() => {
  // Server URL builders
  const SERVERS = {
    tv: {
      server1: (id, s, e) => `https://vidsrc.me/embed/tv/${id}/${s}/${e}`,
      server2: (id, s, e) => `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`,
      server3: (id, s, e) => `https://multiembed.mov/?video_id=${id}&s=${s}&e=${e}`
    },
    movie: {
      server1: (id) => `https://vidsrc.me/embed/movie/${id}`,
      server2: (id) => `https://www.2embed.cc/embed/${id}`,
      server3: (id) => `https://multiembed.mov/?video_id=${id}`
    }
  };

  let currentServer = 'server1';
  let currentType = 'tv';
  let currentId = '';
  let currentSeason = 1;
  let currentEpisode = 1;
  let totalEpisodes = 0;

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /**
   * Initialize player from URL params
   */
  function init() {
    currentType = getParam('type') || 'tv';
    currentId = getParam('id') || '';
    currentSeason = parseInt(getParam('season')) || 1;
    currentEpisode = parseInt(getParam('episode')) || 1;

    loadPlayer();
    setupKeyboardNav();
    showInitialToast();
  }

  /**
   * Load the player iframe
   */
  function loadPlayer() {
    const iframe = document.getElementById('main-player');
    const loading = document.getElementById('player-loading');
    if (!iframe) return;

    if (loading) loading.classList.remove('hidden');

    const url = getServerURL(currentServer);
    iframe.src = url;

    iframe.onload = () => {
      if (loading) loading.classList.add('hidden');
    };
  }

  /**
   * Get URL for current server
   */
  function getServerURL(serverKey) {
    if (currentType === 'tv') {
      return SERVERS.tv[serverKey](currentId, currentSeason, currentEpisode);
    } else {
      return SERVERS.movie[serverKey](currentId);
    }
  }

  /**
   * Switch server
   */
  function switchServer(serverKey) {
    currentServer = serverKey;
    loadPlayer();

    // Update UI
    document.querySelectorAll('.server-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-server="${serverKey}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  /**
   * Switch episode
   */
  function switchEpisode(season, episode) {
    currentSeason = parseInt(season);
    currentEpisode = parseInt(episode);

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('season', currentSeason);
    url.searchParams.set('episode', currentEpisode);
    window.history.pushState({}, '', url);

    loadPlayer();
    updateEpisodeHighlight();
    updateEpisodeTitle();
    scrollToActiveEpisode();
  }

  /**
   * Go to previous episode
   */
  function prevEpisode() {
    if (currentEpisode > 1) {
      switchEpisode(currentSeason, currentEpisode - 1);
    }
  }

  /**
   * Go to next episode
   */
  function nextEpisode() {
    if (currentEpisode < totalEpisodes) {
      switchEpisode(currentSeason, currentEpisode + 1);
    }
  }

  /**
   * Highlight active episode in sidebar
   */
  function updateEpisodeHighlight() {
    document.querySelectorAll('.watch-episode-item').forEach(item => {
      item.classList.remove('active');
      if (parseInt(item.dataset.episode) === currentEpisode &&
          parseInt(item.dataset.season) === currentSeason) {
        item.classList.add('active');
      }
    });
  }

  /**
   * Update episode title display
   */
  function updateEpisodeTitle() {
    const el = document.getElementById('current-ep-title');
    if (el) {
      el.textContent = `Season ${currentSeason} Episode ${currentEpisode}`;
    }
  }

  /**
   * Scroll episode list to active episode
   */
  function scrollToActiveEpisode() {
    const active = document.querySelector('.watch-episode-item.active');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Keyboard navigation
   */
  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Don't trap keys when user is typing
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevEpisode();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextEpisode();
      }
    });
  }

  /**
   * Show initial toast tip
   */
  function showInitialToast() {
    setTimeout(() => {
      if (typeof UI !== 'undefined' && UI.showToast) {
        UI.showToast('Jika video tidak muncul, coba ganti ke Server 2 atau Server 3', 'info', 5000);
      }
    }, 1500);
  }

  /**
   * Set total episodes for navigation boundary
   */
  function setTotalEpisodes(total) {
    totalEpisodes = total;
  }

  return {
    init,
    switchServer,
    switchEpisode,
    prevEpisode,
    nextEpisode,
    setTotalEpisodes,
    scrollToActiveEpisode,
    get currentSeason() { return currentSeason; },
    get currentEpisode() { return currentEpisode; },
    get currentServer() { return currentServer; }
  };
})();
