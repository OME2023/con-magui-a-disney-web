/* ─── Estilos del navbar ─────────────────────────────────────────────────── */
const NAVBAR_STYLES = `
<style id="cmad-nav-style">
  /* Transición general del nav */
  .cmad-nav {
    transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  }

  /* Estado transparente sobre el hero (solo home) */
  .cmad-nav.nav-transparent {
    background: rgba(0,0,0,0.22) !important;
    border-color: transparent !important;
    box-shadow: none !important;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  /* Logo más visible sobre el video */
  .cmad-nav.nav-transparent .cmad-logo img {
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.35)) brightness(1.1);
  }
  .cmad-nav.nav-transparent .nav-link,
  .cmad-nav.nav-transparent .nav-label {
    color: rgba(255,255,255,0.92) !important;
  }
  .cmad-nav.nav-transparent .nav-link:hover,
  .cmad-nav.nav-transparent .nav-label:hover {
    color: #fff !important;
  }
  /* Todos los elementos SVG del icono se vuelven blancos */
  .cmad-nav.nav-transparent .nav-icon path,
  .cmad-nav.nav-transparent .nav-icon circle,
  .cmad-nav.nav-transparent .nav-icon polygon,
  .cmad-nav.nav-transparent .nav-icon rect {
    fill: rgba(255,255,255,0.88) !important;
    stroke: none !important;
  }
  .cmad-nav.nav-transparent .nav-icon [stroke] {
    stroke: rgba(255,255,255,0.88) !important;
    fill: none !important;
  }
  .cmad-nav.nav-transparent .nav-cta {
    background: rgba(255,255,255,0.18) !important;
    border: 1.5px solid rgba(255,255,255,0.55) !important;
    color: #fff !important;
  }
  .cmad-nav.nav-transparent .nav-cta:hover {
    background: rgba(255,255,255,0.3) !important;
  }

  /* Ícono SVG en nav */
  .nav-icon {
    width: 18px; height: 18px;
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }
  .nav-icon path, .nav-icon circle, .nav-icon polygon, .nav-icon rect {
    transition: fill 0.25s ease;
  }
  .nav-link:hover .nav-icon,
  .nav-link:focus .nav-icon {
    transform: scale(1.18) rotate(-6deg);
  }

  /* Logo animado */
  .cmad-logo img {
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cmad-logo:hover img {
    transform: scale(1.06) rotate(-3deg);
  }

  /* CTA robustos aunque una página no tenga la config extendida de Tailwind */
  .cmad-nav .nav-cta {
    background: linear-gradient(135deg, #C9A24A 0%, #C56F95 100%) !important;
    color: #fff !important;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 10px 28px rgba(201,162,74,0.22);
    text-shadow: 0 1px 1px rgba(0,0,0,0.18);
  }
  .cmad-nav .nav-cta:hover {
    box-shadow: 0 14px 36px rgba(197,111,149,0.34);
  }
  .cmad-nav .nav-guide-link {
    display: inline-flex !important;
  }

  /* Dropdown panel — animación suave */
  .nav-dropdown {
    position: relative;
    padding-bottom: 18px;
    margin-bottom: -18px;
  }
  .nav-dropdown-panel {
    position: absolute;
    left: 0; top: calc(100% - 2px);
    min-width: 220px;
    z-index: 10000;
    background: #fff;
    border: 1px solid #f1e8f0;
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(74,50,64,0.14);
    padding: 8px;
    opacity: 0;
    transform: translateY(10px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }
  .nav-dropdown:hover .nav-dropdown-panel,
  .nav-dropdown:focus-within .nav-dropdown-panel,
  .nav-dropdown.dropdown-open .nav-dropdown-panel {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  .menu-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 9px;
    color: #4A3240;
    font-size: 0.88rem;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease, padding-left 0.15s ease;
  }
  .menu-link:hover {
    background: #F7EEF3;
    color: #C56F95;
    padding-left: 16px;
  }

  /* Active nav */
  .active-nav {
    color: #C56F95 !important;
  }
  .active-nav .nav-icon path,
  .active-nav .nav-icon circle {
    fill: #C56F95 !important;
  }
  .active-nav .nav-label {
    position: relative;
  }
  .active-nav .nav-label::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #C56F95, #C9A24A);
    border-radius: 2px;
    animation: slideIn 0.3s ease forwards;
  }
  @keyframes slideIn {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  /* Iconos dentro de dropdown */
  .menu-icon {
    width: 16px; height: 16px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  .menu-link:hover .menu-icon {
    transform: scale(1.15);
  }

  /* Mobile links */
  .mobile-link {
    transition: color 0.15s ease, background 0.15s ease;
  }
  .mobile-link:hover { color: #C56F95; }
</style>
`;

/* ─── SVG íconos temáticos ───────────────────────────────────────────────── */
const ICONS = {
  // Castillo de Cinderella simplificado
  castle: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21V10H3V7h2V4h1v3h1V4h1v3h1V7h2V4h1v3h1V4h1v3h1V7h2v3h-2v11H5z" fill="#C56F95"/>
    <rect x="9" y="13" width="6" height="8" rx="1" fill="#E1A9C2"/>
    <rect x="6" y="12" width="3" height="4" rx="0.5" fill="#FDF8F2"/>
    <rect x="15" y="12" width="3" height="4" rx="0.5" fill="#FDF8F2"/>
  </svg>`,
  // Corona / quinceañera
  crown: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17l2.5-9 4 4.5L12 4l2.5 8.5 4-4.5L21 17H3z" fill="#C9A24A"/>
    <rect x="3" y="18" width="18" height="2.5" rx="1.25" fill="#C56F95"/>
    <circle cx="12" cy="4" r="1.2" fill="#C9A24A"/>
    <circle cx="5.5" cy="8" r="1" fill="#C9A24A"/>
    <circle cx="18.5" cy="8" r="1" fill="#C9A24A"/>
  </svg>`,
  // Grupo / viajes grupales
  group: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="3" fill="#C56F95"/>
    <circle cx="16" cy="8" r="3" fill="#C9A24A"/>
    <path d="M3.5 20c0-2.8 2.7-5 6-5s6 2.2 6 5H3.5z" fill="#C56F95"/>
    <path d="M12.5 20c0-2.8 2.1-5 4.7-5 2.6 0 4.8 2.2 4.8 5h-9.5z" fill="#C9A24A"/>
  </svg>`,
  // Personas / quiénes somos
  people: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3" fill="#C56F95"/>
    <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6H2z" fill="#C56F95"/>
    <circle cx="17" cy="8" r="2.5" fill="#C9A24A"/>
    <path d="M15 20c0-2.5 2-4.5 4.5-4.5S24 17.5 24 20h-9z" fill="#C9A24A"/>
  </svg>`,
  // Estrella / trabajá
  star: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A24A"/>
  </svg>`,
  // Destellos / contacto
  sparkle: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#C56F95" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="3" fill="#C56F95"/>
  </svg>`,
  // Acceso portal viajero
  portal: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="14" height="14" rx="2.5" fill="#C56F95"/>
    <path d="M10 9l3 3-3 3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 12H21" stroke="#C9A24A" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
};

/* ─── HTML del navbar ────────────────────────────────────────────────────── */
const NAVBAR_HTML = `
${NAVBAR_STYLES}
<nav class="cmad-nav bg-white shadow-lg fixed w-full top-0 z-[9999] border-b border-gray-100">
  <div class="w-full px-6 md:px-14 py-3 flex justify-between items-center">

    <!-- Logo -->
    <a href="index.html#hero" class="cmad-logo flex items-center">
      <img
        src="assets/img/logo-con-magui.png"
        alt="Con Magui a Disney"
        class="h-16 md:h-24 w-auto object-contain"
        style="max-height: 96px;"
      />
    </a>

    <!-- Desktop nav -->
    <div class="hidden md:flex gap-5 items-center">

      <!-- Home (con dropdown) -->
      <div class="nav-dropdown">
        <button type="button" data-nav="home"
          class="nav-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
          ${ICONS.castle}
          <span class="nav-label">Disney &amp; Universal</span>
          <svg class="w-3 h-3 opacity-50 mt-0.5" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">
          <a class="menu-link" href="index.html#hero"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#C56F95"/><rect x="7" y="11" width="6" height="7" rx="0.5" fill="#E1A9C2"/></svg>Inicio</a>
          <a class="menu-link" href="index.html#servicios"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11l-4 2.5 1.5-4.5L4 6.5h4.5z" fill="#C9A24A"/></svg>Servicios</a>
          <a class="menu-link" href="index.html#visas"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" fill="#C56F95"/><rect x="5" y="8" width="10" height="1.5" rx="0.75" fill="white"/><rect x="5" y="11" width="6" height="1.5" rx="0.75" fill="white"/></svg>Visas</a>
          <a class="menu-link" href="index.html#seguros"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V5l-6-3z" fill="#C9A24A"/><path d="M7.5 10l2 2 3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Seguros</a>
          <a class="menu-link" href="index.html#faqs"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>FAQs</a>
          <a class="menu-link" href="index.html#promociones"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M3 10l1-7h12l1 7H3z" fill="#C9A24A"/><path d="M3 10v7h14v-7" stroke="#C56F95" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 17v-4h4v4" fill="#E1A9C2"/><path d="M10 3v3M7 4l1.5 2.5M13 4l-1.5 2.5" stroke="#C56F95" stroke-width="1.2" stroke-linecap="round"/></svg>Promociones</a>
          <a class="menu-link" href="guia-primer-viaje-disney.html" data-cta="nav_dropdown_guia_online" onclick="if(typeof gtag==='function') gtag('event','click_guia_online',{event_category:'navegacion',event_label:'dropdown_disney_universal',transport_type:'beacon'});"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="2" fill="#E1A9C2"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#C56F95" stroke-width="1.3" stroke-linecap="round"/></svg>Guía online gratis</a>
        </div>
      </div>

      <!-- Guía online -->
      <a data-nav="guia" href="guia-primer-viaje-disney.html"
        data-cta="nav_guia_primer_viaje"
        onclick="if(typeof gtag==='function') gtag('event','click_guia_online',{event_category:'navegacion',event_label:'navbar_desktop',transport_type:'beacon'});"
        class="nav-link nav-guide-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
        <span aria-hidden="true" class="text-base leading-none">🎁</span>
        <span class="nav-label">Guía Online</span>
      </a>

      <!-- Quinceañeras (con dropdown) -->
      <div class="nav-dropdown">
        <button type="button" data-nav="quince"
          class="nav-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
          ${ICONS.crown}
          <span class="nav-label">Quinceañeras</span>
          <svg class="w-3 h-3 opacity-50 mt-0.5" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">
          <a class="menu-link" href="quinceaneras.html#hero"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5z" fill="#C9A24A"/></svg>Programa</a>
          <a class="menu-link" href="quinceaneras.html#paquetes"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="3" y="8" width="14" height="10" rx="1.5" fill="#C56F95"/><path d="M7 8V6a3 3 0 016 0v2" stroke="#C9A24A" stroke-width="1.5" stroke-linecap="round"/><path d="M7 13h6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>Paquetes</a>
          <a class="menu-link" href="quinceaneras.html#faqs"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>FAQs</a>
          <a class="menu-link" href="quinceaneras.html#lead-magnet"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="2" fill="#E1A9C2"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#C56F95" stroke-width="1.3" stroke-linecap="round"/></svg>Inscripción</a>
        </div>
      </div>

      <!-- Viajes grupales -->
      <div class="nav-dropdown">
        <button type="button" data-nav="grupal"
          class="nav-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
          ${ICONS.group}
          <span class="nav-label">Viajes grupales</span>
          <svg class="w-3 h-3 opacity-50 mt-0.5" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">
          <a class="menu-link" href="grupal-juntas.html#grupo"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="2.5" fill="#C56F95"/><circle cx="13" cy="7" r="2.5" fill="#C9A24A"/><path d="M3.5 16.5c0-2.3 2-4 4.5-4s4.5 1.7 4.5 4H3.5z" fill="#C56F95"/><path d="M10.5 16.5c0-2.3 1.7-4 4-4s4 1.7 4 4h-8z" fill="#C9A24A"/></svg>Programa grupal</a>
          <a class="menu-link" href="grupal-juntas.html#inversion"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.8 5.4H17l-4.4 3.2 1.7 5.4L10 13.1 5.7 16 7.4 10.6 3 7.4h5.2z" fill="#C9A24A"/></svg>Inversión</a>
          <a class="menu-link" href="grupal-juntas.html#preguntas"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>Preguntas frecuentes</a>
        </div>
      </div>

      <!-- Quiénes Somos -->
      <a data-nav="quienes" href="quienes-somos.html"
        class="nav-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
        ${ICONS.people}
        <span class="nav-label">Quiénes Somos</span>
      </a>

      <!-- Trabajá -->
      <a data-nav="trabaja" href="trabaja-con-nosotros.html"
        class="nav-link inline-flex items-center gap-2 text-gray-700 hover:text-brandPrimary transition font-medium">
        ${ICONS.star}
        <span class="nav-label">Trabajá con Nosotros</span>
      </a>

      <!-- CTA Portal del viajero -->
      <a href="https://tass.itintegraltech.com/traveler/login?agency=cmd"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-cta inline-flex items-center gap-2 bg-gradient-to-r from-brandPrimary to-brandAccent text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
        ${ICONS.portal}
        Portal del viajero
      </a>

      <!-- CTA Cotiza Ahora -->
      <a href="http://tass.itintegraltech.com/public/cmd/datos"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-cta inline-flex items-center gap-2 bg-gradient-to-r from-brandAccent to-brandPrimary text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
        Cotiza Ahora
      </a>

      <!-- CTA Contacto -->
      <a href="index.html#contacto"
        class="nav-cta inline-flex items-center gap-2 bg-gradient-to-r from-brandPrimary to-brandAccent text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
        ${ICONS.sparkle}
        Contacto
      </a>
    </div>

    <!-- Hamburger mobile -->
    <button id="mobileMenuButton" type="button"
      class="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
      aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu">
      <svg id="iconHamburger" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg id="iconClose" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- Mobile menu -->
  <div id="mobileMenu" class="hidden md:hidden px-4 pb-4 bg-white border-t border-gray-100">

    <button type="button" class="mobile-dd-toggle w-full text-left py-2.5 font-semibold text-gray-700 flex items-center gap-2" data-target="mobileHomeMenu">
      ${ICONS.castle} Disney &amp; Universal ▾
    </button>
    <div id="mobileHomeMenu" class="hidden pl-4 pb-2 space-y-1">
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#hero"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#C56F95"/><rect x="7" y="11" width="6" height="7" rx="0.5" fill="#E1A9C2"/></svg>Inicio</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#servicios"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11l-4 2.5 1.5-4.5L4 6.5h4.5z" fill="#C9A24A"/></svg>Servicios</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#visas"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" fill="#C56F95"/><rect x="5" y="8" width="10" height="1.5" rx="0.75" fill="white"/><rect x="5" y="11" width="6" height="1.5" rx="0.75" fill="white"/></svg>Visas</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#seguros"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V5l-6-3z" fill="#C9A24A"/><path d="M7.5 10l2 2 3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Seguros</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#faqs"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>FAQs</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="index.html#promociones"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M3 10l1-7h12l1 7H3z" fill="#C9A24A"/><path d="M3 10v7h14v-7" stroke="#C56F95" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 17v-4h4v4" fill="#E1A9C2"/></svg>Promociones</a>
    </div>

    <a data-nav="guia" href="guia-primer-viaje-disney.html"
      data-cta="nav_guia_primer_viaje_mobile"
      onclick="if(typeof gtag==='function') gtag('event','click_guia_online',{event_category:'navegacion',event_label:'navbar_mobile',transport_type:'beacon'});"
      class="mobile-link flex items-center gap-2 py-2.5 text-gray-700 font-medium border-t border-gray-100">
      🎁 Guía Online
    </a>

    <button type="button" class="mobile-dd-toggle w-full text-left py-2.5 font-semibold text-gray-700 flex items-center gap-2" data-target="mobileQuinceMenu">
      ${ICONS.crown} Quinceañeras ▾
    </button>
    <div id="mobileQuinceMenu" class="hidden pl-4 pb-2 space-y-1">
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="quinceaneras.html#hero"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5z" fill="#C9A24A"/></svg>Programa</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="quinceaneras.html#paquetes"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="3" y="8" width="14" height="10" rx="1.5" fill="#C56F95"/><path d="M7 8V6a3 3 0 016 0v2" stroke="#C9A24A" stroke-width="1.5" stroke-linecap="round"/></svg>Paquetes</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="quinceaneras.html#faqs"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>FAQs</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="quinceaneras.html#lead-magnet"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="2" fill="#E1A9C2"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#C56F95" stroke-width="1.3" stroke-linecap="round"/></svg>Inscripción</a>
    </div>

    <button type="button" class="mobile-dd-toggle w-full text-left py-2.5 font-semibold text-gray-700 flex items-center gap-2" data-target="mobileGroupMenu">
      ${ICONS.group} Viajes grupales ▾
    </button>
    <div id="mobileGroupMenu" class="hidden pl-4 pb-2 space-y-1">
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="grupal-juntas.html#grupo"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="2.5" fill="#C56F95"/><circle cx="13" cy="7" r="2.5" fill="#C9A24A"/><path d="M3.5 16.5c0-2.3 2-4 4.5-4s4.5 1.7 4.5 4H3.5z" fill="#C56F95"/><path d="M10.5 16.5c0-2.3 1.7-4 4-4s4 1.7 4 4h-8z" fill="#C9A24A"/></svg>Programa grupal</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="grupal-juntas.html#inversion"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.8 5.4H17l-4.4 3.2 1.7 5.4L10 13.1 5.7 16 7.4 10.6 3 7.4h5.2z" fill="#C9A24A"/></svg>Inversión</a>
      <a class="mobile-link flex items-center gap-2 py-1.5 text-gray-600" href="grupal-juntas.html#preguntas"><svg class="menu-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#C56F95"/><path d="M10 6.5c-1 0-2 .8-2 1.8h1.5c0-.4.2-.5.5-.5.4 0 .6.2.6.5 0 .3-.2.5-.8.9C9.2 9.6 9 10.1 9 10.8h1.5c0-.4.1-.6.7-1 .7-.5 1.3-1 1.3-2 0-1.1-.9-1.8-2.5-1.8v-.5z" fill="white"/><circle cx="10" cy="13.5" r="0.8" fill="white"/></svg>Preguntas frecuentes</a>
    </div>

    <a data-nav="quienes" href="quienes-somos.html" class="mobile-link flex items-center gap-2 py-2.5 text-gray-700 font-medium border-t border-gray-100">
      ${ICONS.people} Quiénes Somos
    </a>
    <a data-nav="trabaja" href="trabaja-con-nosotros.html" class="mobile-link flex items-center gap-2 py-2.5 text-gray-700 font-medium">
      ${ICONS.star} Trabajá con Nosotros
    </a>
    <a href="https://tass.itintegraltech.com/traveler/login?agency=cmd" target="_blank" rel="noopener noreferrer" class="mobile-link flex items-center gap-2 py-2.5 text-brandPrimary font-semibold">
      ${ICONS.portal} Portal del viajero
    </a>
    <a href="http://tass.itintegraltech.com/public/cmd/datos" target="_blank" rel="noopener noreferrer" class="mobile-link flex items-center gap-2 py-2.5 text-brandAccent font-semibold">
      Cotiza Ahora
    </a>
    <a href="index.html#contacto" class="mobile-link flex items-center gap-2 py-2.5 text-brandPrimary font-semibold">
      ${ICONS.sparkle} Contacto
    </a>
  </div>
</nav>
`;

/* ─── Init navbar ────────────────────────────────────────────────────────── */
function initNavbar() {
  const btn   = document.getElementById("mobileMenuButton");
  const menu  = document.getElementById("mobileMenu");
  const iconH = document.getElementById("iconHamburger");
  const iconC = document.getElementById("iconClose");

  function setMenuState(open) {
    if (!menu || !btn) return;
    menu.classList.toggle("hidden", !open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (iconH && iconC) {
      iconH.classList.toggle("hidden", open);
      iconC.classList.toggle("hidden", !open);
    }
  }

  if (btn && menu) {
    btn.addEventListener("click", () => setMenuState(menu.classList.contains("hidden")));
  }
  document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => setMenuState(false)));
  document.querySelectorAll(".mobile-dd-toggle").forEach(t => {
    t.addEventListener("click", () => {
      const target = document.getElementById(t.getAttribute("data-target"));
      if (target) target.classList.toggle("hidden");
    });
  });

  document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
    let closeTimer;
    const setOpen = open => {
      clearTimeout(closeTimer);
      if (open) {
        dropdown.classList.add("dropdown-open");
        return;
      }
      closeTimer = setTimeout(() => dropdown.classList.remove("dropdown-open"), 900);
    };

    dropdown.addEventListener("mouseenter", () => setOpen(true));
    dropdown.addEventListener("mouseleave", () => setOpen(false));
    dropdown.addEventListener("focusin", () => setOpen(true));
    dropdown.addEventListener("focusout", () => setOpen(false));
    dropdown.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        clearTimeout(closeTimer);
        dropdown.classList.remove("dropdown-open");
      });
    });
  });

  window.addEventListener("resize", () => { if (window.innerWidth >= 768) setMenuState(false); });
  setMenuState(false);
}

/* ─── Efecto transparencia sobre el hero (solo home) ────────────────────── */
function initScrollTransparency() {
  if (document.body.dataset.page !== "home") return;
  const nav  = document.querySelector(".cmad-nav");
  const hero = document.getElementById("hero");
  if (!nav || !hero) return;

  function update() {
    const threshold = hero.offsetHeight - 80;
    if (window.scrollY < threshold) {
      nav.classList.add("nav-transparent");
    } else {
      nav.classList.remove("nav-transparent");
    }
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ─── Marca la página activa ─────────────────────────────────────────────── */
function markActivePage() {
  let page = document.body.dataset.page;
  if (!page) {
    const p = window.location.pathname;
    if (p.includes("quienes-somos"))        page = "quienes";
    else if (p.includes("quinceaneras"))     page = "quince";
    else if (p.includes("grupal-juntas"))    page = "grupal";
    else if (p.includes("trabaja-con-nos")) page = "trabaja";
    else if (p.includes("guia-primer-viaje-disney")) page = "guia";
    else                                     page = "home";
  }
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => {
    el.classList.add("active-nav");
    el.classList.remove("text-gray-700");
  });
}

/* ─── Boot ───────────────────────────────────────────────────────────────── */
function bootNavbar() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  mount.innerHTML = NAVBAR_HTML;
  initNavbar();
  markActivePage();
  initScrollTransparency();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootNavbar);
} else {
  bootNavbar();
}

// GA4 + Analytics en todas las páginas
// Inyecta gtag solo si la página no lo cargó directamente (evita duplicados)
(function () {
  if (!window._cmadGtagLoaded) {
    window._cmadGtagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", "G-BZQVQR29GB");
      var gScript = document.createElement("script");
      gScript.async = true;
      gScript.src = "https://www.googletagmanager.com/gtag/js?id=G-BZQVQR29GB";
      document.head.appendChild(gScript);
    }
  }

  var s = document.createElement("script");
  s.src = "js/analytics.js";
  document.head.appendChild(s);
})();
