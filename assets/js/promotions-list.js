(function () {
  const grid = document.getElementById('promotionsGrid');
  const endpoint = window.PUBLIC_PROMOTIONS_API_URL;
  if (!grid || !endpoint) return;

  const editorialLandingBySlug = {
    'navidad-orlando-2026': 'navidad-orlando-2026.html'
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function slugFromHref(href) {
    try {
      const url = new URL(href, window.location.href);
      if (url.pathname.endsWith('/promo.html')) return url.searchParams.get('slug') || '';
      const filename = url.pathname.split('/').filter(Boolean).pop() || '';
      return filename.replace(/\.html$/, '');
    } catch (error) {
      return '';
    }
  }

  function existingSlugs() {
    return new Set(
      Array.from(document.querySelectorAll('a[href]'))
        .map((link) => slugFromHref(link.getAttribute('href')))
        .filter(Boolean)
    );
  }

  function promoHref(item) {
    if (editorialLandingBySlug[item.slug]) return editorialLandingBySlug[item.slug];
    return 'promo.html?slug=' + encodeURIComponent(item.slug);
  }

  function mediaMarkup(item) {
    const card = item.card || {};
    const url = escapeHtml(card.media_url || '');
    if (!url) return '<div class="w-full h-full"></div>';
    if (card.media_type === 'video') {
      return '<video src="' + url + '" class="w-full h-full object-contain" autoplay muted loop playsinline preload="metadata"></video>';
    }
    return '<img src="' + url + '" alt="' + escapeHtml(card.title || 'Promoción') + '" class="w-full h-full object-contain" loading="lazy">';
  }

  function renderCard(item) {
    const card = item.card || {};
    const ga4 = item.ga4 || {};
    return `
      <article class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition transform hover:-translate-y-1" data-tass-promo="${escapeHtml(item.slug)}">
        <div class="relative h-52 overflow-hidden bg-[#f8efe8]">
          ${mediaMarkup(item)}
          <div class="absolute top-3 left-3"><span class="bg-brandPrimary text-white text-xs font-bold px-3 py-1 rounded-full">Nueva promoción</span></div>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <p class="text-xs text-brandAccent font-semibold uppercase tracking-wider mb-2">Oferta vigente</p>
          <h2 class="text-xl font-bold text-brandText mb-2 leading-snug">${escapeHtml(card.title)}</h2>
          <p class="text-sm text-gray-500 mb-2 flex-1">${escapeHtml(card.summary || card.validity_text || '')}</p>
          ${card.validity_text ? '<p class="text-xs text-gray-400 mb-4">' + escapeHtml(card.validity_text) + '</p>' : ''}
          <a href="${escapeHtml(promoHref(item))}" target="_blank" rel="noopener noreferrer"
             data-promo-event="${escapeHtml(ga4.event_name || 'click_promo')}"
             data-promo-label="${escapeHtml(ga4.event_label || item.slug)}"
             class="block text-center bg-gradient-to-r from-brandPrimary to-brandAccent text-white py-3 rounded-full font-semibold hover:shadow-lg transition">
            ${escapeHtml((item.cta && item.cta.label) || 'Ver Oferta')}
          </a>
        </div>
      </article>`;
  }

  grid.addEventListener('click', function (event) {
    const link = event.target.closest('[data-promo-event]');
    if (!link || typeof window.gtag !== 'function') return;
    window.gtag('event', link.dataset.promoEvent, {
      event_category: 'promociones',
      event_label: link.dataset.promoLabel
    });
  });

  fetch(endpoint, { cache: 'no-store' })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('promotions_endpoint_' + response.status)))
    .then((payload) => {
      const known = existingSlugs();
      const items = (Array.isArray(payload.items) ? payload.items : [])
        .filter((item) => item && item.slug && !known.has(item.slug));
      if (!items.length) return;
      grid.insertAdjacentHTML('beforeend', items.map(renderCard).join(''));
    })
    .catch((error) => console.warn('[promociones] no se pudieron sumar publicaciones de TASS', error));
})();
